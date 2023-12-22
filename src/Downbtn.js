import React from 'react'

const Downbtn = ({ltext,setLtext}) => {

  const handleSelectChange = (event) => {
    setLtext(event.target.value);
  };
  return (
    <>
    <div id="level" >
      <label><b>Show Values</b></label>
      <select className='level' name="texts" value={ltext} onChange={handleSelectChange}>
        <option value="Yes">Yes</option>
        <option value="No" >No</option>
      </select>
   </div>
    <div id="dtndiv">
        <p>
        <a href=" " id="link" download="image.png">
        <button className='dtndiv'>Download PNG</button>
        </a>
        </p>
        <p>
            <button className='dtndiv' id="download">Download PDF</button>
        </p>
   </div>
   </>
  )
}

export default Downbtn
