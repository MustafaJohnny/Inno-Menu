import classes from "./WaiterModal.module.css";
import Overlay from "../UI-Components/Overlay";
import ClockImg from "../Icons/Clock.png";
import { useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import React from "react";

const ClockModal = () => {
  const dispatch = useDispatch();

  const HideModalsWaiter = () => {
    dispatch(controlActions.toggleWaiterSoon());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modal2}`}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage2}>Пожалуйста, подождите </p>
          <p className={classes.theMessage2}>Официант скоро подойдет!</p>
        </div>
        <img alt="bell-icon" src={ClockImg} className={classes.clockImg} />
        <div className={classes.buttonsArea}>
          <button
            onClick={HideModalsWaiter}
            className={`${classes.btn2} ${classes.btn3}`}
          >
            Продолжать
          </button>
        </div>
        <button onClick={HideModalsWaiter} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ClockModal;
