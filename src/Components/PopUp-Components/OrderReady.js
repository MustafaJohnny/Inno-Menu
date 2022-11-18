import React from "react";
import Overlay from "../UI-Components/Overlay";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {controlActions} from "../Redux/ReduxStore";

const OrderReadyModal = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  
  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );
  
  const orderReadyImg = useSelector(
    (state) => state.controlerStyles.order_ready_img
  );
  
  const hideModalAndCleanAll = () => {
    window.localStorage.clear();
    window.localStorage.removeItem("persist:root");
    dispatch(controlActions.toggleOrderIsReady());
    dispatch(controlActions.clearEverything());
    navigate(`/menu/${params.domain}/${params.NumOfTable}/${params.lang}`, {
      replace: true,
    });
  };
  
  return (
    <React.Fragment>
      <Overlay/>
      <div className={`${mainStyle.modal} ${mainStyle.modalBg}`}>
        <div className={mainStyle.MessageArea}>
          <p className={mainStyle.theMessage2}>Ваш заказ будет скоро готов,</p>
          <p className={mainStyle.theMessage2}>приятного аппетита!</p>
        </div>
        {orderReadyImg && <img
          alt="bell-icon"
          src={orderReadyImg}
          className={mainStyle.heartImg}
        />}
        <div className={mainStyle.buttonsArea}>
          <button
            onClick={hideModalAndCleanAll}
            className={`${mainStyle.btn2} ${mainStyle.btnOrderModal}`}
          >
            Продолжить
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderReadyModal;
