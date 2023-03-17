import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [registerr, setRegister] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/register/')
      .then(response => setRegister(response.data));

  }, []);

  const onSubmit = (e) => {
    e.preventDefault();


    if (username && email && password && (password === repassword)) {
      // {
      //   if (el.email === email) {
      //     bench = 1;
      //   }
      // }
      let bench = 0;
      registerr.filter((el) => { return (el.email === email) && (bench = 1); });
      const register = { username, email, password, repassword };
      if (bench) {
        alert('this email already register.');
      } else {
        alert('Successfully register.');
        axios.post("http://localhost:5000/register/add", register).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      }


    } else {
      alert("invlid input");
    };
    setUsername('');
    setEmail('');
    setPassword('');
    setRePassword('');
  };

  return (

    <div className="card-body p-5">
      <h3 className="text-uppercase text-center mb-5">Register</h3>
      <form
        onSubmit={onSubmit}
      >
        <div className="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>

        <div className="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
        </div>

        <div className="form-outline mb-4">
          <input
            className="form-control form-control-lg"
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-enter Password"
          />
        </div>
        <br />

        <div className="d-flex justify-content-center">
          <input
            type="submit"
            value="Register"
            className="btn btn-dark"
          />
        </div>
        {/* {
                registerr.map((reg) => {
                  return <p key={reg._id}>{reg.email}</p>;
                })
              } */}
        <br />
        <p className="d-flex justify-content-center">
          If you already register then.
          <Link
            to="/"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
