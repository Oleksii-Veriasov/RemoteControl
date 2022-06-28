import robot from "robotjs";

export const drawRectangle = async (width: number, hight: number) => {
  let parts = 100;
  robot.setMouseDelay(2);
  robot.mouseToggle("down", "left");
  for (let i = 0; i <= parts; i++) {
    let { x, y } = robot.getMousePos();
    robot.dragMouse(x + width / parts, y);
  }
  for (let i = 0; i <= parts; i++) {
    let { x, y } = robot.getMousePos();
    robot.dragMouse(x, y + hight / parts);
  }
  for (let i = 0; i <= parts; i++) {
    let { x, y } = robot.getMousePos();
    robot.dragMouse(x - width / parts, y);
  }
  for (let i = 0; i <= parts; i += 1) {
    let { x, y } = robot.getMousePos();
    robot.dragMouse(x, y - hight / parts);
  }
  robot.mouseToggle("up", "left");
};
