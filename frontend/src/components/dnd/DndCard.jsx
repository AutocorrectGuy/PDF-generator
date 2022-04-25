export default function DndCard({cardData}) {

  function Header() {
    return(
      <div data-card-h1>
        {cardData.h1}
      </div>
    );
  }
  function Material() {
    return(
      <div className="px-1 pt-[1px]">
        <div className={`inline-block font-bold float-left `}>Material:&nbsp;</div>
        <div>{cardData.material}</div>
      </div>
    );
  }
  function Weight() {
    return(
      <div className="px-1">
        <div className={`inline-block font-bold float-left`}>Weight:&nbsp;</div>
        <div>{cardData.weight}</div>
      </div>
    );
  }
  function PriceLabel() {
    return (<div className={`px-1 font-bold`}>Price:</div>);
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
    <div data-card>
      <LeftSide />
      <RightSide />
    </div>
  )
}