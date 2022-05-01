import React, { Fragment, useState, useRef, useEffect } from "react";
import Split from "react-split";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck, faSearch } from "@fortawesome/free-solid-svg-icons"
import DndCard from "./DndCard";
import { cardSizes, cardStyles, dndPanelStyles } from "./DndStyles";
import DB from "../../DB_test.json"

// init styles
const cardWidth = cardSizes[0].width;
const {gutterWidth, gapW, colCountForCheck} = dndPanelStyles.gutter;
const {container, splitContainer} = dndPanelStyles;
const {placeholderLeftCon, placeholderLeftText} = dndPanelStyles.splitLeftPlaceholder;
const {faCheckStyles, faTrashCanStyles} = cardStyles.icons;

//TODO transfer styles to components style file
const faSearchStyles = "w-6 h-6 pl-2 pr-3 text-neutral-500 hover:text-[#0873BB] cursor-pointer rounded-full"

export default function Dnd() {
  const [listStateLeft, setListStateLeft]   = useState([]);
  const [listStateRight, setListStateRight] = useState([]);
  const [panelSizes, setPanelSizes]         = useState([]);
  const panelBoundingBox                    = useRef(null);
  const searchBarTextValue                  = useRef(null);

  useEffect(() => {
    panelBoundingBox.current                = document.getElementById("dnd-split-panel");
    let wLeft = Math.round((cardWidth * 2 + (gutterWidth / 2) + gapW) / panelBoundingBox.current.clientWidth * 100);
    setPanelSizes([wLeft, 100 - wLeft])
  },[])


  const SortableItem     = SortableElement(({ value }) => 
    <div className="relative">
      <FontAwesomeIcon icon={faTrashAlt} className={faTrashCanStyles}/>
      <DndCard cardData={value}/>
    </div>
  );
  const SortableListLeft = SortableContainer(({ items }) => 
    <div>
      <div id="dnd-split-panel" className={`pt-[56px] ${container} ${items.length > 0 ? "overflow-hidden" : "overflow-visible"}`}>
      {(items.length === 0) && (
        <div className={`${placeholderLeftCon} ${panelSizes[0] < 1 ? "" : "border-2 border-blue-600 "}`}> 
          <div className={placeholderLeftText}>
            {listStateRight.length > 0 ? "Izvēlies produktu no saraksta" : ""}
          </div>
        </div>
      )}
      {items.sort((a, b) => (a.pos - b.pos))
        .map((item, i) => <SortableItem key={`card-${i}`} value={item} index={i}/> 
      )}
      </div>
      <div className={"text-white text-lg text-left pt-2 pl-2 opacity-10 select-none"}>
        {items.length > 0 ? `n: ${items.length}` : ""}
      </div>
    </div>
  );
  const ListRight = SortableContainer(({ items }) => 
    <div className={container}>
      {items.map((item, i) => 
        <div key={`card-${i}`} className="relative"
          onClick={(e) => onClickRightLICallBack(e, {item, i})}>
          <FontAwesomeIcon icon={faCheck} className={`${faCheckStyles} ${item.isSelected ? "text-green-600" : "text-neutral-100" }`}/>
          <DndCard cardData={item} index={i}/>
        </div>
      )}
      {(items.length === 0) && (
        <div className={`${placeholderLeftCon} ${panelSizes[0] < 1 ? "" : "border-2 border-blue-600 "}`}> 
          <div className={placeholderLeftText}>
            {(searchBarTextValue.current!== null && searchBarTextValue.current.length > 0) 
              ? "Katalogs netika atrasts" : "Ievadi kataloga nosaukumu"
            }
          </div>
        </div>
      )}
    </div>
  );
  const SearchBarRight = () => {
    // input text value resets on state change, so we force it to render last rendered value after last render
    useEffect(() => {
      document.querySelector('input[name="search-card"]').value = searchBarTextValue.current;
      document.querySelector('input[name="search-card"]').focus();
    }, [])

    function onKeyUpListener(e) {
      // save last text value from input, because it will reset on render
      searchBarTextValue.current = e.target.value;
      // return list of data if it matches users input value
      let results = DB.filter(({lists}) => lists.includes(searchBarTextValue.current));
      // reset selected checkboxes
      results.map(listRightItem => listRightItem.isSelected = false);
      // update new selected checkboxes
      results.map((item) => item.isSelected = listStateLeft.map(({code1}) => code1).includes(item.code1));
      setListStateRight(results);
    }

    return (
      <div className="flex w-full justify-center bg-[#323639] pt-1 pb-3 px-2 mb-3 rounded-sm overflow-hidden">
        <div className="flex min-w-[1px] max-w-[450px] flex-grow items-center h-10 bg-neutral-700 rounded-sm shadow-sm shadow-neutral-800">
          <input type="text" name="search-card"
            placeholder="Kataloga nosaukums" 
            className="flex-grow min-w-[1px] h-full px-4 bg-[#535353] text-white placeholder:text-neutral-300 rounded-sm focus:outline-none" 
            onChange={(e) => onKeyUpListener(e)}
          />
          <button className="px-2">
            <div className="text-white">
              Opcijas
            </div>
          </button>
          <button><FontAwesomeIcon icon={faSearch} className={faSearchStyles}/></button>
        </div>
      </div>
    );
  }
  
  return (
    <Fragment>
      <Split id="dnd-split-panel" 
        direction="horizontal" dragInterval={5}  
        sizes={panelSizes} minSize={0} gutterSize={20}
        className={splitContainer}
        onDragStart={(sizes) => onDragStartCallBack(sizes)}
        onDragEnd={(sizes) => onDragEndCallBack(sizes)}
      >
        <div>
          <SortableListLeft items={[...listStateLeft]} axis="xy" 
            updateBeforeSortStart={({index}, e) => updateBeforeSortStartCallBack({index}, e)}
            onSortEnd={sortEndCallBack}/>
        </div>
        <div>
          <SearchBarRight />
          <ListRight items={[...listStateRight]} />
        </div>
      </Split>
    </Fragment>
  );

  /**
   * 
   * Event listener callbacks
   */
  function sortEndCallBack({ oldIndex, newIndex }) {
    let arrCopy = createShallowArrCopy(listStateLeft);    
    // swaps items BETWEEN mouse drag start and end
    let newArr = arrayMoveImmutable(arrCopy, oldIndex, newIndex);
    // updates new positions in each item
    newArr.forEach((item, i) => item.pos = i);
    // update array state
    setListStateLeft(newArr);
  }
  function onClickRightLICallBack(e, {item, i}) {
    // right list state will be updated, so create a copy of array anyways
    let arrCopy = createShallowArrCopy(listStateRight); 
    // if item is allready in the left list - than remove it (and update checkboxes)
    if(listStateLeft.map(({code1}) => code1).includes(item.code1)) {
      // update left list
      setListStateLeft(listStateLeft.filter(({code1}) => code1 !== item.code1));
      // update right list
      arrCopy.map((itemLeft) => itemLeft.isSelected = (item.code1 === itemLeft.code1) ? false : itemLeft.isSelected);
    // if item is not in the left list - add it to the left list (and update checkboxes)
    } else {
      // update left list
      arrCopy.map((itemLeft) => itemLeft.isSelected = (item.code1 === itemLeft.code1) ? true : itemLeft.isSelected);
      // update right list
      setListStateLeft(oldArr => {
        item.pos = i; 
        let newArr = [...oldArr, item];
        newArr.forEach((arrItem, i) => arrItem.pos = i);
        return newArr;
      })
    }
    setListStateRight([...arrCopy]);
  }
  function updateBeforeSortStartCallBack({index}, e){
    // check fontAwesome icon tag name possibilities
    if(e.target.tagName === "svg" || e.target.tagName === "path") {
      // remove unnecessary styles beofre removing item
      e.target.parentNode.classList.add("hidden");
      // update right list list (it removes checkboxes)
      let arrCopy = createShallowArrCopy(listStateRight);
      arrCopy.map((item) => {
        item.isSelected = item.code1 === listStateLeft[index].code1 
          ? false : item.isSelected
        return item;
      });
      setListStateRight(arrCopy);
      // remove item from the list
      listStateLeft.splice(index, 1);

    }
  }
  function onDragStartCallBack(sizes) {
    // cause force re-render component
    setPanelSizes([sizes[0]+0.001, sizes[1]-0.001]);
  }
  function onDragEndCallBack(sizes) {
    let wLeftPx = Math.round(panelBoundingBox.current.clientWidth * sizes[0] / 100);
    let wLeftPerc = panelSizes;

    if(wLeftPx < cardWidth + gutterWidth / 2) 
      wLeftPerc = [0, 100];
    else if(sizes[1] < 5) {
      wLeftPerc = [100,0];
    } else
      for(let i = 1; i <= colCountForCheck; i++)
        if((wLeftPx >= (cardWidth * i) + gutterWidth / 2) && (wLeftPx < (cardWidth * (i + 1)) + gutterWidth / 2)) {
          let panelLeftW = Math.round(100 * ((cardWidth * i) + (gutterWidth / 2) + gapW*(i-1)) / panelBoundingBox.current.clientWidth);
          wLeftPerc = [panelLeftW, 100 - panelLeftW];
        }
    setPanelSizes(wLeftPerc);
  }
}

// helpers
function createShallowArrCopy(targetArray) {
  return JSON.parse(JSON.stringify(targetArray));  
}