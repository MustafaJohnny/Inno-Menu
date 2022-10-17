import React from "react";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const WaiterModal = () => {
  const dispatch = useDispatch();

  const mainStyle = useSelector(
    (state) => state.controlerStyles.waiter_modal_style
  );

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const waiterImg = useSelector((state) => state.controlerStyles.waiter_img);
  const userDomain = useSelector((state) => state.controler.user_domain);

  const numberOfTable = useSelector(
    (state) => state.controler.user_num_of_table
  );

  const showWaiterNow = () => {
    dispatch(controlActions.toggleShowWaiter());
  };

  const callWaiterHideModal = () => {
    axios
      .post(
        `http://${serverAPI}/api/v1/client/event_garson_new/${userDomain}/${numberOfTable}`
      )
      .then((response) => console.log(response));

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
