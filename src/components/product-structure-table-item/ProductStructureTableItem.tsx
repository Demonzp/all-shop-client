import React from 'react';
import { getLangText } from '../../services/global';
import { useAppSelector } from '../../store/hooks';
import { EColors } from '../../types/colors';
import { ELangs } from '../../types/langs';
import { IStructureFieldProduct } from '../../types/structureProduct';
import LoadingBtn from '../loading-btn';

type Props = {
  field: IStructureFieldProduct,
  edit: (id: string)=>void,
  del: (id: string)=>void
};

const ProductStructureTableItem:React.FC<Props> = ({field, edit, del})=>{
  const {lang, langObj} = useAppSelector(state=>state.lang);
  const {isLoading} = useAppSelector(state=>state.productStructureTable);
  return(
    <tr>
      <td>
        {lang===ELangs.UA?field.nameUA:field.nameRU}
      </td>
      <td>{field.type}</td>
      <td>
        <LoadingBtn 
          isLoading={isLoading} 
          title={getLangText(langObj, 'edit')} 
          onClick={()=>edit(field.id)}
        />
        {
          field.isCanDel?
            <LoadingBtn 
              isLoading={isLoading} 
              title={getLangText(langObj, 'btn-del-category')}
              type={EColors.DANGER}
              onClick={()=>del(field.id)}
            />
            :
            null
        }
        
      </td>
    </tr>
    // <div>
    //   {field.nameUA}
    // </div>
  );
};

export default ProductStructureTableItem;