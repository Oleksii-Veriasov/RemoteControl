import Jimp from "jimp";
import robot from "robotjs";
const size = 200;

export const makeScreenshot = async () => {
  let { x, y } = robot.getMousePos();
  let rimg = robot.screen.capture(x, y, size, size);

  let jimg = new Jimp(size, size);
  for (var ix = 0; ix < size; ix++) {
    for (var iy = 0; iy < size; iy++) {
      var hex = rimg.colorAt(ix, iy);
      var num = parseInt(hex + "ff", 16);
      jimg.setPixelColor(num, ix, iy);
    }
  }
  const dataPng = await jimg.getBase64Async(Jimp.MIME_PNG);

  return dataPng.split("base64,")[1];
};
