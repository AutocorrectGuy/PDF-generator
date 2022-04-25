import React from 'react';

import { mapOutCardProperties } from "../pdf/cards/utils";
import DB from "../../DB_test.json"
import DndCard from "./DndCard";


export default function DndViewer() {

  // map out long list of properties which are used here and in pdf card generation
  let db = mapOutCardProperties(DB);
    function CardsList() {
      return(db.map((card, i) => <DndCard key={`card-${i}`} cardData={card}/>));
    }
    return (
      <div className="flex flex-wrap content-start">
        <CardsList />
      </div>
    );


}
