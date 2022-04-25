/**
 * 
 * @param {number} price (double, float or integer)
 * @param {string} currency For example: "EUR", "USD"
 * Converts "price" number to currency in format: `${currenct}xx.yy`
 * then splits it into 2 seperate strings ["xx", "yy"].
 * @returns array of 2 strings, for example: ["39", "99"]
 */
export function beautifyAndSplitPrice(price, currency) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: currency, 
  });
  return formatter.format(price).toString().split(".");
}

export function mapOutCardProperties(dbCardArray) {
  return dbCardArray.map(
    ({h1, material, weight, w_unit, price, currency, code1, code2, img }) =>
    ({h1, material, weight, w_unit, price, currency, code1, code2, img })
  )
}