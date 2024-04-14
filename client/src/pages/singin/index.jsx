// SignForm.jsx

import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import style from './style.module.scss';
import { isUserLoggedIn } from '@/utils/utils';
import { getCartItems } from '../api/serviceAPI';
import { useAppContext } from '@/context/AppContext';
import UserPage from '@/components/userDetail/user';

const SignForm = () => {
  const { state, dispatch } = useAppContext();
  const { srpReducer } = state;
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [toggleForm, setToggleForm] = useState('SignUp'); 

  const handleInputChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setFieldValue(name, value);
  };
  const [userCreated, setUserCreated] = useState(false)
  const handleValues = async (values) => {
    try {
      const res = await fetch('http://localhost:8000/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      setUserCreated(prevState => !prevState)
      console.log(response);

      return response;
    } catch (e) {
      console.log('error', e);
    }
  };
  const handleLoginValues = async (values) => {
    try {
      const loginApi = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const response = await loginApi.json();
      localStorage.setItem('AuthToken', response.token)
      localStorage.setItem('UserID', response.user._id)
      console.log(response,'loginDetails');
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggle = (value) => {
    setToggleForm(value);
  };
  console.log(isUserLoggedIn,'isUserLogg')
  return (
    !isUserLoggedIn() ? <div className={style.mainContainer}>
      <div className={style.toggleContainer}>
        <button
          className={`${style.ToggleButton} ${toggleForm === 'SignUp' ? style.active : ''}`}
          onClick={() => handleToggle('SignUp')}
        >
          Sign Up
        </button>
        <button
          className={`${style.ToggleButton} ${toggleForm === 'login' ? style.active : ''}`}
          onClick={() => handleToggle('login')}
        >
          Login
        </button>
      </div>
      {toggleForm === 'SignUp' ? (
        <div>
          <Formik
            onSubmit={values => {
              handleValues(values);
            }}
            initialValues={{ name: '', email: '', password: '' }}
          >
            {({ values, error, handleChange, handleSubmit, setFieldValue }) => (
              <form className={style.formstyle} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name..."
                  value={values.name}
                  onChange={e => {
                    handleInputChange(e, setFieldValue);
                  }}
                  className={style.nameInput}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email..."
                  value={values.email}
                  onChange={e => {
                    handleInputChange(e, setFieldValue);
                  }}
                  className={style.nameInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password..."
                  value={values.password}
                  onChange={e => {
                    handleInputChange(e, setFieldValue);
                  }}
                  className={style.nameInput}
                />
                <button type="submit" className={style.submitButton}>
                  Submit
                </button>
                {/* {userCreated && <h1 className={style.regiterMsg}>User is being registered!</h1>} */}
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <Formik
            onSubmit={values => handleLoginValues(values)}
            initialValues={{ email: '', password: '' }}
          >
            {({ values, error, handleSubmit, handleChange }) => (
              <form className={style.formstyle} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder='Enter Your Email...'
                  value={values.email}
                  onChange={handleChange}
                  className={style.nameInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder='Enter Your Password...'
                  value={values.password}
                  onChange={handleChange}
                  className={style.nameInput}
                />
                <button type="submit" className={style.submitButton}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div> :
    <UserPage />
  );
};

export default SignForm;
