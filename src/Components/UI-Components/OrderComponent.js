import React from "react";
import Basket from "../Icons/Basket.svg";
import classes from "./OrderComponent.module.css";

const OrderComponent = () => {
  return (
    <React.Fragment>
      <div className={classes.componentOrder}>
        <div className={classes.totalArea}>
          <p className={classes.total}>Total:</p>
          <span className={classes.price}>0 RUB</span>
        </div>
        <button type="btn" className={classes.orderBtn}>
          <span className={classes.orderText}>Заказать</span>
          <img className={classes.basketIcon} alt="icon" src={Basket} />
          <span className={classes.orderAdded}></span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default OrderComponent;
