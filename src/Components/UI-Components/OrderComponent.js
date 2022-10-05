import React from "react";
import { useSelector } from "react-redux";

const OrderComponent = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.order_comp_style
  );

  const basketIcon = useSelector((state) => state.controlerStyles.basket_icon);

  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const totalAmount = useSelector((state) => state.controler.cart_total_amount);
  const totalQuantity = useSelector(
    (state) => state.controler.cart_total_quantity
  );

  return (
    <React.Fragment>
      <div className={mainStyle.componentOrder}>
        <div className={mainStyle.totalArea}>
          <p className={mainStyle.total}>Итого :</p>
          <span
            className={mainStyle.price}
          >{`${totalAmount}  ${menuCurrency}`}</span>
        </div>
        <button type="button" className={mainStyle.orderBtn}>
          <span className={mainStyle.orderText}>Подтвердить</span>
          <img className={mainStyle.basketIcon} alt="icon" src={basketIcon} />
          <span className={mainStyle.orderAdded}>{totalQuantity}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default OrderComponent;
