import React from "react";
import Basket from "../Icons/Basket.svg";
import classes from "./OrderComponent.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const BasketComponent = () => {
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const totalAmount = useSelector((state) => state.controler.cart_total_amount);
  const totalQuantity = useSelector(
    (state) => state.controler.cart_total_quantity
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const goToCart = () => {
    dispatch(controlActions.toggleRemoveArrow());

    navigate(
      `/menu/${params.domain}/${params.NumOfTable}/${params.lang}/cart`,
      {
        replace: false,
      }
    );
  };
  return (
    <React.Fragment>
      <div className={classes.componentOrder}>
        <div className={classes.totalArea}>
          <p className={classes.total}>Итого :</p>
          <span
            className={classes.price}
          >{`${totalAmount}  ${menuCurrency}`}</span>
        </div>
        <button onClick={goToCart} type="button" className={classes.orderBtn}>
          <span className={classes.orderText}>Заказать</span>
          <img className={classes.basketIcon} alt="icon" src={Basket} />
          <span className={classes.orderAdded}>{totalQuantity}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default BasketComponent;