import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routeconstant } from "../navigation/Routeconstant";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./main.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const onClickRegister = () => {
    navigate(Routeconstant.LOGIN);
    registerUser();
  };

  const registerUser = async () => {
    if (password === confirmpassword) {
      const userObj = {
        email,
        password,
        confirmpassword,
      };
      try {
        const response = await axios.post("/api/v1/register", userObj);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {}
    } else {
      toast.error("Password and confirm password does not match");
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
        <div>
          <p>Confirm Password</p>
          <input
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={confirmpassword}
            type="password"
          ></input>
        </div>
        <div className="Buttonlogin">
          <button onClick={() => onClickRegister()}>Back to Login</button>
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

export default Register;
