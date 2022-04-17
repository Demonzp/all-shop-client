import React, { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

type Props = {
  k: string
}

const LangText: React.FC<Props> = ({k})=>{
  const {langObj, isLoading} = useAppSelector(state=>state.lang);

  const [text, setText] = useState('---//---');

  useEffect(()=>{
    //console.log('k = ', k);
    if(!isLoading && langObj.hasOwnProperty(k)){
      setText(langObj[k]);
    }
  }, [isLoading, langObj, k]);

  return(
    <Fragment>
      {
        isLoading?
        <div>Loading...</div>
        :
        <Fragment>{text}</Fragment>
      }
    </Fragment>
  );
};

export default LangText;