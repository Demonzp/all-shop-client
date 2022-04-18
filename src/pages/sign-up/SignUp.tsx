import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertManager from '../../components/alert-manager';
import CustomColInput from '../../components/custom-col-input';
import CustomPhoneInput from '../../components/custom-phone-input';
import LangText from '../../components/lang-text';
import useSimpleForm from '../../hooks/useSimpleForm';
import { getLangText, getOptionsFromEnum } from '../../services/global';
import { userReg } from '../../store/actions/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TObjKeyAnyString } from '../../types/global';
import { ERoutes } from '../../types/routes';
import { ESex } from '../../types/sex';
import { uaMobPhoneRuls } from '../../validation/global';
import { registration as validation } from '../../validation/registration';

const state = {
  email: '',
  firstName: '',
  secondName: '',
  sex: ESex.NONE,
  birthday: '',
  password: '',
  repeatPassword: ''
}

//const errors = {};

const SignUp = () => {
  const { langObj } = useAppSelector(state => state.lang);
  const { errorsValid, errorMessage } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //console.log('render');
  const { data, onChange, handleSubmit, errors, setErrors } = useSimpleForm({ state, validation });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhone, setErrorPhone] = useState<TObjKeyAnyString>({});

  const changePhoneHandle = (val: string) => {
    setPhoneNumber(prev => {
      if (val.length > 9) {
        return prev;
      }
      return val;
    });
    setErrorPhone({});
  }

  const onSubmit = () => {
    const errPhone = uaMobPhoneRuls({ phoneNumber });
    setErrorPhone(errPhone);

    const validateRes = handleSubmit();
    // if(errPhone.phone || validateRes.errors){
    //   console.log('что то пошло не так');
    //   return;
    // }
    dispatch(userReg({
      ...validateRes.values,
      phoneNumber: '80' + phoneNumber
    }))
      .unwrap()
      .then(() => navigate(`../${ERoutes.SIGN_IN}`));
    //console.log('validateRes = ', validateRes);
  };

  useEffect(() => {
    //console.log();
    if (errorsValid.phoneNumber) {
      setErrorPhone({ ['phoneNumber']: errorsValid.phoneNumber });
    }
    setErrors(errorsValid);
  }, [errorsValid]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ minWidth: 360 }}>
        <div className="card-body">
          <h5 className="card-title"><LangText k="sign-up-titile" /></h5>
          <AlertManager errorMessage={errorMessage}/> 
          <CustomColInput
            type="text"
            name="email"
            onChange={onChange}
            data={data}
            errors={errors}
            label={`${getLangText(langObj, "sign-up-email")} *`}
          />
          {/* <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="sign-up-email" /> *</label>
            <input
              type="email"
              className="form-control"
              value={data?.email}
              onChange={(e) => onChange({ name: 'email', value: e.target.value })}
            />
          </div> */}
          <CustomPhoneInput
            value={phoneNumber}
            errors={errorPhone}
            onChange={changePhoneHandle}
          />
          {/* <div className="col-md-10 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="sign-up-phone" /> *</label>
            <div className="input-group mb-8">
              <span className="input-group-text">80</span>
              <input
                type="text"
                value={phone}
                className="form-control"
                aria-describedby="basic-addon3"
                placeholder="99 955 55 55"
                onChange={changePhoneHandle}
              />
            </div>
          </div> */}
          <CustomColInput
            type="text"
            name="firstName"
            onChange={onChange}
            data={data}
            errors={errors}
            label={`${getLangText(langObj, "firs-name")} *`}
          />
          {/* <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="firs-name" /> *</label>
            <input
              type="text"
              className="form-control"
              value={data?.firstName}
              onChange={(e) => onChange({ name: 'firstName', value: e.target.value })}
            />
          </div> */}
          <CustomColInput
            type="text"
            name="secondName"
            onChange={onChange}
            data={data}
            label={getLangText(langObj, "second-name")}
          />
          {/* <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="second-name" /></label>
            <input
              type="text"
              className="form-control"
              value={data?.secondName}
              onChange={(e) => onChange({ name: 'secondName', value: e.target.value })}
            />
          </div> */}
          <div className="row mb-3 p-t-20">
            <label className="col-sm-2 col-form-label"><LangText k="sex" /></label>
            <div className="col-sm-5">
              <select
                value={data.sex}
                className="form-select form-select-sm"
                aria-label="form-select-sm example"
                onChange={(e) => onChange({ name: 'sex', value: e.target.value })}
              >
                {
                  getOptionsFromEnum(ESex).map(s => {
                    return <option key={s.value} value={s.value}>{getLangText(langObj, s.label)}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="birthday" /></label>
            <input
              type="date"
              value={data.birthday}
              className="form-control"
              onChange={(e) => onChange({ name: 'birthday', value: e.target.value })}
            />
          </div>
          <CustomColInput
            type="password"
            name="password"
            onChange={onChange}
            data={data}
            errors={errors}
            label={getLangText(langObj, "password")}
          />
          <CustomColInput
            type="password"
            name="repeatPassword"
            onChange={onChange}
            data={data}
            errors={errors}
            label={getLangText(langObj, "repeat-password")}
          />
          {/* <div className="col-md-6 p-t-20">
            <label className="form-label"><LangText k="password" /> *</label>
            <input type="password" className="form-control" />
          </div>
          <div className="col-md-6 p-t-20">
            <label className="form-label"><LangText k="repeat-password" /> *</label>
            <input type="password" className="form-control" />
          </div> */}
          <div className="p-t-20"><LangText k="sign-up-text" /></div>
          <div className="row p-t-20">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                <LangText k="sign-up" />
              </button>
            </div>
            <div className="p-t-20">
              <NavLink to={`../${ERoutes.SIGN_IN}`} ><LangText k="sign-up-question" /></NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;