import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Header } from "./Header";
import { Actions, dispatch, Events } from "./reducer";
import { rules } from "./rules";
import { copy } from "./copy";
import "./markdown.css";

const socket = new WebSocket("ws://localhost:5001");

const App = (): JSX.Element => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [contents, setContents] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const markdown = useMemo(() => {
    let markdown = (contents || "").trim();
    {
      rules.forEach(([rule, template]) => {
        markdown = markdown.replace(rule, template);
      });
    }
    return markdown;
  }, [contents]);

  const handleMessage = useCallback<(event: MessageEvent) => Promise<void>>(
    async (event) => {
      const data: Actions = JSON.parse(event.data);
      if (data.type === Events.Change || data.type === Events.Rename) {
        const result = await dispatch({ ...data });
        if (data.type === Events.Change) {
          /** Update File */
          if (data.fileName === selectedFile) {
            return setContents(() => result);
          }
        }
        /** Handle file rename */
        if (result === null) {
          // Delete file
          setFiles((prev) => prev.filter((p) => data.fileName !== p));
          if (data.fileName === selectedFile) {
            setContents(() => null);
          }
        } else {
          // Add new file
          setFiles((files) => files.concat(data.fileName));
        }
      }
    },
    [selectedFile]
  );

  const loadAllFiles = useCallback<() => Promise<void>>(async () => {
    const files = await dispatch({ type: Events.Request });
    setFiles(() => files);
    if (files.length) {
      handleSelectFile(files[0]);
    }
  }, []);

  const handleSelectFile = async (fileName: string): Promise<void> => {
    const result = await dispatch({ type: Events.Change, fileName });
    setContents(() => result);
    setSelectedFile(() => fileName);
  };

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
    return function websocketCleanup() {
      socket.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    let buttons: NodeListOf<HTMLButtonElement>;
    if (ref.current) {
      buttons = ref.current.querySelectorAll<HTMLButtonElement>(".code button");
      Array.from(buttons).forEach((btn) => {
        btn.addEventListener("click", copy);
      });
    }
    return function copyCodeButtonCleanup(): void {
      Array.from(buttons).forEach((btn) =>
        btn.removeEventListener("click", copy)
      );
    };
  }, [contents]);

  useEffect(() => {
    if (!files.length) {
      loadAllFiles();
    }
  }, [files.length, loadAllFiles]);

  useLayoutEffect(() => {
    if (ref.current) {
      Array.from(ref.current.childNodes).forEach((child) => {
        if (!child.textContent) {
          child.remove();
        }
      });
    }
  }, [contents]);

  return (
    <div className="my-4 mx-8">
      <Header files={files} onSelect={handleSelectFile} />
      <div
        ref={ref}
        className="markdown"
        dangerouslySetInnerHTML={{ __html: markdown }}
      ></div>
      {!markdown && <p>This file has no content</p>}
    </div>
  );
};

export default App;
