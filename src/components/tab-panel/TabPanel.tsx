import React, { useEffect, useState } from 'react';
import './tab-panel.css';

type Props = {
  tabs: string[];
  //force?: string;
  onActive?: (data:string)=>void;
};

const getClass = (id:string, activeId:string):string=>{return id===activeId?'btn tab-panel-btn tab-panel-btn-active':'btn tab-panel-btn'};

const TabPanel: React.FC<Props> = ({tabs, onActive})=>{
  const [activeTab, setActiveTab] = useState('');

  useEffect(()=>{
    setActiveTab(tabs[0]);
    if(onActive){
      onActive(tabs[0]);
    }
  }, []);

  const tabHandle = (t:string)=>{
    setActiveTab(t);
    if(onActive){
      onActive(t);
    }
  }

  return(
    <div className="container">
      <div className="col">
        {
          tabs.map(t=>{
            return(
              <button 
                onClick={()=>tabHandle(t)}
                key={t} 
                className={getClass(t, activeTab)}
              >
                {t}
              </button>
            );
          })
        }
      </div>
    </div>
  );
};

export default TabPanel;