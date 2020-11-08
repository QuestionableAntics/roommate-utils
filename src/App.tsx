import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
// import BarChart from 'recharts';
import './App.css';

const App = () => {
  let [timesMowed, setTimesMowed] = useState(2);
  let [amountPerMow, setAmountPerMow] = useState(15);
  let [amerenGasCost, setAmerenGasCost] = useState(0);
  let [mediacomCost, setMediacomCost] = useState(69.99);
  let [columbiaUtilities, setColumbiaUtilities] = useState(0);
  let [activeMonth, setActiveMonth] = useState(0)
  let [useDecimal, setUseDecimal] = useState<{[id: string] : boolean}>({});
  
  useEffect(() => {
    setAmerenGasCost(monthCosts[activeMonth].amerenCost);
    setMediacomCost(monthCosts[activeMonth].mediacomCost)
    setColumbiaUtilities(monthCosts[activeMonth].columbiaUtilities);
    setTimesMowed(monthCosts[activeMonth].timesMowed);
  }, [activeMonth])

 
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
            <hr/>
            <Chart />
          </div>
        </div>
      </header>
    </div>
  );
}

const Chart = () => {
  const [shownChart, setShownChart] = useState(ChartType.Bar);
  const data = monthCosts.map(m => {
    return {
      ...m,
      totalCost: m.amerenCost + m.columbiaUtilities + m.mediacomCost
    }
  })
  const chartHeight = 500;
  const chartWidth = 1000;

  const renderChart = () => {
    switch (shownChart) {
      case ChartType.Bar:
        return (
          <BarChart height={chartHeight} width={chartWidth} data={data.filter(mc => mc.id > 0)}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Ameren Cost" dataKey="amerenCost" fill="#8884d8" />
            <Bar name="Mediacom Cost" dataKey="mediacomCost" fill="#82ca9d" />
            <Bar name="Columbia Utilities" dataKey="columbiaUtilities" fill="#eb9534" />
            <Bar name="Total" dataKey="totalCost" fill="#3281a8" />
          </BarChart>
        );
      case ChartType.Line:
      default:
        return (
          <LineChart height={chartHeight} width={chartWidth} data={data.filter(mc => mc.id > 0)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="Ameren Cost" dataKey="amerenCost" fill="#8884d8" />
            <Line type="monotone" name="Mediacom Cost" dataKey="mediacomCost" fill="#82ca9d" />
            <Line type="monotone" name="Columbia Utilities" dataKey="columbiaUtilities" fill="#eb9534" />
            <Line type="monotone" name="Total" dataKey="totalCost" fill="#3281a8" />
          </LineChart>
        );
    }
  }

  return (
    <>
      <button onClick={() => setShownChart(shownChart === ChartType.Bar ? ChartType.Line : ChartType.Bar)}>Toggle Chart</button>
      {renderChart()}
    </>
  )
}

export default App;

const ChartType = {
  Bar: 1,
  Line: 2
}

const monthCosts: Array<{id: number, date: string, amerenCost: number, mediacomCost: number, columbiaUtilities: number, timesMowed: number}> = [
  {
    id: 0,
    date: "Manual",
    amerenCost: 0,
    mediacomCost: 0,
    columbiaUtilities: 0,
    timesMowed: 2
  },
  {
    id: 1,
    date: "April, 2020",
    amerenCost: 44.63,
    mediacomCost: 69.99,
    columbiaUtilities: 157.27,
    timesMowed: 2
  },
  {
    id: 2,
    date: "May, 2020",
    amerenCost: 29.81,
    mediacomCost: 69.99,
    columbiaUtilities: 198.94,
    timesMowed: 2
  },
  {
    id: 3,
    date: "June, 2020",
    amerenCost: 26.73,
    mediacomCost: 69.99,
    columbiaUtilities: 293.70,
    timesMowed: 2
  },
  {
    id: 4,
    date: "July, 2020",
    amerenCost: 25.64,
    mediacomCost: 69.99,
    columbiaUtilities: 294.49,
    timesMowed: 2
  },
  {
    id: 5,
    date: "August, 2020",
    amerenCost: 26.00,
    mediacomCost: 69.99,
    columbiaUtilities: 299.09,
    timesMowed: 2
  },
  {
    id: 6,
    date: "September, 2020",
    amerenCost: 27.45,
    mediacomCost: 89.99,
    columbiaUtilities: 195.45,
    timesMowed: 1
  },
  {
    id: 7,
    date: "October, 2020",
    amerenCost: 31.84,
    mediacomCost: 89.99,
    columbiaUtilities: undefined,
    timesMowed: 1
  }
]