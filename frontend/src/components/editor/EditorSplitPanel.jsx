import Split from "react-split";
import StyledViewer from "../pdf/StyledPdfViewer";
import Dnd from "../dnd/Dnd";
import PdfDocument from "../pdf/PdfDocument";

export default function EditorSplitPanel() {
  const myDoc = <PdfDocument />
  return(
    <Split
      sizes={[0, 100]}
      minSize={0}
      expandToMin={false}
      gutterSize={20}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      className="flex pl-3 py-5 bg-[#323639] overflow-hidden"
    >
    <StyledViewer pdfDoc={myDoc}/>
      <Dnd />
    </Split>
  );
}