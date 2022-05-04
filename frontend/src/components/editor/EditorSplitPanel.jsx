import Split from "react-split";
import StyledViewer from "../pdf/StyledPdfViewer";
import DndPanel from "../dnd/DndPanel";
import PdfDocument from "../pdf/PdfDocument";

export default function EditorSplitPanel() {
  const myDoc = <PdfDocument />
  return(
    <Split
      direction="horizontal" dragInterval={5}
      sizes={[0, 100]} minSize={0} gutterSize={20}
      className="flex p-3 bg-[#323639] overflow-hidden"
    >
    <StyledViewer pdfDoc={myDoc}/>
      <DndPanel />
    </Split>
  );
}