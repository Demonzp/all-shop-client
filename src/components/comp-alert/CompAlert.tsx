import React from 'react';
import { EAlerts } from '../../types/alerts';

type Props = {
  type: EAlerts
  text: string
}

const CompAlert: React.FC<Props> = ({type, text})=>{
  return(
    <div className={`alert alert-${type}`} role="alert">
      {text}
    </div>
  );
};

export default CompAlert;