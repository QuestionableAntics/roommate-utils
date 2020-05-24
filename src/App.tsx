import React, { useState } from 'react';
import './App.css';

const App = () => {
  let [timesMowed, setTimesMowed] = useState(2);
  let [amountPerMow, setAmountPerMow] = useState(15);
  let [amerenGasCost, setAmerenGasCost] = useState(0);
  let [mediacomCost, setMediacomCost] = useState(69.99);
  let [columbiaUtilities, setColumbiaUtilities] = useState(0);
  let [useDecimal, setUseDecimal] = useState<{[id: string] : boolean}>({});
  
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

const monthCosts: [{date: string, amerenCost: number, mediacomCost: number, columbiaUtilities: number}] = [
  {
    date: "April, 2020",
    amerenCost: 44.63,
    mediacomCost: 69.99,
    columbiaUtilities: 157.27
  }
]