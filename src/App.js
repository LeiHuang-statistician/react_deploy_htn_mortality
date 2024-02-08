
import './App.css';
import Svgx from './Svgx';
import Display from './display';
import { useState,useEffect } from 'react';
import csvFilePath from './plotcom.csv';
import csvToJSON from './csvreader'
import plotx from './plotx'
import Tabs from './tabs';
import Downbtn from './Downbtn';


function App() {
  const [title, setTitle]=useState()
  const [pgr, setPgr]=useState("htn")
  const [oc, setOc]=useState("mortality_cause")
  const [data, setData]=useState([])
  const [ymax, setYmax]=useState(60)
  const [leg, setLeg]=useState(["With Hypertension","Without Hypertension"])
  const [ltext,setLtext]=useState("Yes")

    
  useEffect( () => {  
    
    //const xdata=csvToJSON(csvFilePath)
    //console.log(xdata)
    const rd= function(){
        fetch(csvFilePath)
        .then( response => response.text() )
        .then( responseText => {
          var x=csvToJSON(responseText)
          //console.log(x)
          
          x.map(d=>d.time=+d.time)
          x.map(d=>d.dying=+d.dying)
          x=x.filter(d=>d.group!=='' && d.oc===oc && d.pgr===pgr)
          //console.log(oc, pgr)
         
          //console.log("x",x)
          var title;
          if (oc==="AISH_cpt") {title="Accident, injury, suicide, or homicide";}
           else {title=x[0].title}
          console.log('title',title)
  
            setData(x)
            plotx(x,title,ymax,leg,ltext)
          })
        }
      rd()
    
  },[ymax,pgr,oc,leg,ltext])


    
  
  return (
    <div className="App">
      <Display setYmax={setYmax} setOc={setOc} ltext={ltext} setLtext={setLtext}/>
      <Tabs  setPgr={setPgr} setLeg={setLeg}/>
      <Downbtn />
      <Svgx/>
      

    </div>
  );
}

export default App;
