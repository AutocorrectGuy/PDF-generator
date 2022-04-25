import { PDFViewer } from "@react-pdf/renderer"

export default function StyledViewer({pdfDoc}) {
  return(
    <PDFViewer className="h-screen w-full">
      {pdfDoc}
    </PDFViewer>
  )
}