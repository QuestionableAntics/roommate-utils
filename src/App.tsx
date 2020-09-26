import React, { useState } from 'react';
import './App.css';

const App = () => {
  let [timesMowed, setTimesMowed] = useState(2);
  let [amountPerMow, setAmountPerMow] = useState(15);
  let [amerenGasCost, setAmerenGasCost] = useState(0);
  let [mediacomCost, setMediacomCost] = useState(69.99);
  let [columbiaUtilities, setColumbiaUtilities] = useState(0);
  let [activeMonth, setActiveMonth] = useState(0)
  let [useDecimal, setUseDecimal] = useState<{[id: string] : boolean}>({});
  
  if (activeMonth) {
    amerenGasCost = monthCosts[activeMonth].amerenCost;
    mediacomCost = monthCosts[activeMonth].mediacomCost;
    columbiaUtilities = monthCosts[activeMonth].columbiaUtilities;
  }

  let totalUtilityCost = (amerenGasCost ?? 0) + (mediacomCost ?? 0) + (columbiaUtilities ?? 0);

  let amerenPercentage = amerenGasCost / totalUtilityCost;
  let amerenPercentageDisplay = amerenPercentage * 100;
  let mediacomPercentage = mediacomCost / totalUtilityCost;
  let mediacomPercentageDisplay = mediacomPercentage * 100;
  let columbiaPercentage = columbiaUtilities / totalUtilityCost;
  let columbiaPercentageDisplay = columbiaPercentage * 100;

  let costPerPerson = totalUtilityCost / 3;
  
  let mikeDiscount = timesMowed * amountPerMow;
  let mikeTotal = costPerPerson - mikeDiscount;

  let otherTotal = costPerPerson + (mikeDiscount / 2);

  let mikeAmeren = amerenPercentage * mikeTotal;
  let mikeMediacom = mediacomPercentage * mikeTotal;
  let mikeColumbia = columbiaPercentage * mikeTotal;

  let otherAmeren = amerenPercentage * otherTotal;
  let otherMediacom = mediacomPercentage * otherTotal;
  let otherColumbia = columbiaPercentage * otherTotal;

  const setFloatProp = (prop: string, fn: Function, key: string): void => {
    if (prop.indexOf(".") !== -1) {
      setUseDecimal({
        ...useDecimal,
        [key]: true
      })
    }
    else {
      setUseDecimal({
        ...useDecimal,
        [key]: false
      })
    }
    const parsed = parseFloat(prop);
    if (!!parsed || parsed === 0) {
      fn(parsed);
    }
    else {
      fn(0);
    }
  }

  const setIntProp = (prop: string, fn: Function): void => {
    const parsed = parseInt(prop);
    if (!!parsed || parsed === 0) {
      fn(parsed);
    }
    else {
      fn(0);
    }
  }

  const displayFloat = (prop: number, key: string): string => {
    let strProp = prop.toString();

    if (strProp.indexOf(".") !== -1) {
      return strProp
    }

    if (useDecimal[key]) {
      return strProp + ".";
    }

    return strProp;
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="column column-2 align-right">
            <div>Total Utility - ${totalUtilityCost.toFixed(2)}</div>
            <div>Per person - ${costPerPerson.toFixed(2)}</div>
            <hr/>
            <h3>Summer</h3>
            <div>Mike Total - ${mikeTotal.toFixed(2)}</div>
            <div>Kean and TJ Total - ${otherTotal.toFixed(2)}</div>
            <br/>
            <div>Mike Ameren - ${mikeAmeren.toFixed(2)}</div>
            <div>Mike Mediacom - ${mikeMediacom.toFixed(2)}</div>
            <div>Mike Columbia Utilities - ${mikeColumbia.toFixed(2)}</div>
            <br/>
            <div>Other Ameren - ${otherAmeren.toFixed(2)}</div>
            <div>Other Mediacom - ${otherMediacom.toFixed(2)}</div>
            <div>Other Columbia Utilities - ${otherColumbia.toFixed(2)}</div>
          </div>
          <div className="column column-1">
            <div>Times mowed</div>
            <input value={timesMowed} onChange={e => setIntProp(e.target.value, setTimesMowed)}></input>
            <br/>
            <div>Amount Per Mow</div>
            <input value={amountPerMow} onChange={e => setIntProp(e.target.value, setAmountPerMow)}></input>
            <br/>
            <div>Ameren Gas</div>
            <input value={displayFloat(amerenGasCost, "ameren")} onChange={e => setFloatProp(e.target.value, setAmerenGasCost, "ameren")}></input>
            <br/>
            <div>Mediacom</div>
            <input value={displayFloat(mediacomCost, "mediacom")} onChange={e => setFloatProp(e.target.value, setMediacomCost, "mediacom")}></input>
            <br/>
            <div>Columbia Utilities</div>
            <input value={displayFloat(columbiaUtilities, "como")} onChange={e => setFloatProp(e.target.value, setColumbiaUtilities, "como")}></input>      
            <br/>
            <div>Select Month</div>  
            <select onChange={e => setActiveMonth(parseInt(e.target.value))}>
              { monthCosts.map( month => <option value={month.id} key={month.id}>{month.date}</option>)}
            </select>
          </div>
          <div className="column column-2 align-left">
            <div>{amerenPercentageDisplay.toFixed(2)}% - Ameren %</div>
            <div>{mediacomPercentageDisplay.toFixed(2)}% - Mediacom %</div>
            <div>{columbiaPercentageDisplay.toFixed(2)}% - Columbia Utilities %</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

const monthCosts: Array<{id: number, date: string, amerenCost: number, mediacomCost: number, columbiaUtilities: number}> = [
  {
    id: 0,
    date: "Manual",
    amerenCost: 0,
    mediacomCost: 0,
    columbiaUtilities: 0
  },
  {
    id: 1,
    date: "April, 2020",
    amerenCost: 44.63,
    mediacomCost: 69.99,
    columbiaUtilities: 157.27
  },
  {
    id: 2,
    date: "May, 2020",
    amerenCost: 29.81,
    mediacomCost: 69.99,
    columbiaUtilities: 198.94
  },
  {
    id: 3,
    date: "June, 2020",
    amerenCost: 26.73,
    mediacomCost: 69.99,
    columbiaUtilities: 293.70
  },
  {
    id: 4,
    date: "July, 2020",
    amerenCost: 25.64,
    mediacomCost: 69.99,
    columbiaUtilities: 294.49
  },
  {
    id: 5,
    date: "August, 2020",
    amerenCost: 26.00,
    mediacomCost: 69.99,
    columbiaUtilities: 299.09
  }
]