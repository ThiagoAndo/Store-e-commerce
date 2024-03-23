import classes from "./Input.module.css";
import { useRef, useState } from "react";

const Input = (props) => {
  const qnt = useRef();

  return (
    <div className={classes["Input-container"]}>
      <label ref={qnt} htmlFor={props.input.id}>
        {props.label}
      </label>
      <input {...props.input}></input>
    </div>
  );
};

export default Input;
