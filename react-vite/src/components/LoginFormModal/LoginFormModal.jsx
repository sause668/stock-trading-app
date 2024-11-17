import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../Navigation/Navigation.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoSubmit = async () => {

    const serverResponse = await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Log In</h1>
      <form onSubmit={handleSubmit} className="loginSignupForm">
      <div className='inputCon'>
        <label htmlFor='username_email'><p className='labelTitle'>Username or Email</p></label>
        <input
          className='formInput'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <p className='labelTitle error'>{errors.email[0]}</p>
        )}
      </div>
      <div className='inputCon'>
        <label htmlFor='password' className='labelTitle'>Password</label>
        <input
          className='formInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && (
          <p className='labelTitle error'>{errors.password[0]}</p>
        )}
      </div>
        
        
      <button 
        className='submitButton'
        type="submit" 
        disabled={(email.length < 4 || password.length < 4)}
      >
        Log In
      </button>
      <button 
        className='submitButton'
        onClick={demoSubmit}
      >
        Demo Login
      </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
