import Split from "react-split";
import StyledViewer from "../pdf/StyledPdfViewer";
import Dnd from "../dnd/Dnd";
import PdfDocument from "../pdf/PdfDocument";
import { mapOutCardProperties } from "../pdf/cards/utils";

// TODO: data should come out from navbar searchbar regex
import DB from "../../DB_test.json"

export default function EditorSplitPanel() {
  const myDoc = <PdfDocument />
  
  return(
    <Split
      sizes={[30, 70]}
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
      <Dnd data={mapOutCardProperties(DB.slice(0,20))}/>
    </Split>
  );
}