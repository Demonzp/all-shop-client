import { Fragment, useEffect, useState } from 'react';
import { EAlerts } from '../../types/alerts';
import CompAlert from '../comp-alert';

type Props = {
  infoMessage?:string,
  successMessage?:string,
  errorMessage?:string,
}

const AlertManager:React.FC<Props> = ({infoMessage, successMessage, errorMessage})=>{

  const [type, setType] = useState<EAlerts>(EAlerts.INFO);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    if(infoMessage){
      if(infoMessage.length>0){
        setType(EAlerts.INFO);
        setMsg(infoMessage);
      }else{
        setMsg('');
      }
    }else{
      setMsg('');
    }
  }, [infoMessage]);

  useEffect(()=>{
    if(successMessage){
      if(successMessage.length>0){
        setType(EAlerts.INFO);
        setMsg(successMessage);
      }else{
        setMsg('');
      }
    }else{
      setMsg('');
    }
  }, [successMessage]);

  useEffect(()=>{
    if(errorMessage){
      if(errorMessage.length>0){
        setType(EAlerts.INFO);
        setMsg(errorMessage);
      }else{
        setMsg('');
      }
    }else{
      setMsg('');
    }
  }, [errorMessage]);

  return(
    <Fragment>
      {
        msg.length>0?
          <CompAlert
            text={msg}
            type={type} 
          />
          :
          null
      }
    </Fragment>
  );
};

export default AlertManager;