import { Document, Page,View } from '@react-pdf/renderer';

import Styles from "./PDFStyleSheets";
import PdfCard from "./cards/PdfCard"
import { mapOutCardProperties } from "./cards/utils"

import DB from "../../DB_test.json"

export default function PdfDocument () {

  // select certains properties from database items (still retunrs arr of objs)
  let db = mapOutCardProperties(DB).slice(0,10);

  let cardsList = [], itemsInRow = [];
  for (let i = 0; i < db.length; i+=2) {
    // check if there will be 1 or 2 items in row
    itemsInRow = i === db.length - 1 ? [ db[i] ] : [ db[i+1], db[i] ];

    cardsList.push(
      itemsInRow.length === 2 ?
      <View style={Styles.item.row} key={`data-row-${Math.floor(i/2)}`} >
        <PdfCard key={`item-${db[i].code1}`} cardData={db[i]}/>
        <PdfCard key={`item-${db[i+1].code1}`} cardData={db[i+1]}/>
      </View> :
      <View style={Styles.item.row} key={`data-row-${Math.floor(i/2)}`}>
        <PdfCard key={`item-${db[i].code1}`} cardData={db[i]}/>
      </View>
    );
  }
  
  function PDFDocumentOutput() {
    return(
      <Document>
        <Page size="A4" style={Styles.a4.page}>
          {cardsList}
        </Page>
      </Document>
    );
  }

  return (<PDFDocumentOutput />);
}