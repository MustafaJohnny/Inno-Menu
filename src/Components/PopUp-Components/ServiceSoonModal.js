import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const ServiceSoonModal = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );

  const clockImg = useSelector((state) => state.controlerStyles.clock_img);

  const dispatch = useDispatch();

  const closeServiceModalMSG = () => {
    dispatch(controlActions.toggleSoonService());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${mainStyle.modal} ${mainStyle.modal2} ${mainStyle.modal6}`}>
        <div className={mainStyle.MessageArea}>
          <p className={mainStyle.theMessage2}>Спасибо за заказ! Ожидайте</p>
          <p className={mainStyle.theMessage2}>выполнения услуги..</p>
        </div>
        {clockImg && <img alt="bell-icon" src={clockImg} className={mainStyle.clockImg} />}
        <div className={mainStyle.buttonsArea}>
          <button
            onClick={closeServiceModalMSG}
            className={`${mainStyle.btn} ${mainStyle.btn3}`}
          >
            Продолжить
          </button>
        </div>
        <button
          onClick={closeServiceModalMSG}
          className={mainStyle.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ServiceSoonModal;
