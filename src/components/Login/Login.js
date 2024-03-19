import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const collegeNameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim() !== '' };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim() !== '' };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const [collegeNameState, dispatchCollegeName] = useReducer(
    collegeNameReducer,
    {
      value: '',
      isValid: null,
    }
  );

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log('Effect RUNNING');
    const formValidity = emailState.isValid && passwordState.isValid && collegeNameState.isValid;
    setFormIsValid(formValidity);
    return () => {
      console.log('CLEANING UP');
    };
  }, [emailState.isValid, passwordState.isValid, collegeNameState.isValid]);

  const emailChangeHandler = (event) => {
    console.log('Email input changed');
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    console.log('Password input changed');
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const collegeNameChangeHandler = (event) => {
    console.log('College name input changed');
    dispatchCollegeName({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    console.log('Validating email');
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    console.log('Validating password');
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validateCollegeNameHandler = () => {
    console.log('Validating college name');
    dispatchCollegeName({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeNameState.value);
  };

  console.log('Rendering Login component');

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
          label="E-Mail"
        />
        <Input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
          label="Password"
        />
        <Input
          type="text"
          id="collegeName"
          value={collegeNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
          isValid={collegeNameState.isValid}
          label="College Name"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
