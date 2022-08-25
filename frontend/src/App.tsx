import { useCallback, useEffect, useState } from "react";
import { ChangeAction } from "./actions/edit-file";
import { RenameAction } from "./actions/rename-file";
import { reducers } from "./reducer";

const socket = new WebSocket("ws://localhost:5001");

const App = (): JSX.Element => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [contents, setContents] = useState<string | null>(null);

  const handleMessage = useCallback<(event: MessageEvent) => Promise<void>>(
    async (event) => {
      type MessageResponse = RenameAction | ChangeAction;
      const data: MessageResponse = JSON.parse(event.data);
      const reducer = reducers[data.type] as any;
      const result: string | null = await reducer(data);
      if (result === null) {
        // Delete file
        setFileList((prev) => prev.filter((p) => data.fileName !== p));
        setContents(() => null);
      } else {
        // Update File
        setContents(() => result);
      }
    },
    []
  );

  useEffect(() => {
    socket.addEventListener("message", handleMessage);
    return function websocketCleanup() {
      socket.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <div>
      <h1>{contents}</h1>
    </div>
  );
};

export default App;
