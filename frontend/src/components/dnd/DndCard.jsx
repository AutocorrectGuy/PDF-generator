export default function DndCard({cardData}) {
  const containerClassList = `flex flex-row w-[300px] h-32 bg-white hover:bg-neutral-200 
  border border-black cursor-grab select-none`;
  
  const cardFontStyle = "font-OpenSans text-[11px] leading-[14px]";

  function Header() {
    return(
      <div className={`${cardFontStyle} flex items-center bg-[#0873BB] text-white h-9 px-1`}>
        {cardData.h1}
      </div>
    );
  }
  function Material() {
    return(
      <div className="px-1 pt-[1px]">
        <div className={`${cardFontStyle} inline-block font-bold float-left `}>Material:&nbsp;</div>
        <div className={`${cardFontStyle}`}>{cardData.material}</div>
      </div>
    );
  }
  function Weight() {
    return(
      <div className="px-1">
        <div className={`${cardFontStyle} inline-block font-bold float-left`}>Weight:&nbsp;</div>
        <div className={`${cardFontStyle}`}>{cardData.weight}</div>
      </div>
    );
  }
  function PriceLabel() {
    return (<div className={`${cardFontStyle} px-1 font-bold`}>Price:</div>);
  }

  // Render object, if prop is given from database
  let isMaterial  = cardData.material.length !== 0;
  let isWeight    = cardData.weight.length   !== 0;
  let isPrice     = cardData.price.length    !== 0;

  function LeftSide() {
    return(
      <div className="w-1/2 border-r border-r-black">
        <div className="flex flex-col">
          <Header />
          <div className="flex flex-col">
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
      <div className="w-1/2 text-black">
        Wear aut bla bla bla
      </div>
    );
  }

  return(
    <div className={containerClassList}>
      <LeftSide />
      <RightSide />
    </div>
  )
}