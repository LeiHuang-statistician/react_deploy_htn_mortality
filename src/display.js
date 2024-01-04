import { useState} from 'react';

const Display = ({setYmax,oc,setOc,ltext,setLtext}) => {
    const [sinput, setSinpt]=useState()
    const [ocactive, setOcactive] = useState(1);

    const inputchange=(e)=>{
        e.preventDefault()
        var varx=e.target.value
        if (varx==="") varx="60"
        setSinpt(varx)
    }

    const inputsubmit=(e)=>{
        e.preventDefault()
        setYmax(sinput)
    }
    
    const outcomes = [
        { id: 1, label: 'All cause motality' },
        { id: 2, label: 'CVD' },
        { id: 3, label: 'Cancer' },
        { id: 4, label: 'Infection'},
        { id: 5, label: 'Chronic lung disease'},
        { id: 6, label: 'Dementia'},
        { id: 7, label: 'Accident, injury, suicide, or homicide'},
        { id: 8, label: 'End-stage renal disease'},
        { id: 9, label: 'Liver disease'},
        { id: 10, label: 'Other non-cardiac or non-stroke death'},
        { id: 11, label: 'Unclassifiable death'},

      ];

      const OcButtonClick = (buttonId) => {
        
        if (buttonId===1) {setOc("mortality_cause") }
        if (buttonId===2 ) { setOc("cvd_cpt")}
        if (buttonId===3 )  {setOc("cancer_cpt")}
        if (buttonId===4 )  {setOc("infection_cpt")}
        if (buttonId===5 )  {setOc("cld_cpt")}
        if (buttonId===6 )  {setOc("Dementia_cpt")}
        if (buttonId===7  )  {setOc("AISH_cpt")}
        if ( buttonId===8 )  {setOc("ERD_cpt")}
        if (buttonId===9  )  {setOc("LiveD_cpt") }
        if (buttonId===10  )  {setOc("noneCS_cpt")}
        if (buttonId===11 )  {setOc("unCD_cpt")} 
        setOcactive(buttonId);

      };

      const handleSelectChange = (event) => {
        setLtext(event.target.value);
      };

    return (
    <div className='cs'>
        <div id="divselect">
            {outcomes.map((button)=>{
              return (
              <button key={button.id}
                      className="divselect"
                      onClick={() => OcButtonClick(button.id)}
                      style={{backgroundColor:ocactive===button.id ? "white" : "#ddd"}}
                     
                      >{button.label}
              </button>
              )
            })}
            </div>

        <div id="level" >
              <label><b>Show Values</b></label>
              <select className='level' name="texts" value={ltext} onChange={handleSelectChange}>
                <option value="Yes">Yes</option>
                <option value="No" >No</option>
              </select>
          </div>

        <div className="range">
               <p >Please Input Scale:</p>
                <input className="rmax"
                onChange={inputchange}
                />
                <button className='changesb'type="submit" onClick={inputsubmit}>Submit</button>
        </div>
       
        
 
    </div>
  )
}

export default Display
