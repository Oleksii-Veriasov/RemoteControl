import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import "dotenv/config";
const PORT = process.env.PORT;

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: PORT });

server.on("connection", (socket) => {
  socket.on("message", (data) => {
    let comandLine = data.toString("utf-8").split(" ");
    console.log(comandLine);
    let [comand, ...args] = comandLine;
    console.log(args);
    const { x, y } = robot.getMousePos();
    console.log(x, y);
    switch (comand) {
      case "mouse_up":
        console.log(`->-${comand} {${args}}`);
        console.log(args[0]);
        console.log(+x + parseInt(args[0]));
        socket.send(`${comand}\0`);
        robot.moveMouseSmooth(x, y - parseInt(args[0]));
        break;
      case "mouse_down":
        console.log(`->-${comand} {${args}}`);
        socket.send(`${comand}\0`);
        robot.moveMouse(x, y + parseInt(args[0]));
        break;
      case "mouse_left":
        console.log(`->-${comand}{${args} px}\0`);
        socket.send(`${comand} ${args}\0`);
        robot.moveMouse(x - parseInt(args[0]), y);
        break;
      case "mouse_right":
        console.log(`->-${comand}{${args} px}\0`);
        socket.send(`${comand}\0`);
        robot.moveMouse(x + parseInt(args[0]), y);
        break;
      case "mouse_position":
        console.log(`->-${comand}`);
        socket.send(`${comand} ${x},${y}\0`);
        break;
      case "draw_circle":
        console.log(`->-${comand}`);
        socket.send(`${comand}\0`);
        break;
      case "draw_rectangle":
        console.log(`->-${comand}`);
        socket.send(`${comand}\0`);
        break;
      case "draw_square":
        console.log(`->-${comand}`);
        robot.dragMouse(x+parseInt(args[0]), y);
        robot.dragMouse(x, y+parseInt(args[0]));
        robot.dragMouse(x-parseInt(args[0]), y);
        robot.dragMouse(x, y-parseInt(args[0]));
        // robot.mouseToggle("down","left");

        // robot.mouseToggle("up","left");
        socket.send(`${comand}\0`);
        break;
    }
  });
});
