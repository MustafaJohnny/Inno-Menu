import classes from "./WaiterModal.module.css";
import Overlay from "../UI-Components/Overlay";
import ClockImg from "../Icons/Clock.png";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch } from "react-redux";
import React from "react";

const ServiceSoonModal = () => {
  const dispatch = useDispatch();

  const closeServiceModalMSG = () => {
    dispatch(controlActions.toggleSoonService());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modal2}`}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage2}>Спасибо за заказ! Ожидайте</p>
          <p className={classes.theMessage2}>выполнения услуги..</p>
        </div>
        <img alt="bell-icon" src={ClockImg} className={classes.clockImg} />
        <div className={classes.buttonsArea}>
          <button
            onClick={closeServiceModalMSG}
            className={`${classes.btn} ${classes.btn3}`}
          >
            Продолжить
          </button>
        </div>
        <button
          onClick={closeServiceModalMSG}
          className={classes.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ServiceSoonModal;
