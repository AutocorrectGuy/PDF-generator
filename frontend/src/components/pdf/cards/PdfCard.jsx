import { View, Text } from "@react-pdf/renderer"
import Styles from "../PDFStyleSheets";
import {beautifyAndSplitPrice} from "./utils"

// css "float: right" doesn't work on @react-pdf, therefore one of the best options to
// float text over other line of text is to use change position properties and text-indents

export default function PdfCard({cardData}) {

  let {h1, material, weight, w_unit, price, currency, img, code1, code2} = cardData;
  let priceStringSplit = beautifyAndSplitPrice(price, currency);

  function Header() {
    return(
      <View style={Styles.item.card_left_top_con}>
        <Text style={Styles.item.card_left_top_p}>{h1}</Text>
      </View>
    )
  }
  function Material() {
    return(
      <View style={{display: "flex", position: "relative", flexDirection: "row"}}>
        <Text style={Styles.item.card_left_bottom_p_bold}>Material:&nbsp;</Text>
        <Text style={[Styles.item.card_left_bottom_p_regular, {textIndent: "43px"}]}>{material}</Text>
      </View>
    );
  }
  function Weight() {
    return(
      <View style={{display: "flex", position: "relative", flexDirection: "row"}}>
        <Text style={Styles.item.card_left_bottom_p_bold}>Weight:&nbsp;</Text>
        <Text style={[Styles.item.card_left_bottom_p_regular, {textIndent: "37px"}]}>{`${weight} ${w_unit}`}</Text>
      </View>
    );
  }
  function PriceLabel() {
    return(
      <View style={{display: "flex", position: "relative", flexDirection: "row"}}>
        <Text style={Styles.item.card_left_bottom_p_bold}>Price:&nbsp;</Text>
      </View>
    );
  }
  function PriceNum() {
    return(
      <View style={Styles.item.card_price_con}>
        <Text style={Styles.item.card_price_big}>{priceStringSplit[0]}.</Text>
        <Text style={Styles.item.card_price_small}>{priceStringSplit[1]}</Text>
      </View>
    )
  }

  // Render object, if prop is given from database
  let isMaterial  = material.length !== 0;
  let isWeight    = weight.length   !== 0;
  let isPrice     = price.length    !== 0;

  function CardLeftSide() {
    return(
      <View style={Styles.item.card_left_con}>
        <Header />
        <View style={Styles.item.card_left_bottom_con}>
          {isMaterial && <Material />}
          {isWeight   && <Weight /> }
          {isPrice    && <PriceLabel />}
          {isPrice    && <PriceNum />}
        </View>
      </View>
    );
  }
  function CardRightSide() {
    return(
      <View style={Styles.item.card_right}>
        <View style={Styles.item.card_right_img_con}>
          {/** place for image here */}
        </View>
        <View style={Styles.item.card_right_p_con}>
          <Text style={Styles.item.card_right_p}>{code1}</Text>
          <Text style={Styles.item.card_right_p}>{`(${code2})`}</Text>
        </View>
      </View>
    )
  }

  return(
    <View style={Styles.item.card_con}>
      <CardLeftSide />
      <CardRightSide />
    </View>
  );
}