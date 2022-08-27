import { useCallback, useEffect, useState } from "react";
import { Actions, dispatch, Events } from "../network-request";
import { useStorage } from "../hooks/useStorage";
import { concat } from "../utilities/concat";
import { Header } from "./Header";
import { Markdown } from "./Markdown";
import { NoMarkdown } from "./NoMarkdown";
import { NoFiles } from "./NoFiles";
import "../styles/markdown.css";

const socket = new WebSocket("ws://localhost:5001");

const App = (): JSX.Element => {
  const { read, write } = useStorage<string>({ key: "file" });
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [content, setContent] = useState<string | null>(null);

  const handleMessage = useCallback<(event: MessageEvent) => Promise<void>>(
    async (event) => {
      const data: Actions = JSON.parse(event.data);
      if (data.type === Events.Change || data.type === Events.Rename) {
        const result = await dispatch({ ...data });
        if (data.type === Events.Change) {
          /** Update File */
          if (data.fileName === selectedFile) {
            return setContent(() => result);
          }
        }
        /** Handle file rename */
        if (result === null) {
          // Delete file
          setFiles((prev) => prev.filter((p) => data.fileName !== p));
          if (data.fileName === selectedFile) {
            setContent(() => null);
          }
        } else {
          // Add new file
          setFiles((files) => files.concat(data.fileName));
          // Check if the file added has content
          const filesResult = await dispatch({ ...data, type: Events.Change });
          if (filesResult) {
            return setContent(() => result);
          }
        }
      }
    },
    [selectedFile]
  );

  const handleSelectFile = useCallback<(fileName: string) => Promise<void>>(
    async (fileName: string) => {
      const result = await dispatch({ type: Events.Change, fileName });
      setContent(() => result);
      setSelectedFile(() => fileName);
      write(fileName);
    },
    [write]
  );

  const loadAllFiles = useCallback<() => Promise<void>>(async () => {
    const file = read();
    const files = await dispatch({ type: Events.Request });
    if (file && files.includes(file)) {
      handleSelectFile(file);
    } else if (files.length) {
      handleSelectFile(files[0]);
    }
    setFiles(() => files);
  }, [handleSelectFile, read]);

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
    return function websocketCleanup() {
      socket.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    if (!files.length) {
      loadAllFiles();
    }
  }, [files.length, loadAllFiles]);

  return (
    <div className="flex flex-col py-4 px-8 h-full">
      <Header
        files={files}
        selectedFile={selectedFile}
        onSelect={handleSelectFile}
      />
      {content && (
        <div
          className={concat(
            "grow",
            "overflow-auto",
            "border-2",
            "border-slate-400",
            "rounded",
            "px-4",
            "py-2",
            "w-full",
            "max-w-screen-lg",
            "mx-auto"
          )}
        >
          <Markdown content={content} />
        </div>
      )}
      {!files.length && <NoFiles />}
      {files.length && !content?.trim() && <NoMarkdown />}
    </div>
  );
};

export default App;
