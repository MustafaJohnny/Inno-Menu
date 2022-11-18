import React from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {controlActions} from "../Redux/ReduxStore";

const OrderComponent = () => {
  const dispatch = useDispatch();
  
  const mainStyle = useSelector(
    (state) => state.controlerStyles.order_comp_style
  );
  const cart_items = useSelector((state) => state.controler.cart_items);
  const basketIcon = useSelector((state) => state.controlerStyles.basket_icon);
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const totalAmount = useSelector((state) => state.controler.cart_total_amount);
  const totalQuantity = useSelector(
    (state) => state.controler.cart_total_quantity
  );
  
  const numberOfTable = useSelector(
    (state) => state.controler.user_num_of_table
  );
  
  const sendOrderToDashborad = () => {
    const serverParams = {
      table_uuid: numberOfTable,
      description_user: "",
      price: totalAmount,
    };
    if (!serverParams.description_user) delete serverParams.description_user;
    
    axios
    .post(`${process.env.REACT_APP_URL}/api/ord_rest/order_new`, cart_items, {
      params: serverParams,
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch(controlActions.toggleOrderIsReady());
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
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
        <button
          onClick={sendOrderToDashborad}
          type="button"
          className={mainStyle.orderBtn}
        >
          <span className={mainStyle.orderText}>Подтвердить</span>
          <img className={mainStyle.basketIcon} alt="icon" src={basketIcon}/>
          <span className={mainStyle.orderAdded}>{totalQuantity}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default OrderComponent;
