import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "../Navigation/Navigation.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
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
      <h1 className='inputTitle'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className='inputCon'>
          <label htmlFor='email'>
            <p className='labelTitle'>Email</p>
          </label>
          <input
            className='formInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className='labelTitle error'>{errors.email}</p>}
        </div>
        {/* Username */}
        <div className='inputCon'>
          <label htmlFor='username'>
            <p className='labelTitle'>
              Username
            </p>
          </label>
          <input
            className='formInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className='labelTitle error'>{errors.username}</p>}
        </div>
        {/* Password */}
        <div className='inputCon'>
          <label htmlFor='password'>
            <p className='labelTitle'>Password</p>
          </label>
          <input
            className='formInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className='labelTitle error'>{errors.password}</p>}
        </div>
        {/* Confirm Password */}
        <div className='inputCon'>
          <label htmlFor='confirmPassword'>
            <p className='labelTitle'>Confirm Password</p>
          </label>
          <input
            className='formInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className='labelTitle error'>{errors.confirmPassword}</p>
          )}
        </div>
        
        <button 
          className='submitButton'
          type="submit"
          disabled={
            (!email.length ||
            !username.length ||
            !password.length ||
            !confirmPassword.length)
          }
          >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
