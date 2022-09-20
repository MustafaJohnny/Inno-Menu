import React from "react";
import Basket from "../Icons/Basket.svg";
import classes from "./OrderComponent.module.css";
import { useSelector } from "react-redux";

const OrderComponent = () => {
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const totalAmount = useSelector((state) => state.controler.cart_total_amount);
  const totalQuantity = useSelector(
    (state) => state.controler.cart_total_quantity
  );

  return (
    <React.Fragment>
      <div className={classes.componentOrder}>
        <div className={classes.totalArea}>
          <p className={classes.total}>Итого :</p>
          <span
            className={classes.price}
          >{`${totalAmount}  ${menuCurrency}`}</span>
        </div>
        <button type="button" className={classes.orderBtn}>
          <span className={classes.orderText}>Подтвердить</span>
          <img className={classes.basketIcon} alt="icon" src={Basket} />
          <span className={classes.orderAdded}>{totalQuantity}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default OrderComponent;
