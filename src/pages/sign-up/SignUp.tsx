import { NavLink } from 'react-router-dom';
import { ERoutes } from '../../types/routes';

const SignUp = ()=>{
  return (
    <div className="d-flex justify-content-center">
    <div className="card" style={{minWidth:360}}>
      <div className="card-body">
        <h5 className="card-title">Форма регистрации</h5>
        <div className="col-md-6 p-t-20">
          <label className="form-label" style={{minWidth:300}}>Ел. почта или телефон *</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col-md-10 p-t-20">
          <label className="form-label" style={{minWidth:300}}>Номер телефона *</label>
          <div className="input-group mb-8">
            <span className="input-group-text">80</span>
            <input type="number" className="form-control" aria-describedby="basic-addon3" />
          </div>
        </div>
        <div className="col-md-6 p-t-20">
          <label className="form-label" style={{minWidth:300}}>Имя *</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 p-t-20">
          <label className="form-label" style={{minWidth:300}}>Фамилия</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 p-t-20">
          <label className="form-label" style={{minWidth:300}}>День Рождения</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-6 p-t-20">
          <label className="form-label">Пароль</label>
          <input type="password" className="form-control" />
        </div>
        <div className="col-md-6 p-t-20">
          <label className="form-label">Повторите Пароль</label>
          <input type="password" className="form-control" />
        </div>
        <p className="p-t-20">Поля помеченые "*" обязательны для заполнения</p>
        <div className="row p-t-20">
          <div>
            <button type="button" className="btn btn-primary">Зарегистрироваться</button>
          </div>
          <div className="p-t-20">
            <NavLink to={`../${ERoutes.SIGN_IN}`} >Уже зарегистрированы?</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUp;