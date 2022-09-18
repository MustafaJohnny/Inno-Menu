import classes from "./WaiterModal.module.css";
import imgBell from "../Icons/imgBell.png";
import Overlay from "../UI-Components/Overlay";
import { useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import React from "react";

const WaiterModal = () => {
  const dispatch = useDispatch();

  const showWaiterNow = () => {
    dispatch(controlActions.toggleShowWaiter());
  };

  const callWaiterHideModal = () => {
    dispatch(controlActions.toggleShowWaiter());
    dispatch(controlActions.toggleWaiterSoon());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage2}>Вы действительно хотите</p>
          <p className={classes.theMessage2}>позвать официанта?</p>
        </div>
        <img alt="bell-icon" src={imgBell} className={classes.waiterBell} />
        <div className={classes.buttonsArea}>
          <button
            onClick={callWaiterHideModal}
            className={`${classes.btn4} ${classes.btn2}`}
          >
            Позвать Официанта
          </button>
        </div>
        <button onClick={showWaiterNow} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default WaiterModal;
