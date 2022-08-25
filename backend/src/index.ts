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
    }, 50);
  }
};

/** Watch for file changes */
const filePath = path.resolve(__dirname, "../files");
console.log(`Watching files in folder: "${filePath}"`);

fs.watch(filePath, { recursive: true }, (event, fileName) => {
  useDebounce(() => {
    /** Tell each connected client the file was updated */
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ fileName, type: event }));
      }
    });
  });
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
  const filePath = path.resolve(__dirname, "../files/", req.query.path);
  if (!fs.existsSync(filePath)) {
    res.status(500);
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
