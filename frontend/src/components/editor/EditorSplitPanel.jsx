import Split from "react-split";
import StyledViewer from "../pdf/StyledPdfViewer";
import DndViewer from "../dnd/DndViewer";
import PdfDocument from "../pdf/PdfDocument";

export default function EditorSplitPanel() {
  const myDoc = <PdfDocument />



  
  return(
    <Split
    sizes={[30, 70]}
    minSize={100}
    expandToMin={false}
    gutterSize={10}
    gutterAlign="center"
    snapOffset={30}
    dragInterval={1}
    direction="horizontal"
    cursor="col-resize"
    className="flex px-3 py-5 bg-[#323639]"
  >
    <StyledViewer pdfDoc={myDoc}/>
    <DndViewer />
  </Split>
  );
}