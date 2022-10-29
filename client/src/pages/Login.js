import axios from "axios";
import { useFormik } from "formik";
import { BASE_URL, LOCALSTORAGE_KEY } from "../config";
import { LoginSchema } from "../Schemas/index";
import "./main.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: LoginSchema.initials,
      validationSchema: LoginSchema.validation,
      onSubmit: (values, action) => {
        onClickLogin(values);
      },
    });
  const navigate = useNavigate();

  const onClickLogin = (values) => {
    axios
      .post(BASE_URL + "/login", values)
      .then((res) => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(res.data));
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in login", err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="login-main">
      <div className="login-child">
        <form onSubmit={handleSubmit}>
          <p className="login-header">Welcome back</p>
          <div className="input-block">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </div>
          <div className="input-block">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>
          <button className="input-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
