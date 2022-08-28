import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routeconstant } from "../navigation/Routeconstant";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./main.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onClickRegister = () => {
    navigate(Routeconstant.REGISTER);
  };

  const onClicklogin = () => {
    loginuser();
  };

  const loginuser = async () => {
    if (email !== "" && password !== "") {
      const userObj = {
        email,
        password,
      };
      await axios.post("/api/v1/login", userObj).then((res) => {
        console.log(res.data);
      });
      try {
        const response = await axios.post("/api/v1/login", userObj);
        // console.log(response.data.message);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please enter email");
    }
  };

  return (
    <div className="Loginmain">
      <div className="Loginparent">
        <div className="Loginheading">Welcome Back</div>
        <div>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          ></input>
        </div>
        <div>
          <p> Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          ></input>
        </div>
        <a className="Forgotpassword">Forgot Password</a>
        <div className="Buttonlogin">
          <button onClick={() => onClicklogin()}>Login</button>
          <button onClick={() => onClickRegister()}>Register</button>
        </div>
        <div className="Ordiv">
          <p>or</p>
        </div>
        <div className="Joinusdiv">
          <p>Join us with</p>
        </div>
        <div className="Joinuslogo">
          <img src="/assets/images/facebook.png" alt="facebook" />
          <img src="/assets/images/google.png" alt="google" />
          <img src="/assets/images/amazon.png" alt="amazon" />
        </div>
      </div>
    </div>
  );
};

export default Login;
