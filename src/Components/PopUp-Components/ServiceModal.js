import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const ServiceModal = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );

  const serviceImg = useSelector((state) => state.controlerStyles.service_img);

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
      <div className={`${mainStyle.modal} ${mainStyle.modal2}`}>
        <div className={mainStyle.MessageArea}>
          <p className={mainStyle.theMessage2}>Вы действительно хотите</p>
          <p className={mainStyle.theMessage2}>заказать эту услугу ?</p>
        </div>
        <img alt="bell-icon" src={serviceImg} className={mainStyle.clockImg} />
        <div className={mainStyle.buttonsArea}>
          <button
            onClick={orderServiceSure}
            className={`${mainStyle.btn} ${mainStyle.btn2}`}
          >
            Заказать
          </button>
        </div>
        <button onClick={closeServiceModal} className={mainStyle.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ServiceModal;
