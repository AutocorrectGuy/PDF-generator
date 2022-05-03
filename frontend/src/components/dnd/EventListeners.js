import { arrayMoveImmutable } from "array-move";
import { cardSizes, dndPanelStyles } from "./DndStyles"

const cardWidth = cardSizes[0].width;
const { gutterWidth, gapW, colCountForCheck } = dndPanelStyles.gutter;

/**
 * LEFT SPLIT PANEL
 */
export function sortEndCallBack({ oldIndex, newIndex}, listData, setListData) {
  // swaps items BETWEEN mouse drag start and end
  let newArr = arrayMoveImmutable(listData, oldIndex, newIndex);
  // updates new positions in each item
  newArr.forEach((item, i) => item.pos = i);
  // update array state
  setListData(newArr);
}
export function updateBeforeSortStartCallBack({index}, e, leftListData, rightListData, setRightListData){
  // check fontAwesome icon tag name possibilities
  if(e.target.tagName === "svg" || e.target.tagName === "path") {
    // remove unnecessary styles beofre removing item
    e.target.parentNode.classList.add("hidden");
    // update right list list (it removes checkboxes)
    rightListData.map((item) => {
      item.isSelected = item.code1 === leftListData[index].code1 
        ? false : item.isSelected
      return item;
    });
    setRightListData(rightListData);
    // remove item from the list
    leftListData.splice(index, 1);
  }
}

/**
 * RIGHT SPLIT PANEL
 */
 export function onClickRightLICallBack(e, {item, i}, listStateLeft, setListStateLeft, listStateRight, setListStateRight) {
  // if item is allready in the left list - than remove it (and update checkboxes)
  if(listStateLeft.map(({code1}) => code1).includes(item.code1)) {
    // update left list
    setListStateLeft(listStateLeft.filter(({code1}) => code1 !== item.code1));
    // update right list
    listStateRight.map((itemLeft) => itemLeft.isSelected = (item.code1 === itemLeft.code1) ? false : itemLeft.isSelected);
  // if item is not in the left list - add it to the left list (and update checkboxes)
  } else {
    // update left list
    listStateRight.map((itemLeft) => itemLeft.isSelected = (item.code1 === itemLeft.code1) ? true : itemLeft.isSelected);
    // update right list
    setListStateLeft(oldArr => {
      item.pos = i; 
      let newArr = [...oldArr, item];
      newArr.forEach((arrItem, i) => arrItem.pos = i);
      return newArr;
    })
  }
  setListStateRight([...listStateRight]);
}

/**
 * SPLIT PANEL GUTTER-DRAG CALLBACKS
 */
export function onDragStartCallBack(sizes, setSizes) {
  // cause force re-render component
  setSizes([sizes[0]+0.001, sizes[1]-0.001]);
}
export function onDragEndCallBack(sizes, panelContainerWidth, panelSizes, setPanelSizes) {
  let wLeftPx = Math.round(panelContainerWidth * sizes[0] / 100);
  let wLeftPerc = panelSizes;

  if(wLeftPx < cardWidth + gutterWidth / 2) 
    wLeftPerc = [0, 100];
  else if(sizes[1] < 5) {
    wLeftPerc = [100,0];
  } else
    for(let i = 1; i <= colCountForCheck; i++)
      if((wLeftPx >= (cardWidth * i) + gutterWidth / 2) && (wLeftPx < (cardWidth * (i + 1)) + gutterWidth / 2)) {
        let panelLeftW = calcLeftPanelWidth(i, panelContainerWidth);
        wLeftPerc = [panelLeftW, 100 - panelLeftW];
      }
  setPanelSizes(wLeftPerc);
}
export function calcLeftPanelWidth(cardsAmmount, panelContainerWidth) {
  return Math.round(100 * ((cardWidth * cardsAmmount) + (gutterWidth / 2) + gapW*(cardsAmmount-1)) / panelContainerWidth)
}

/**
 * SEARCH BAR
 */
 export function onChangeListener(
  e, DBdata, searchBarTextValue, listStateLeft, setListStateRight, 
  dropdownLists, dropdownProperty, dropdownSettings,
  fullSearch) {
  // save last text value from input, because it will reset on render
  // this function is used on buttons which doesn't provide e.target.value
  // for search, so we have to eleminate buttons acces to searchbar value changing
  if(e.target.value !== undefined)
    searchBarTextValue.current = e.target.value;
  // get correct list from which to choose items further
  let results = DBdata.filter(({lists}) => lists.includes(dropdownLists));
  
  // get property key from prom selected property button innertext
  let propertyKey = dropdownSettings.filter(({name}) => name === dropdownProperty);
  propertyKey = propertyKey[0].key;

  // filter out recieved results - items 
  results = filterResultsWithRegex(results, propertyKey, searchBarTextValue.current, fullSearch);

  // reset selected checkboxes
  results.map(listRightItem => listRightItem.isSelected = false);
  // update new selected checkboxes
  results.map((item) => item.isSelected = listStateLeft.map(({code1}) => code1).includes(item.code1));
  setListStateRight(results);
}

function filterResultsWithRegex(results, propertyKey, innerText, fullSearch) {
  if(innerText.length === 0 && !fullSearch) return [];
  
  results = results.filter((item) => validate(innerText, item[propertyKey]));
  return results;
}
function validate(innerText, target) {
  return RegExp(`${innerText.toLowerCase()}`).test(target.toLowerCase());
}