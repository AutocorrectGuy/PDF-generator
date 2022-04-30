import React, { Fragment, useState, useRef, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import Split from "react-split";
import DndCard from "./DndCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons"


// todo: save these variables in seperate file
const cardWidth = 225;
const dndStyles = {
  gutterWidth: 64,
  gapW: 4,
  colCountForCheck: 5
}
const {gutterWidth, gapW, colCountForCheck} = dndStyles;

const panelStyles         = "flex flex-wrap content-start py-12 gap-[2px] mx-2 relative";
const panelPartStyles     = "flex flex-grow place-content-center bg-[#44494d]";
const faTrashCanStyles    = "absolute w-6 h-6 p-[6px] top-0 right-0 text-neutral-200 hover:text-red-600 cursor-pointer rounded-full"
const fa1                 = "absolute w-9 h-9 p-[6px] top-0 right-0 cursor-pointer rounded-full"
const leftPanelPlaceholder = "absolute flex justify-center items-center w-full h-96 select-none overflow-hidden";

export default function Dnd({data}) {
  data.map((item, i) => {
    item.pos = i;
    item.isSelected = false;
  });
  const [listStateLeft, setListStateLeft]   = useState([]);
  const [listStateRight, setListStateRight] = useState([...data]);
  const [panelSizes, setPanelSizes]         = useState([]);
  const [x, setX] = useState(0);
  const panelBoundingBox                    = useRef(null);
  useEffect(() => {
    panelBoundingBox.current                = document.getElementById("dnd-split-panel");
    let wLeft = Math.round((cardWidth * 2+(gutterWidth/2) + gapW) / panelBoundingBox.current.clientWidth * 100);
    setPanelSizes([wLeft, 100-wLeft])
  },[])

  const SortableItem     = SortableElement(({ value }) => 
    <div className="relative">
      <FontAwesomeIcon icon={faTrashAlt} className={faTrashCanStyles}/>
      <DndCard cardData={value}/>
    </div>
  );
  const SortableListLeft = SortableContainer(({ items }) => 
    <div id="dnd-split-panel" className={`${panelStyles} ${items.length > 0 ? "overflow-hidden" : "overflow-visible"}`}>
      {items.sort((a, b) => (a.pos - b.pos))
        .map((item, i) => <SortableItem key={`card-${i}`} value={item} index={i}/> 
        )}
      {(items.length === 0) && 
      (<div className={`${leftPanelPlaceholder} ${panelSizes[0] < 1 ? "" : "border-2 border-blue-600 "}`}> 
        <div className="text-white text-2xl text-center px-10 opacity-40">
          {`${panelSizes[0] < 40 ? "Izvēlies produktu no saraksta" : "Noklišķini uz produkta blakus sarakstā, lai sāktu darbu"}`}
        </div>
      </div>)}
    </div>
  );
  const ListRight       = SortableContainer(({ items }) => 
    <div className={panelStyles}>
      {items.map((item, i) => 
        <div key={`card-${i}`} className="relative"
          onClick={(e) => onClickRightLICallBack(e, {item, i})}>
          <FontAwesomeIcon icon={faCheck} className={`${fa1} ${item.isSelected ? "text-green-600" : "text-neutral-100" }`}/>
          <DndCard cardData={item} index={i}/>
        </div>
      )}
    </div>
  );
  
  return (
    <Fragment>
      <Split id="dnd-split-panel" 
        direction="horizontal" dragInterval={5}  
        sizes={panelSizes} minSize={0} gutterSize={20}
        className={panelPartStyles}
        onDragStart={(sizes) => onDragStartCallBack(sizes)}
        onDragEnd={(sizes) => onDragEndCallBack(sizes)}
      >
        <div>
          <SortableListLeft items={[...listStateLeft]} axis="xy" 
            updateBeforeSortStart={({index}, e) => updateBeforeSortStartCallBack({index}, e)}
            onSortEnd={sortEndCallBack}/>
        </div>
        <div>
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
      arrCopy.map((item, j) => item.isSelected = (i === j) ? false : item.isSelected);
    // if item is not in the left list - add it to the left list (and update checkboxes)
    } else {
      // update left list
      arrCopy.map((item, j) => item.isSelected = (i === j) ? true : item.isSelected);
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
    console.log(wLeftPerc);
  }
}

// helpers
function createShallowArrCopy(targetArray) {
  return JSON.parse(JSON.stringify(targetArray));  
}