import React from "react";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";

const WaiterModal = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );

  const waiterImg = useSelector((state) => state.controlerStyles.waiter_img);

  const dispatch = useDispatch();

  const showWaiterNow = () => {
    dispatch(controlActions.toggleShowWaiter());
  };

  const callWaiterHideModal = () => {
    dispatch(controlActions.toggleShowWaiter());
    dispatch(controlActions.toggleWaiterSoon());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={mainStyle.modal}>
        <div className={mainStyle.MessageArea}>
          <p className={mainStyle.theMessage2}>Вы действительно хотите</p>
          <p className={mainStyle.theMessage2}>позвать официанта?</p>
        </div>
        <img alt="bell-icon" src={waiterImg} className={mainStyle.waiterBell} />
        <div className={mainStyle.buttonsArea}>
          <button
            onClick={callWaiterHideModal}
            className={`${mainStyle.btn4} ${mainStyle.btn2}`}
          >
            Позвать Официанта
          </button>
        </div>
        <button onClick={showWaiterNow} className={mainStyle.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default WaiterModal;
