import { useEffect,  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons' // <-- import styles to be used
import { cardStyles, cardSizes } from '../dnd/DndStyles';

const btnCL = "text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 rounded-md cursor-pointer";
let cardNodes, cardNodesH1, cardSize, prevCardSize;

export default function Navbar() {

  useEffect(() => {
    cardNodes = document.querySelectorAll("[data-card]");
    cardNodesH1 = document.querySelectorAll("[data-card-h1]");
    cardSize = 0;
    cardNodes.forEach(card => card.classList = `${cardStyles.card} ${cardSizes[cardSize].card}`)
    cardNodesH1.forEach(card => card.classList = `${cardStyles.h1} ${cardSizes[cardSize].h1}`)
  },[])

  return(
    <div className="flex flex-row items-center py-1 justify-between bg-white shadow-xs">
      <div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
      <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
        <input type="search" name="serch" placeholder="Search"
          className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none" />
        <FontAwesomeIcon icon={faEye} />
      </span>
      <div className="flex flex-row mr-4 ml-4 md:hidden">
        <i className="fas fa-bars"></i>
      </div >
        <div className="hidden md: flex-row md:mr-8  md:flex">
          <div className={btnCL} onClick={(e) => changeCardSize(-1)}>-</div>
          <div className={btnCL} onClick={(e) => changeCardSize(1)}>+</div>
        </div>
    </div>
  );
}

function changeCardSize(size) {
  prevCardSize = cardSize;
  if(!(cardSize+size < cardSizes.length && cardSize+size >= 0))
    return;
  cardSize += size;
  cardNodes.forEach((card, i) => {
    card.classList.value = card.classList.value.replace(cardSizes[prevCardSize].card, cardSizes[cardSize].card)
    cardNodesH1[i].classList.value = cardNodesH1[i].classList.value.replace(cardSizes[prevCardSize].h1, cardSizes[cardSize].h1)
  });
}