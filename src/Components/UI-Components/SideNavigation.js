import classes from "./SideNavigation.module.css";
import Overlay from "../UI-Components/Overlay";
import React from "react";
import { useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const SideNavigation = () => {
  const dispatch = useDispatch();

  const closeNavSide = () => {
    dispatch(controlActions.toggleNavSide());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <nav className={classes.sideNav}>
          <span className={classes.navLink}>About Us</span>
          <span className={classes.navLink}>Contacts</span>
          <span className={classes.navLink}>Service</span>
          <span className={classes.navLink}>Menu</span>
          <span className={classes.navLink}>Cart</span>
        </nav>
        <button onClick={closeNavSide} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default SideNavigation;
