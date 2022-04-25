import { Font } from "@react-pdf/renderer"
import _fonts from "../../assets/configs/Imports-Font"

function registerAllFonts() {
  Object.keys(_fonts).forEach(font => {
    Object.keys(_fonts[font]).forEach(style => {
      Font.register({
        family: `${font}-${style.replace(`${font}_`, "")}`,
        src: _fonts[font][style]
      })
    });
  });
}

export default registerAllFonts;