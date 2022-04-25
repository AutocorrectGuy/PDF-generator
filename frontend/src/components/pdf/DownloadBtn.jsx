import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";

const styleBtn = "rounded-md px-4 py-2 text-white text-lg";

const LoadingBtn = function() {
  return(
    <button 
    className={`${styleBtn} bg-red-600 `}
    >Creating document...</button>
  )
}

const ReadyBtn = function(props) {
  return(
    <button 
      className={`${styleBtn} bg-green-700 hover:bg-green-600`}
      >Download
    </button>
  )
}

export default function DownloadBtn({pdfDoc}) {
  // <PdfDocument />
  return(
    <div className="flex justify-center items-center my-4">
      <PDFDownloadLink 
        document={pdfDoc} 
        fileName="FORM"
        >
        {({loading}) => ((loading) ? <LoadingBtn /> : <ReadyBtn/>)}
      </PDFDownloadLink>
    </div>
  );
}