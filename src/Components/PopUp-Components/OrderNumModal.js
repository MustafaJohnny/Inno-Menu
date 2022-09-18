import classes from "./WaiterModal.module.css";
import Heart from "../Icons/Heart.png";
import React from "react";

const OrderNumModal = () => {
  return (
    <React.Fragment>
      <div className={`${classes.modal} ${classes.modal2}`}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage2}>Your order has been placed</p>
          <p className={classes.theMessage2}>successfully, enjoy your food!</p>
        </div>
        <img alt="bell-icon" src={Heart} className={classes.clockImg} />
        <div className={classes.buttonsArea}>
          <button className={`${classes.btn} ${classes.btn3}`}>
            ORDER NUMBER : 666
          </button>
        </div>
        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default OrderNumModal;
