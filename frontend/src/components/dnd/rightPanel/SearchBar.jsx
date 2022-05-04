import { useEffect } from "react";
import DB from "../../../DB_test.json"
import DropdownButton from "../../buttons/DropdownBtn";
import { onChangeListener } from "../EventListeners"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSortDown, faAlignLeft, faBook} from "@fortawesome/free-solid-svg-icons"
import { cardStyles, dndPanelStyles } from "../DndStyles";
// SEARCHBAR
export default function SearchBarRight({
  dropdownSize, setDropdownSize,
  fullSearch, setFullSearch,
  searchBarTextValue,
  kataloguSaraksts,
  dropdownSettings,
  dropdownInnerContent,
  dropdownLists,
  dropdownProperty,
  listStateLeft,
  setListStateRight,
  fullSearchRef
}) {
  const {dropdowns, searchBar} = dndPanelStyles;
  const {faSearchStyles} = cardStyles.icons;
  const {list, item} = dropdowns; //dropdowns
  const {searchBarContainer, searchBarInputContainer, sarchBarBtnKatalogs, sarchBarInputDOM} = searchBar;

  // useEffect(() => {
  //   document.querySelector('input[name="search-card"]').value = searchBarTextValue.current;
  //   document.querySelector('input[name="search-card"]').focus();
  // }, [])

  const DropdownOfLists = () => {
    return (
      <div className="flex flex-wrap h-9">
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
  const DropdownItemProperties = () => {
    return (
      <div className="h-9 w-11 bg-red-500">
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
        <div className="flex items-center h-9 pr-1 bg-neutral-600">
          <div className={`${fullSearch ? "bg-blue-500" : "bg-transparent hover:bg-neutral-500" }
            px-1 py-[2px] rounded-sm  cursor-pointer active:translate-y-px`}
            onClick={(e) => {
              setFullSearch(fullSearchRef.current = !fullSearchRef.current); // toggle button
              onChangeListener( // immediately show full catalogue data
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

