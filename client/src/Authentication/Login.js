import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginn, setLogin] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/register/')
      .then(response => setLogin(response.data));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    let bench = 0;
    loginn.filter((el) => { return (el.email === email && el.password === password) && (bench = 1); }
    );
    if (bench) {
      console.log(bench);
      window.location = "/home";
    } else {
      alert('Invalid email & password');
    }
  };


  return (

    <div className="card-body p-5">
      <h3 className="text-uppercase text-center mb-5">Login</h3>
      <form
        onSubmit={onSubmit}
      >
        <div class="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>
        <div class="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
        <br />

        <div className="d-flex justify-content-center">
          <input
            type="submit"
            value="Login"
            className="btn btn-dark"
          // onClick={login}
          />
        </div>
        <br />
        <p className="d-flex justify-content-center">
          If not register then.
          <Link
            to="/register"
          //   onClick={() => history.push("/login")}
          >
            Register
          </Link>
        </p>
      </form>
    </div>

  );
};

export default Login;
