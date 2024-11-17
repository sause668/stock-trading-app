import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css"

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
      navigate("/");
    }
  };

  return (
    <> 
    <div className="signup-container">
      <section className="signup">
        <h1>Welcome to HoneyStock!</h1>
        <p> 
        Dive into the world of trading with the sweet confidence
        of a bee in its hive. Whether you&apos;re a seasoned trader 
        or just buzzing around the market for the first time, 
        HoneyStock offers everything you need to succeed. 
        Access real-time data, insightful analysis, and join a hive of like-minded traders right here.
        </p>
        <p>
        Get ready to stick to your financial goals and watch your investments grow with HoneyStock. 
        Happy trading, and may your profits be as sweet as honey!
        </p>
        <img src='../../../public/images/HoneyStock.png'></img>
      </section>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="form">
      <h2 style={{"textAlign": "center"}}>Signup for HoneyStock</h2>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="submitButton">Sign Up</button>
      </form>
      </div>
      <img src="https://www.smartbrief.com/wp-content/uploads/2020/05/AdobeStock_295042621-scaled-1320x674.jpeg"></img>
    </>
  );
}

export default SignupFormPage;
