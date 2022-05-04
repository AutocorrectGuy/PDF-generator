import SortableItem from "./SortableItem"
import { SortableContainer } from "react-sortable-hoc";
import { updateBeforeSortStartCallBack, sortEndCallBack } from "../EventListeners"

export default function SortableListLeft ({
  items,
  container,
  placeholderLeftCon,
  panelSizes,
  placeholderLeftText,
  listStateLeft, setListStateLeft,
  listStateRight, setListStateRight
}) {

  const MySortableContainer = SortableContainer(({items}) => {
    return (
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
    )
  });

  return (
    <div>
      <MySortableContainer 
        items = {items} axis  = "xy"
        updateBeforeSortStart = {({index}, e) => updateBeforeSortStartCallBack({index}, e, listStateLeft, listStateRight, setListStateRight)}
        onSortEnd = {({ oldIndex, newIndex})  => sortEndCallBack({oldIndex, newIndex}, listStateLeft, setListStateLeft) }
      />
    </div>
  );
}