import classes from "./WaiterModal.module.css";
import Overlay from "../UI-Components/Overlay";
import ServiceImg from "../Icons/Service.png";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch } from "react-redux";
import React from "react";

const ServiceModal = () => {
  const dispatch = useDispatch();

  const closeServiceModal = () => {
    dispatch(controlActions.toggleShowService());
  };

  const orderServiceSure = () => {
    dispatch(controlActions.toggleShowService());
    dispatch(controlActions.toggleSoonService());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modal2}`}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage2}>Вы действительно хотите</p>
          <p className={classes.theMessage2}>заказать эту услугу ?</p>
        </div>
        <img alt="bell-icon" src={ServiceImg} className={classes.clockImg} />
        <div className={classes.buttonsArea}>
          <button
            onClick={orderServiceSure}
            className={`${classes.btn} ${classes.btn2}`}
          >
            Заказать
          </button>
        </div>
        <button onClick={closeServiceModal} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ServiceModal;
