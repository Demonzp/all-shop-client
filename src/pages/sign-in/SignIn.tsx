import { NavLink } from 'react-router-dom';
import CompAlert from '../../components/comp-alert';
import LangText from '../../components/lang-text';
import { useAppSelector } from '../../store/hooks';
import { EAlerts } from '../../types/alerts';
import { ERoutes } from '../../types/routes';
import './sign-in.css';

const SignIn = () => {
  const { message } = useAppSelector(state => state.user);

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ minWidth: 340 }}>
        <div className="card-body">
          <h5 className="card-title"><LangText k="sign-in-title" /></h5>
          {
            message.length>0?
              <CompAlert 
                type={EAlerts.SUCCESS}
                text={message}
              />
              :
              null
          }
          <div className="col-md-6 p-t-20">
            <label className="form-label" style={{ minWidth: 300 }}><LangText k="sign-in-login-title" /></label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6 p-t-20">
            <label className="form-label"><LangText k="password" /></label>
            <input type="password" className="form-control" />
          </div>
          <div className="row p-t-20">
            <div>
              <button type="button" className="btn btn-primary"><LangText k="sign-in" /></button>
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