import { StyleSheet } from '@react-pdf/renderer';

const a4 = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "center"
  }
});

const def = {
  card: {
    height: "115px",
    header: {
      backgroundColor: "#0873BB",
      height: "42px",
      fontSize: "10px",
    },
    p: {
      fontSize: "9px",
      lineHeight: "1.3"
    }
  }
}

const item = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginVertical: "5px",
    marginRight: "8px",
    marginLeft: "14px",
    justifyContent: "center"
  },
  card_con: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    height: "120px",
    border: "1.5px solid black",
    marginHorizontal: "6px"
  },

  card_left_con: {
    width: "50%",
    borderRight: "1px solid black"
  },
  card_left_top_con: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: "4px",
    width: "100%",
    height: def.card.header.height,
    backgroundColor: def.card.header.backgroundColor,
    borderBottom: "1px solid black"
  },
  card_left_top_p: {
    color: "white",
    lineHeight: def.card.p.lineHeight,
    fontSize: def.card.header.fontSize,
    fontFamily: "OpenSans-Regular",
    paddingTop: "1px"
  },

  card_left_bottom_con: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "3px"
  },
  card_left_bottom_p_bold: {
    position: "absolute",
    width: "100px",
    // height: "12px",
    color: "black",
    fontSize: def.card.p.fontSize,
    fontFamily: "OpenSans-Bold",
    lineHeight: def.card.p.lineHeight,
  },
  card_left_bottom_p_regular: {
    color: "black",
    fontSize: def.card.p.fontSize,
    fontFamily: "OpenSans-Regular",
    lineHeight: def.card.p.lineHeight
  },


  card_price_con: {
    position: "absolute", 
    display: "flex", 
    flexDirection:"row", 
    right: "3px", 
    bottom: "7px", 
    alignItems: "baseline"
  },
  card_price_big: {
    fontFamily: "OpenSans-Regular",
    fontSize: "24px",
    lineHeight: 1
  },
  card_price_small: {
    fontFamily: "OpenSans-Regular",
    fontSize: "16px",
    lineHeight: 0.95
  },


  card_right: {
    display: "flex",
    width: "50%",
  },
  card_right_img_con: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(230,230,230)"
  },
  card_right_p_con: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "5px"
  },
  card_right_p: {
    fontFamily: "OpenSans-Regular",
    fontSize: def.card.header.fontSize,
    paddingBottom: "3px"
  }
});

const Style = {
  a4: a4,
  item: item
}

export default Style;

// default fonts from @react-pdf:
// 'Courier',
// 'Courier-Bold',
// 'Courier-Oblique',
// 'Helvetica',
// 'Helvetica-Bold',
// 'Helvetica-Oblique',
// 'Times-Roman',
// 'Times-Bold',
// 'Times-Italic'