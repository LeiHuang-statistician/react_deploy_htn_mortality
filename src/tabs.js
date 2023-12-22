import { useState} from 'react';
const Tabs = ({setLeg,setPgr}) => {
  const [activeButton, setActiveButton] = useState(1);


  const buttons = [
    { id: 1, label: 'Hypertension' },
    { id: 2, label: 'Age' },
    { id: 3, label: 'Female and Race' },
    { id: 4, label: 'Male and Race'}
  ];

  const handleButtonClick = (buttonId) => {
    if (buttonId===1){
        setLeg(["With Hypertension","Without Hypertension"])
        setPgr("htn")
      }
    if (buttonId===2){
        setLeg(["With Hypertension and age <65 yrs","Without Hypertension and age <65 yrs","With Hypertension and age >=65 yrs","Without Hypertension and age >=65 yrs"])
        setPgr("age")
      }
      if (buttonId===3){
        setLeg(["White women with Hypertension","White women without Hypertension","Black women with Hypertension","Black women without Hypertension"])
        setPgr("FR")
      }

      if (buttonId===4){
        setLeg(["White men with Hypertension","White men without Hypertension","Black men with Hypertension","Black men without Hypertension"])
        setPgr("MR")
      }
      setActiveButton(buttonId);
  };

  return (
          <div className="tab">
            {buttons.map((button)=>{
              return (
              <button key={button.id}
                      onClick={() => handleButtonClick(button.id)}
                      className={activeButton===button.id ? "active" : "tablink"}
                      >{button.label}
              </button>
              )
            })}
          </div>
    );
}

export default Tabs
