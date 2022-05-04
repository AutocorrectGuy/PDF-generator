import {onClickRightLICallBack} from "../EventListeners"
import { cardStyles, dndPanelStyles} from "../DndStyles"
import { SortableContainer } from "react-sortable-hoc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import DndCard from "../DndCard";

const {placeholderLeftCon, placeholderLeftText} = dndPanelStyles.splitLeftPlaceholder;
const {container } = dndPanelStyles;
const {faCheckStyles} = cardStyles.icons;

export default function SortableListRight({
  listStateLeft,
  setListStateLeft,
  listStateRight,
  setListStateRight,
  searchBarTextValue,
  dropdownLists,
  dropdownProperty,
  panelSizes
}) {
  const MySortableContainer = SortableContainer(({ items }) => {
    return(
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
  });

  return (
    <div>
      <MySortableContainer items = {listStateRight}/>
    </div>
  );
}