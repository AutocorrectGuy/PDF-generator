import {cardStyles, cardSizes} from "./DndStyles"

export default function DndCard({cardData}) {

  function Header() {
    return(
      <div data-card-h1 className={`${cardStyles.h1} ${cardSizes[0].h1}`}>
        {cardData.h1}
      </div>
    );
  }
  function Material() {
    return(
      <div className="px-1 pt-[1px] select-none">
        <div className={`inline-block font-bold float-left select-none`}>Material:&nbsp;</div>
        <div>{cardData.material}</div>
      </div>
    );
  }
  function Weight() {
    return(
      <div className="px-1 select-none">
        <div className={`inline-block font-bold float-left select-none`}>Weight:&nbsp;</div>
        <div>{cardData.weight}</div>
      </div>
    );
  }
  function PriceLabel() {
    return (<div className={`px-1 font-bold select-none`}>Price:</div>);
  }

  // Render object, if prop is given from database
  let isMaterial  = cardData.material.length !== 0;
  let isWeight    = cardData.weight.length   !== 0;
  let isPrice     = cardData.price.length    !== 0;

  function LeftSide() {
    return(
      <div className="w-1/2 border-r border-r-black select-none">
        <div className="flex flex-col select-none">
          <Header />
          <div className="flex flex-col select-none">
            {isMaterial && <Material /> }
            {isWeight   && <Weight /> }
            {isPrice    && <PriceLabel /> }
          </div>
        </div>
      </div>
    );  
  }

  function RightSide() {
    return(
      <div className="w-1/2 flex text-black select-none justify-center items-center">
        <div>
          {}
        </div>
      </div>
    );
  }

  return(
    <div data-card className={`${cardStyles.card} ${cardSizes[0].card}`}>
      <LeftSide />
      <RightSide />
    </div>
  )
}