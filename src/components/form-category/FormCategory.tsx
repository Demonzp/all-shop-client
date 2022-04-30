import React, { useEffect, useState } from 'react';
import useSimpleForm, { TReturn } from '../../hooks/useSimpleForm';
import { getLangText, getOptionsFromEnum } from '../../services/global';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLang } from '../../store/slices/lang';
import { ELangs } from '../../types/langs';
import AlertManager from '../alert-manager';
import CustomColInput from '../custom-col-input';
import LangText from '../lang-text';
import TabPanel from '../tab-panel';
import { createCategoryRuls as validation } from '../../validation/createCategory';
import { createCategory } from '../../store/actions/categorys';
import { TObjKeyAnyString } from '../../types/global';

const getTranslit = (value: string): string => {
  const translit_ua = [
    {
      'ua': 'а',
      'en': 'a'
    },
    {
      'ua': 'б',
      'en': 'b'
    },
    {
      'ua': 'в',
      'en': 'v'
    },
    {
      'ua': 'г',
      'en': 'g'
    },
    {
      'ua': 'ґ',
      'en': 'g'
    },
    {
      'ua': 'д',
      'en': 'd'
    },
    {
      'ua': 'е',
      'en': 'e'
    },
    {
      'ua': 'є',
      'en': 'ye'
    },
    {
      'ua': 'ж',
      'en': 'zh'
    },
    {
      'ua': 'з',
      'en': 'z'
    },
    {
      'ua': 'и',
      'en': 'y'
    },
    {
      'ua': 'і',
      'en': 'i'
    },
    {
      'ua': 'ї',
      'en': 'yi'
    },
    {
      'ua': 'й',
      'en': 'y'
    },
    {
      'ua': 'к',
      'en': 'k'
    },
    {
      'ua': 'л',
      'en': 'l'
    },
    {
      'ua': 'м',
      'en': 'm'
    },
    {
      'ua': 'н',
      'en': 'n'
    },
    {
      'ua': 'о',
      'en': 'o'
    },
    {
      'ua': 'п',
      'en': 'p'
    },
    {
      'ua': 'р',
      'en': 'r'
    },
    {
      'ua': 'с',
      'en': 's'
    },
    {
      'ua': 'т',
      'en': 't'
    },
    {
      'ua': 'у',
      'en': 'u'
    },
    {
      'ua': 'ф',
      'en': 'f'
    },
    {
      'ua': 'х',
      'en': 'kh'
    },
    {
      'ua': 'ц',
      'en': 'ts'
    },
    {
      'ua': 'ч',
      'en': 'ch'
    },
    {
      'ua': 'ш',
      'en': 'sh'
    },
    {
      'ua': 'щ',
      'en': 'shch'
    },
    {
      'ua': 'ь',
      'en': ''
    },
    {
      'ua': 'ю',
      'en': 'yu'
    },
    {
      'ua': 'я',
      'en': 'ya'
    },
    {
      'ua': 'А',
      'en': 'A'
    },
    {
      'ua': 'Б',
      'en': 'B'
    },
    {
      'ua': 'В',
      'en': 'V'
    },
    {
      'ua': 'Г',
      'en': 'G'
    },
    {
      'ua': 'Ґ',
      'en': 'G'
    },
    {
      'ua': 'Д',
      'en': 'D'
    },
    {
      'ua': 'Е',
      'en': 'E'
    },
    {
      'ua': 'Є',
      'en': 'Ye'
    },
    {
      'ua': 'Ж',
      'en': 'Zh'
    },
    {
      'ua': 'З',
      'en': 'Z'
    },
    {
      'ua': 'И',
      'en': 'Y'
    },
    {
      'ua': 'І',
      'en': 'I'
    },
    {
      'ua': 'Ї',
      'en': 'Yi'
    },
    {
      'ua': 'Й',
      'en': 'Y'
    },
    {
      'ua': 'К',
      'en': 'K'
    },
    {
      'ua': 'Л',
      'en': 'L'
    },
    {
      'ua': 'М',
      'en': 'M'
    },
    {
      'ua': 'Н',
      'en': 'N'
    },
    {
      'ua': 'О',
      'en': 'O'
    },
    {
      'ua': 'П',
      'en': 'P'
    },
    {
      'ua': 'Р',
      'en': 'R'
    },
    {
      'ua': 'С',
      'en': 'S'
    },
    {
      'ua': 'Т',
      'en': 'T'
    },
    {
      'ua': 'У',
      'en': 'U'
    },
    {
      'ua': 'Ф',
      'en': 'F'
    },
    {
      'ua': 'Х',
      'en': 'Kh'
    },
    {
      'ua': 'Ц',
      'en': 'Ts'
    },
    {
      'ua': 'Ч',
      'en': 'Ch'
    },
    {
      'ua': 'Ш',
      'en': 'Sh'
    },
    {
      'ua': 'Щ',
      'en': 'Shch'
    },
    {
      'ua': 'ь',
      'en': ''
    },
    {
      'ua': 'Ю',
      'en': 'Yu'
    },
    {
      'ua': 'Я',
      'en': 'Ya'
    },
    {
      'ua': ' ',
      'en': '_'
    },
    {
      'ua': "'",
      'en': ''
    },
  ];
  //console.log('value = ', value);
  let translit = '';
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    //console.log('char =', char);
    const whisTransChar = translit_ua.find(c => c.ua === char);
    //console.log('whisTransChar = ', whisTransChar);
    let transChar = '';
    if (whisTransChar) {
      transChar = whisTransChar.en;
    }
    translit += transChar;
  }
  //console.log('translit = ', translit);
  return translit;
}

