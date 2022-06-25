import robot from "robotjs";

export const drawRectangle = async (width: number, hight: number) => {
  let parts = 100;
  robot.setMouseDelay(2);
  robot.mouseToggle("down", "left");
  for (let i = 0; i <= parts; i++) {
    let { x, y } = robot.getMousePos();
    console.log(x + width / parts, y);
    robot.dragMouse(x + width / parts, y);
  }
  for (let i = 0; i <= parts; i++) {
    const mousePos = robot.getMousePos();
    let { x, y } = robot.getMousePos();
    console.log(x, y + hight / parts);
    robot.dragMouse(x, y + hight / parts);
  }
  for (let i = 0; i <= parts; i++) {
    const mousePos = robot.getMousePos();
    let { x, y } = robot.getMousePos();
    console.log(x - width / parts, y);
    robot.dragMouse(x - width / parts, y);
  }
  for (let i = 0; i <= parts; i += 1) {
    const mousePos = robot.getMousePos();
    let { x, y } = robot.getMousePos();
    console.log(x - width / parts, y - hight / parts);
    robot.dragMouse(x, y - hight / parts);
  }
  robot.mouseToggle("up", "left");
};
