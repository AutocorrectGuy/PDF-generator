import "./tailwind/output.css"

import EditorSplitPanel from "./components/editor/EditorSplitPanel";
import registerAllFonts from "./components/pdf/AssetPreloader";
import Navbar from "./components/layout/Navbar";

function App() {
  registerAllFonts();
  return (
    <>
      {/* <Navbar/> */}
      <EditorSplitPanel/>
    </>
  );
}


export default App;