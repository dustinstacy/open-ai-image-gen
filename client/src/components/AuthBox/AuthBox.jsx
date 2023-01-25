import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../context/GlobalContext";

import "./AuthBox.scss"

const AuthBox = ({ register }) => {
  const navigate = useNavigate();
  const { getCurrentUser, user} = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && navigate) {
      navigate("/");

    }
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      data = {
        name,
        email,
        password,
        confirmPassword
      }
    } else {
      data = {
        email,
        password
      }
    }

    axios.post(register ? "/api/auth/register" : "/api/auth/login", data)
      .then(() => {
        getCurrentUser();
       })
      .catch(error => {
        console.log(error);
        setLoading(false);
        if (error?.response?.data) {
          console.log(error);
          setErrors(error.response.data);
        }
      })
  }


  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__title">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        <form onSubmit={onSubmit}>
          {register && (
            <div className="auth__field">
              <label>Username</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && (
                <p className="auth__error">{errors.name}</p>
              )}
            </div>
          )}

          <div className="auth__field">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && (
                <p className="auth__error">{errors.email}</p>
              )}
          </div>

          <div className="auth__field">
            <label>Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && (
                <p className="auth__error">{errors.password}</p>
              )}
          </div>

          {register && (
            <div className="auth__field">
              <label>Confirm Password</label>
              <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } />
              {errors.confirmPassword && (
                <p className="auth__error">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div className="auth__footer">
            {Object.keys(errors).length > 0 && (
              <p className="auth__error">{register ? "Information could not be validated" : "That's not right"}</p>
            )}
            <button type="submit" disabled={loading}>{register ? "Register" : "Login"}</button>
          </div>
        </form>
        {!register &&
          <div className="auth__register">
            <span>Not a member? </span>
            <NavLink to="../register">
              Sign up
            </NavLink>
          </div>
        }
      </div>
    </div>
  );
};

export default AuthBox;
