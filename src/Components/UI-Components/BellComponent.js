import React from "react";
import Bell from "../Icons/Bell.svg";
import { useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import classes from "./BellComponent.module.css";

const BellComponent = () => {
  const dispatch = useDispatch();

  const showWaiterNow = () => {
    dispatch(controlActions.toggleShowWaiter());
  };

  return (
    <React.Fragment>
      <div onClick={showWaiterNow} className={classes.theBell}>
        <img className={classes.bellElement} src={Bell} alt="icon" />
        <div className={classes.bellBehind}></div>
      </div>
    </React.Fragment>
  );
};

export default BellComponent;
