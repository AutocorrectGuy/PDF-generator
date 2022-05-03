import React, { Fragment, useState, useRef, useEffect } from "react";
import Split from "react-split";
import { SortableContainer } from "react-sortable-hoc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronRight, faSortDown, faAlignLeft, faBook} from "@fortawesome/free-solid-svg-icons"
import DndCard from "./DndCard";
import { cardStyles, dndPanelStyles } from "./DndStyles";
import { calcLeftPanelWidth, onDragStartCallBack, onDragEndCallBack, updateBeforeSortStartCallBack, 
  sortEndCallBack, onClickRightLICallBack, onChangeListener } from "./EventListeners"
import DB from "../../DB_test.json"
import SortableItem from "./leftPanel/SortableItem"
import DropdownButton from "../buttons/DropdownBtn";

// init styles
const {container, splitContainer, dropdowns, searchBar} = dndPanelStyles;
const {placeholderLeftCon, placeholderLeftText} = dndPanelStyles.splitLeftPlaceholder;
const {faCheckStyles, faSearchStyles} = cardStyles.icons;
const {list, item} = dropdowns; //dropdowns
const {searchBarContainer, searchBarInputContainer, sarchBarBtnKatalogs, sarchBarInputDOM} = searchBar;

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

  const SortableListLeft = SortableContainer(({ items }) => 
    <div>
      <div id="dnd-split-panel" className={`pt-[56px] ${container} ${items.length > 0 ? "overflow-hidden" : "overflow-visible"}`}>
      {(items.length === 0) && (
        <div className={`${placeholderLeftCon} ${panelSizes[0] < 1 ? "" : "border-2 border-blue-600 "}`}> 
          <div className={`${placeholderLeftText} px-10`}>
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
          onClick={(e) => onClickRightLICallBack(e, {item, i}, listStateLeft, setListStateLeft, listStateRight, setListStateRight)}>
          <FontAwesomeIcon icon={faCheck} className={`${faCheckStyles} ${item.isSelected ? "text-green-600" : "text-neutral-100" }`}/>
          <DndCard cardData={item} index={i}/>
        </div>
      )}
      {(items.length === 0) && (
        <div className={`${placeholderLeftCon} ${panelSizes[0] < 1 ? "" : "border-2 border-blue-600 "}`}> 
          <div className={`${placeholderLeftText} px-6 whitespace-pre-line`}>
            {(searchBarTextValue.current!== null && searchBarTextValue.current.length > 0) 
              ? `${dropdownLists.current === "Visi katalogi" ? "Meklējot visos katalogos" : `Katalogā "${dropdownLists.current}"`} \n${dropdownProperty.current} "${searchBarTextValue.current}" netika atrasts` 
              : `Meklēt produktus pēc kritērija \n"${dropdownProperty.current}" ${dropdownLists.current === "Visi katalogi" ? "visos katalogos" : `\nkatalogā "${dropdownLists.current}"`}`
            }
          </div>
        </div>
      )}
    </div>
  );

  /**
   * SEARCHBAR-RIGHT
   */
  const SearchBarRight = () => {
    useEffect(() => {
      document.querySelector('input[name="search-card"]').value = searchBarTextValue.current;
      document.querySelector('input[name="search-card"]').focus();
    }, [])

    const DropdownOfLists = () => {
      return(
        <div className="flex flex-wrap h-10">
          <DropdownButton 
            dropDownName    = "search-bard-dropdown-lists" 
            innerContent    = {kataloguSaraksts}
            btnClass        = {list.btnClass}
            menuClass       = {list.menuClass} 
            menuItemClass   = {list.menuItemClass} 
            iconLeft        = {<FontAwesomeIcon icon={faAlignLeft} className={`text-neutral-400 ${list.iconLeftCass}`}/>}
            iconRight       = {<FontAwesomeIcon icon={faSortDown} className={list.iconRightCass}/>}
            bgColorBackDrop = {"bg-transparent"}
            btnInnerText    = {dropdownSize === "big" ? dropdownLists.current: ""}
            widthsEqual     = {true}
            onClickOnMenu   = {(e) => {
              dropdownLists.current = e.target.innerText !== ""
                ? e.target.innerText : dropdownLists.current;
              onChangeListener(
                e, DB, searchBarTextValue, listStateLeft, setListStateRight, 
                dropdownLists.current, dropdownProperty.current, dropdownSettings,
                fullSearchRef.current)}
            }
          />
        </div>
      )
    }
    const DropdownItemProperties =() => {
      return(
        <div className="h-10">
          <DropdownButton 
            dropDownName    = "search-bard-dropdown-properties" 
            innerContent    = {dropdownInnerContent}
            btnClass        = {`${item.btnClass} ${dropdownSize === "big" ? "min-w-[120px]" : ""}`}
            menuClass       = {`${item.menuClass} ${dropdownSize === "big" ? "w-full" : ""}`} 
            menuItemClass   = {item.menuItemClass} 
            iconRight       = {<FontAwesomeIcon icon={faSortDown} className={item.iconRightCass}/>}
            bgColorBackDrop = {"bg-transparent"}
            btnInnerText    = {dropdownSize === "big" ? dropdownProperty.current : ""}
            widthsEqual     = {true}
            onClickOnMenu   = {(e) => {
              dropdownProperty.current = e.target.innerText !== ""
                ? e.target.innerText : dropdownProperty.current;
              onChangeListener(
                e, DB, searchBarTextValue, listStateLeft, setListStateRight, 
                dropdownLists.current, dropdownProperty.current, dropdownSettings,
                fullSearchRef.current)}
            }
          />
        </div>
      );
    }
    return (
      <div className={searchBarContainer}>
        <DropdownOfLists />
        <div className={searchBarInputContainer}>
          <button className={sarchBarBtnKatalogs}>
            <FontAwesomeIcon icon={faChevronRight} className={faSearchStyles}/>
          </button>
          <input type="text" name="search-card"
            placeholder={`Produkta ${dropdownProperty.current}`} autoComplete="off"
            className={sarchBarInputDOM}
            onChange={(e) => onChangeListener(
              e, DB, searchBarTextValue, listStateLeft, setListStateRight, 
              dropdownLists.current, dropdownProperty.current, dropdownSettings, 
              fullSearchRef.current)}
          />
          <div className="flex items-center h-10 pr-1 bg-neutral-600">
            <div className={`${fullSearch ? "bg-blue-500" : "bg-transparent hover:bg-neutral-500" }
              px-1 py-[2px] rounded-sm  cursor-pointer active:translate-y-px`}
              onClick={(e) => {
                setFullSearch(fullSearchRef.current = !fullSearchRef.current); // toggle button
                onChangeListener(           // immediately show full catalogue data
                  e, DB, searchBarTextValue, listStateLeft, setListStateRight, 
                  dropdownLists.current, dropdownProperty.current, dropdownSettings,
                  fullSearchRef.current)}
              }
            >
              <FontAwesomeIcon icon={faBook} className={`w-[18px] h-[18px] translate-y-px text-white`}/>
            </div>
          </div>
          {/* <SearchBarSuggestions /> */}
          <DropdownItemProperties />
        </div>
      </div>
    );
  }

  const maxDndWidth = 670;
  let sizeReduced = false;
  function onDragCallback(sizes) {
    const preferedRatio = maxDndWidth / panelBoundingBox.current.clientWidth * 100;
    if(sizes[1] < preferedRatio && !sizeReduced) {
      sizeReduced = true;
      setDropdownSize("small");
    } else if (sizes[1] >= preferedRatio && sizeReduced) {
      sizeReduced = false;
      setDropdownSize("big");
    }
  }

  return (
    <Fragment>
      <Split id="dnd-split-panel" className={splitContainer}
        direction="horizontal" dragInterval={5} sizes={panelSizes} minSize={0} gutterSize={20}
        onDragStart={(sizes) => onDragStartCallBack(sizes, setPanelSizes)}
        onDrag={(sizes) => onDragCallback(sizes) }
        onDragEnd={(sizes) => {onDragEndCallBack(sizes, panelBoundingBox.current.clientWidth, panelSizes, setPanelSizes)}}
      >
        <div>
          <SortableListLeft items={listStateLeft} axis="xy" 
            updateBeforeSortStart={({index}, e) => updateBeforeSortStartCallBack({index}, e, listStateLeft, listStateRight, setListStateRight)}
            onSortEnd={({ oldIndex, newIndex}) => sortEndCallBack({ oldIndex, newIndex}, listStateLeft, setListStateLeft)}/>
        </div>
        <div>
          <SearchBarRight />
          <ListRight items={[...listStateRight]} />
        </div>
      </Split>
    </Fragment>
  );
}