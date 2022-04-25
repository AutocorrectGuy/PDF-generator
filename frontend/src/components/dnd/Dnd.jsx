import React from 'react';
import Split from "react-split";
import DndCard from "./DndCard";


const CB = {
  g1: "w-1/2 bg-green-500",
  g2: "w-1/2 bg-blue-500",
  h1Group: "text-white font-sans text-center bg-neutral-900"
}
export default function Dnd({data}) {

  // map out long list of properties which are used here and in pdf card generation
  let dndLists = [
    {group: 0, cardsList: data.slice(0,3)},
    {group: 1, cardsList: data.slice(3,7)}
  ]
  return (
    <div className="flex">
      <Split
        sizes={[50, 50]}
        minSize={310}
        expandToMin={false}
        gutterSize={20}
        gutterAlign="center"
        snapOffset={10}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="flex px-3 py-5 bg-[#323639]"
      >
      {dndLists.map(({group, cardsList}, i) => 
        <div key={`dnd-group-${i}`} className={group === 0 ? CB.g1 : CB.g2}>
          <div className={CB.h1Group}>{group ? "Pa labi" : "Pa kreisi"}</div>
            <div className='flex flex-wrap gap-1 place-content-center py-3'>
              {cardsList.map((cardData, j) => 
                <DndCard key={`card-${j}`} cardData={cardData}/>)
              }
            </div>
        </div>
      )}
      </Split>
    </div>
  );
}
