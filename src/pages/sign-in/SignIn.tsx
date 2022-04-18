import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AlertManager from '../../components/alert-manager';
import CustomColInput from '../../components/custom-col-input';
import LangText from '../../components/lang-text';
import useSimpleForm from '../../hooks/useSimpleForm';
import { getLangText } from '../../services/global';
import { userSignin } from '../../store/actions/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ERoutes } from '../../types/routes';
import { signin as validation } from '../../validation/signin';
import './sign-in.css';

const state = {
  login:'',
  password:''
}

const SignIn = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { langObj } = useAppSelector(state => state.lang);
  const { message, errorMessage } = useAppSelector(state => state.user);

  const {data, onChange, errors, handleSubmit} = useSimpleForm({state, validation});

  const onSubmit = ()=>{
    const resValues = handleSubmit();
    console.log('resValues = ', resValues);
    dispatch(userSignin(data))
      .unwrap()
      .then(()=>{
        if(location.state){
          navigate(location.state as string, { replace: true });
        }
        navigate(ERoutes.HOME);
        console.log('location = ', location);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ minWidth: 340 }}>
        <div className="card-body">
          <h5 className="card-title"><LangText k="sign-in-title" /></h5>
          <AlertManager
            successMessage={message}
            errorMessage={errorMessage}
          />
          <CustomColInput
            type="text"
            name="login"
            onChange={onChange}
            data={data}
            errors={errors}
            label={`${getLangText(langObj, "sign-in-login")} *`}
          />
          <CustomColInput
            type="password"
            name="password"
            onChange={onChange}
            data={data}
            errors={errors}
            label={getLangText(langObj, "password")+' *'}
          />
          {/* <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="sign-in-login-title" /></label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6 p-t-20">
            <label className="form-label"><LangText k="password" /></label>
            <input type="password" className="form-control" />
          </div> */}
          <div className="row p-t-20">
            <div>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onSubmit}
              >
                <LangText k="sign-in" />
              </button>
            </div>
            <div className="p-t-20">
              <NavLink to={`../${ERoutes.SIGN_UP}`}><LangText k="sign-in-question" /></NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;