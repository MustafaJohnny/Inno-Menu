import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const BellComponent = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.order_comp_style
  );

  const bellIcon = useSelector((state) => state.controlerStyles.bell_icon);

  const dispatch = useDispatch();

  const showWaiterNow = () => {
    dispatch(controlActions.toggleShowWaiter());
  };

  return (
    <React.Fragment>
      <div onClick={showWaiterNow} className={mainStyle.theBell}>
        <img className={mainStyle.bellElement} src={bellIcon} alt="icon" />
        <div className={mainStyle.bellBehind}></div>
      </div>
    </React.Fragment>
  );
};

export default BellComponent;
