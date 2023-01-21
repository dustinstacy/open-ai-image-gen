import React from "react";

import "./AuthBox.scss"

const AuthBox = ({ register }) => {
  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__title">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        <form>
          {register && (
            <div className="auth__field">
              <label>Name</label>
              <input type="text" />
            </div>
          )}

          <div className="auth__field">
            <label>Email</label>
            <input type="text" />
          </div>

          <div className="auth__field">
            <label>Password</label>
            <input type="text" />
          </div>

          {register && (
            <div className="auth__field">
              <label>Confirm Password</label>
              <input type="text" />

              {/* <p className="auth__error">That's not right</p> */}
            </div>
          )}

          <div className="auth__footer">
            <p className="auth__error">That's not right</p>
            <button>{register ? "Register" : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthBox;
