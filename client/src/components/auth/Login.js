import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUCCESS");

    //     const newUser = {
    //       email,
    //       password,
    //     };

    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       };

    //       const body = JSON.stringify(newUser);

    //       // only have to do /api/users because added proxy
    //       const response = await axios.post("", body, config);
    //       console.log(response.data);
    //     } catch (err) {
    //       console.error(err.response.data);
    //     }
  };

  return (
    <Fragment>
      <h1 className="">Login</h1>
      <p className="">
        <i className="" /> Log Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an Account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};
