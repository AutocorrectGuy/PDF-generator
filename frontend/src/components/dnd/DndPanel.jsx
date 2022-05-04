import React, { Fragment, useState, useRef, useEffect } from "react";
import Split from "react-split";
import { dndPanelStyles } from "./DndStyles";
import { calcLeftPanelWidth, onDragStartCallBack, onDragEndCallBack, onDragCallback } from "./EventListeners"
import SortableListLeft from "./leftPanel/SortableListLeft";
import SearchBarRight from "./rightPanel/SearchBar"
import SortableListRight from "./rightPanel/SortableListRight"

// init styles
const {container, splitContainer } = dndPanelStyles;
const {placeholderLeftCon, placeholderLeftText} = dndPanelStyles.splitLeftPlaceholder;

export default function DndPanel() {
  const [listStateLeft, setListStateLeft]   = useState([]);
  const [listStateRight, setListStateRight] = useState([]);
  const [panelSizes, setPanelSizes]         = useState([]);
  const panelBoundingBox                    = useRef(null);
  const searchBarTextValue                  = useRef("");
  const [dropdownSize, setDropdownSize]     = useState("big");
  const fullSearchRef                       = useRef(false);
  const [fullSearch, setFullSearch]         = useState(fullSearchRef.current);

  const kataloguSaraksts = ["Katalogs 1","Katalogs 2","Katalogs 3","Katalogs 4","Katalogs 5","Katalogs 6","Katalogs 7","Katalogs 8","Katalogs 9","Katalogs 10","Katalogs 11","Katalogs 12","Katalogs 13","Katalogs 14","Katalogs 15","Katalogs 16","Katalogs 17","Katalogs 18","Katalogs 19","Katalogs 20","Katalogs 21","Katalogs 22","Katalogs 23","Katalogs 24","Katalogs 25","Katalogs 26","Katalogs 27","Katalogs 28","Katalogs 29","Katalogs 30","Katalogs 31","Katalogs 32","Katalogs 33","Katalogs 34","Katalogs 35","Katalogs 36","Katalogs 37","Katalogs 38","Katalogs 39","Katalogs 40"];
  const dropdownSettings = [{ name: "nosaukums", key: "h1" }, { name: "materiāls", key: "material" }, { name: "svars", key: "weight" }, { name: "cena", key: "price" }, { name: "xyz-kods", key: "code1" }, { name: "pilnais kods", key: "code2" }];
  const dropdownInnerContent = dropdownSettings.map(({name}) => name);
  const dropdownLists     = useRef(kataloguSaraksts[0])
  const dropdownProperty  = useRef(dropdownInnerContent[0])

  useEffect(() => {
    panelBoundingBox.current = document.getElementById("dnd-split-panel");
    let wLeft                = calcLeftPanelWidth(2, panelBoundingBox.current.clientWidth);
    setPanelSizes([wLeft, 100 - wLeft])
  },[])

  return (
    <Fragment>
      <Split id="dnd-split-panel" className={splitContainer}
        direction="horizontal" dragInterval={5} sizes={panelSizes} minSize={0} gutterSize={20}
        onDragStart = {(sizes) => onDragStartCallBack(sizes, setPanelSizes)}
        onDrag      = {(sizes) => onDragCallback(sizes, panelBoundingBox.current.clientWidth, setDropdownSize)}
        onDragEnd   = {(sizes) => onDragEndCallBack(sizes, panelBoundingBox.current.clientWidth, panelSizes, setPanelSizes)}
      >
        <div>
          <SortableListLeft 
            items               = {listStateLeft}
            container           = {container}
            placeholderLeftCon  = {placeholderLeftCon}
            panelSizes          = {panelSizes}
            placeholderLeftText = {placeholderLeftText}
            listStateLeft       = {listStateLeft}
            setListStateLeft    = {setListStateLeft}
            listStateRight      = {listStateRight}
            setListStateRight   = {setListStateRight}
          />
        </div>
        <div>
          <SearchBarRight 
            dropdownSize       = {dropdownSize}        setDropdownSize      = {setDropdownSize}
            fullSearch         = {fullSearch}          setFullSearch        = {setFullSearch}
            searchBarTextValue = {searchBarTextValue}  kataloguSaraksts     = {kataloguSaraksts}
            dropdownSettings   = {dropdownSettings}    dropdownInnerContent = {dropdownInnerContent}
            dropdownLists      = {dropdownLists}       dropdownProperty     = {dropdownProperty}
            listStateLeft      = {listStateLeft}       setListStateRight    = {setListStateRight}
            fullSearchRef      = {fullSearchRef}
          />
          <SortableListRight 
              listStateLeft       = {listStateLeft}
              setListStateLeft    = {setListStateLeft}
              listStateRight      = {listStateRight}
              setListStateRight   = {setListStateRight}
              searchBarTextValue  = {searchBarTextValue}
              dropdownLists       = {dropdownLists}
              dropdownProperty    = {dropdownProperty}
              panelSizes          = {panelSizes}
          />
        </div>
      </Split>
    </Fragment>
  );
}