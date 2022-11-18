import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const BasketComponent = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.order_comp_style
  );

  const basketIcon = useSelector((state) => state.controlerStyles.basket_icon);

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
      <div className={mainStyle.componentOrder}>
        <div className={mainStyle.totalArea}>
          <p className={mainStyle.total}>Итого :</p>
          <span
            className={mainStyle.price}
          >{`${totalAmount}  ${menuCurrency}`}</span>
        </div>
        <button onClick={goToCart} type="button" className={mainStyle.orderBtn}>
          <span className={mainStyle.orderText}>Заказать</span>
          <img className={mainStyle.basketIcon} alt="icon" src={basketIcon} />
          <span className={`${mainStyle.orderAdded} ${mainStyle.positionOrder}`}>{totalQuantity}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default BasketComponent;
