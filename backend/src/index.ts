import fs from "fs";
import path from "path";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

/** Express Setup */
const app = express();
const port = 5001;

/** Websocket Setup */
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", function connection() {
  console.log("Client Connected");
});

/** Utilities */
let timeout: NodeJS.Timeout | null;
const useDebounce = (cb: () => void): void => {
  if (!timeout) {
    timeout = setTimeout(() => {
      timeout = null;
      cb();
    }, 100);
  }
};

/** Watch for file changes */
const fileDir = path.resolve(__dirname, "../../files");
console.log(`Watching files in folder: "${fileDir}"`);

fs.watch(fileDir, { recursive: true }, (event, fileName) => {
  console.log("Update", event, fileName);
  const update = (): void =>
    /** Tell each connected client the file was updated */
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ fileName, type: event }));
      }
    });

  if (event === "change") {
    /** change events can fire multiple times in quick successions */
    useDebounce(update);
  } else {
    update();
  }
});

app.get("/get-files", (req, res) => {
  try {
    const files = fs.readdirSync(fileDir);
    res.status(200);
    return res.json(files);
  } catch (error) {
    res.status(500);
    return res.end();
  }
});

/** File request route */
app.get("/file", (req, res) => {
  console.log("File Request", req.query.path);
  if (!req.query.path) {
    res.status(500);
    return res.send('Request match include file path in "path" query param.');
  }
  if (typeof req.query.path !== "string") {
    res.status(500);
    return res.send("Invalid type for path query param.");
  }
  const filePath = path.resolve(fileDir, req.query.path);
  if (!fs.existsSync(filePath)) {
    res.status(404);
    return res.send(`No file exists at "${filePath}"`);
  }
  res.status(200);
  return res.sendFile(filePath);
});

/** Start server */
const server = app.listen(port, () => {
  console.log(`Backend Started on port ${port}`);
});

/** Forward requests to ws server */
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
