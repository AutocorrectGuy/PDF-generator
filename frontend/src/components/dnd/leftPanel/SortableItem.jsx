import { SortableElement } from "react-sortable-hoc";
import DndCard from "../DndCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { cardStyles } from "../DndStyles";
const { faTrashCanStyles } = cardStyles.icons;

const SortableItem     = SortableElement(({ value }) => 
  <div className="relative">
    <FontAwesomeIcon icon={faTrashAlt} className={faTrashCanStyles}/>
    <DndCard cardData={value}/>
  </div>
);

export default SortableItem;