export type TFormCategory = {
  nameUA: string,
  translit: string,
  defaultTranslit: string,
  nameRU: string
}

type Props = {
  state: TFormCategory,
  title: string,
  btnTitle: string,
  onSubmit: (data: TReturn<TFormCategory>) => void
}

const FormCategory: React.FC<Props> = ({ state, onSubmit, title, btnTitle }) => {
  const [activeTab, setActiveTab] = useState('');
  const dispatch = useAppDispatch();
  const { langObj } = useAppSelector(state => state.lang);
  const { errorMessage } = useAppSelector(state => state.categorys);

  const [tempState, setTempState] = useState(state);

  const { data, onChange, errors, handleSubmit } = useSimpleForm({ state: tempState, validation });

  useEffect(() => {
    setTempState(state);
  }, [state]);

  useEffect(() => {
    if (data.nameUA.length > 0) {
      setTempState((prev) => {
        return {
          ...prev,
          nameUA: data.nameUA,
          defaultTranslit: getTranslit(data.nameUA)
        }
      });
    }
  }, [data.nameUA]);

  const onPreSubmit = () => {
    const valsRes = handleSubmit();
    onSubmit(valsRes);
    //console.log('valsRes = ', valsRes);
  };

  const onActive = (t: string) => {
    setActiveTab(t);
    dispatch(setLang(t as ELangs));
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="row">
        <TabPanel tabs={getOptionsFromEnum(ELangs).map(t => t.value)} onActive={onActive} />
        {
          activeTab === ELangs.RU ?
            <div className="card" style={{ minWidth: 360 }}>
              <div className="card-body">
                <h5 className="card-title"><LangText k={title} /></h5>
                <AlertManager errorMessage={errorMessage}/>
                <CustomColInput
                  type="text"
                  name="nameRU"
                  onChange={onChange}
                  data={data}
                  errors={errors}
                  label={`${getLangText(langObj, "field-category-name")} *`}
                />
                <CustomColInput
                  type="text"
                  name="defaultTranslit"
                  disabled
                  readOnly
                  onChange={() => { }}
                  data={data}
                  errors={{}}
                  label={`${getLangText(langObj, "field-category-def-translit")}`}
                />
                <div className="p-t-20">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onPreSubmit}
                  >
                    <LangText k={btnTitle} />
                  </button>
                </div>
              </div>
            </div>
            :
            null
        }

        {
          activeTab === ELangs.UA ?
            <div className="card" style={{ minWidth: 360 }}>
              <div className="card-body">
                <h5 className="card-title"><LangText k={title} /></h5>
                <AlertManager errorMessage={errorMessage}/>
                <CustomColInput
                  type="text"
                  name="nameUA"
                  onChange={onChange}
                  data={data}
                  errors={errors}
                  label={`${getLangText(langObj, "field-category-name")} *`}
                />
                <CustomColInput
                  type="text"
                  name="defaultTranslit"
                  disabled
                  readOnly
                  onChange={() => { }}
                  data={data}
                  label={`${getLangText(langObj, "field-category-def-translit")}`}
                />
                <CustomColInput
                  type="text"
                  name="translit"
                  onChange={onChange}
                  data={data}
                  errors={errors}
                  label={`${getLangText(langObj, "field-category-translit")}`}
                />
                <div className="p-t-20">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onPreSubmit}
                  >
                    <LangText k={btnTitle} />
                  </button>
                </div>
              </div>
            </div>
            :
            null
        }

      </div>
    </div>
  );
};

export default FormCategory;