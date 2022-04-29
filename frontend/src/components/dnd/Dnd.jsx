import React, { Fragment, useState, useRef, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import Split from "react-split";
import DndCard from "./DndCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"


// todo: save these variables in seperate file
const cardWidth = 225;
const dndStyles = {
  gutterWidth: 64,
  gapW: 4,
  colCountForCheck: 5
}
const {gutterWidth, gapW, colCountForCheck} = dndStyles;

const panelStyles         = "flex flex-wrap content-start py-12 gap-[2px] box-border overflow-hidden mx-2";
const panelPartStyles     = "flex flex-grow place-content-center bg-[#44494d]";
const faTrashCanStyles = "absolute w-6 h-6 p-[6px] top-0 right-0 text-neutral-200 hover:text-red-600 cursor-pointer rounded-full"

export default function Dnd({data}) {
  data.map((item, i) => item.pos = i);
  const [listStateLeft, setListStateLeft]   = useState([...data].splice(0,7));
  const [listStateRight, setListStateRight] = useState([...data]);
  const [panelSizes, setPanelSizes]         = useState([]);
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
    <div id="dnd-split-panel" className={panelStyles}>
      {items.sort((a, b) => (a.pos - b.pos))
        .map((item, i) => <SortableItem key={`card-${i}`} value={item} index={i} /> 
        )}
    </div>
  );
  const ListRight       = SortableContainer(({ items }) => 
    <div className={panelStyles}>
      {items.map((item, i) => 
        <div key={`card-${i}`}  onClick={(e) => onClickRightLICallBack(e, {item, i})}>
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
    // create shallow copy of array
    let arrShallowCopy = JSON.parse(JSON.stringify(listStateLeft));    
    // swaps items BETWEEN mouse drag start and end
    let newArr = arrayMoveImmutable(arrShallowCopy, oldIndex, newIndex);
    // updates new positions in each item
    newArr.forEach((item, i) => item.pos = i);
    // update array state
    setListStateLeft(newArr);
  }
  function onClickRightLICallBack(e, {item, i}) {
    // check if it is duplicate by "code1" key value
    if(listStateLeft.map(({code1}) => code1).includes(item.code1)) return;
    setListStateLeft(oldArr => {
      item.pos = i;
      let newArr = [...oldArr, item];
      newArr.forEach((arrItem, i) => arrItem.pos = i);
      return newArr;
    })
  }
  function updateBeforeSortStartCallBack({index}, e){
    // check fontAwesome icon tag name possibilities
    if(e.target.tagName === "svg" || e.target.tagName === "path") {
      e.target.parentNode.classList.add("hidden");
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
      wLeftPerc = [0.001, 99.999];
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