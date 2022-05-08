import React, { useState, useEffect } from "react";
import logo from "../assets/images/login.jpg";
import "./styles/login.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberChecked, setRememberChecked] = useState(true);

  useEffect(() => {
    try {
      const rememberMe = localStorage.getItem("@rememberMe");
      if (rememberMe) {
        const currentEmployee = localStorage.getItem("@employee");
        if (currentEmployee) {
          history.push("dash");
        }
      } else {
        localStorage.removeItem("@employee");
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxClick = () => {
    setRememberChecked(!rememberChecked);
  };

  const handleLogin = async () => {
    const formValues = {
      username,
      password,
    };
    try {
      const endpoint = "http://localhost:8070/login";
      const body = JSON.stringify(formValues);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        const responseBody = await response.json();
        if (responseBody.length > 0) {
          localStorage.setItem("@employee", JSON.stringify(responseBody));
          if (rememberChecked) localStorage.setItem("@rememberMe", true);
          else localStorage.removeItem("@rememberMe");
          history.push("dash");
        } else {
          localStorage.removeItem("@employee");
          localStorage.removeItem("@rememberMe");
        }
      } else {
        localStorage.removeItem("@employee");
        localStorage.removeItem("@rememberMe");
      }
    } catch (error) {
      localStorage.removeItem("@employee");
      localStorage.removeItem("@rememberMe");
      console.log(error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-contain-left">
          <img src={logo} height={500} alt={"health-line logo"} />
        </div>
        <div className={"login-contain-right"}>
          <div className={"content-background"}>
            <div className="login-title">
              <h2>Admin</h2>
            </div>
            <div className={"form"}>
              <div className={"form-group w-100"}>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  value={username}
                />
              </div>
              <div className={"form-group w-100"}>
                <input
                  className="form-control"
                  type="password"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  value={password}
                />
              </div>
              <div className="w-100">
                <div className="remember">
                  <input
                    type="checkbox"
                    checked={rememberChecked}
                    onClick={handleCheckboxClick}
                  />
                  <label>Remember me</label>
                </div>
              </div>
              <div className="w-100">
                <div>
                  <button className="login-button" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
