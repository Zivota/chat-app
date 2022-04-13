import React from "react";
import classes from "./Login.module.css";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.loginHolder}>
      <Card className={classes.card}>
        <h1> Welcome to ChatApp!</h1>
        <Button onClick={signInWithGoogle} className={classes.btn}>
          Login With Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
