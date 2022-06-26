import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { createWebSocketStream, WebSocketServer } from "ws";
import "dotenv/config";
import { drawCircle } from "./src/drawCircle";
import { drawRectangle } from "./src/drawRectangle";
import { makeScreenshot } from "./src/makeScreensot";
const PORT = process.env.PORT;
const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: parseInt(`${PORT}`) });
try {
  server.on("connection", (socket: any) => {
    const duplex = createWebSocketStream(socket, {
      encoding: "utf8",
      decodeStrings: false,
    });
    duplex.on("data", async (data: Buffer) => {
      let comandLine = data.toString("utf-8").split(" ");
      let [comand, ...args] = comandLine;
      const { x, y } = robot.getMousePos();

      switch (comand) {
        case "mouse_up":
          console.log(`->-${comand} {${args}}`);
          duplex.write(`${comand}\0`);
          robot.moveMouseSmooth(x, y - parseInt(args[0]));
          break;
        case "mouse_down":
          console.log(`->-${comand} {${args}}`);
          duplex.write(`${comand}\0`);
          robot.moveMouse(x, y + parseInt(args[0]));
          break;
        case "mouse_left":
          console.log(`->-${comand}{${args} px}\0`);
          duplex.write(`${comand} ${args}\0`);
          robot.moveMouse(x - parseInt(args[0]), y);
          break;
        case "mouse_right":
          console.log(`->-${comand}{${args} px}\0`);
          duplex.write(`${comand}\0`);
          robot.moveMouse(x + parseInt(args[0]), y);
          break;
        case "mouse_position":
          console.log(`->-${comand}`);
          duplex.write(`${comand} ${x},${y}\0`);
          break;
        case "draw_circle":
          console.log(`->-${comand}`);
          drawCircle(parseInt(args[0]));
          duplex.write(`${comand}\0`);
          break;
        case "draw_rectangle":
          console.log(`->-${comand}`);
          drawRectangle(parseInt(args[0]), parseInt(args[1]));
          duplex.write(`${comand}\0`);
          break;
        case "draw_square":
          console.log(`->-${comand}`);
          drawRectangle(parseInt(args[0]), parseInt(args[0]));
          duplex.write(`${comand}\0`);
          break;
        case "prnt_scrn":
          console.log(`->-${comand}`);
          const img = await makeScreenshot();
          duplex.write(`${comand} ${img}`);
          break;
      }
    });
  });
  server.on("close", (socket: any) => {
    socket.terminate();
    server.close();
    process.exit(0);
  });
  process.on("SIGINT", () => {
    process.stdout.write("Closing websocket...\n");
    server.close();
    process.exit(0);
  });
} catch (ex) {
  console.log(ex);
  server.close();
  process.exit(0);
}
