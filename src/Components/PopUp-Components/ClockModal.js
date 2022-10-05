import Overlay from "../UI-Components/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import React from "react";

const ClockModal = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );

  const clockImg = useSelector((state) => state.controlerStyles.clock_img);

  const dispatch = useDispatch();

  const HideModalsWaiter = () => {
    dispatch(controlActions.toggleWaiterSoon());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${mainStyle.modal} ${mainStyle.modal2}`}>
        <div className={mainStyle.MessageArea}>
          <p className={mainStyle.theMessage2}>Пожалуйста, подождите </p>
          <p className={mainStyle.theMessage2}>Официант скоро подойдет!</p>
        </div>
        <img alt="bell-icon" src={clockImg} className={mainStyle.clockImg} />
        <div className={mainStyle.buttonsArea}>
          <button
            onClick={HideModalsWaiter}
            className={`${mainStyle.btn2} ${mainStyle.btn3}`}
          >
            Продолжать
          </button>
        </div>
        <button onClick={HideModalsWaiter} className={mainStyle.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ClockModal;
