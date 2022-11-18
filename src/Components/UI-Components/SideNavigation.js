import Overlay from "../UI-Components/Overlay";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {controlActions} from "../Redux/ReduxStore";
import OwnerLogoName from '../UI-Components/OwnerLogoName';

const SideNavigation = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.side_nav_style
  );
  const navImg = useSelector((state) => state.controlerStyles.navImg);
  const designNumber = useSelector((state) => state.controlerStyles.desginNumber);
  const dispatch = useDispatch();
  
  const closeNavSide = () => {
    dispatch(controlActions.toggleNavSide());
  };
  
  return (
    <React.Fragment>
      <Overlay/>
      <div className={mainStyle.modal}>
        {navImg && <img src={navImg} alt="background" className={mainStyle.navImg}/>}
        {designNumber === 4 && <OwnerLogoName/>}
        <nav className={mainStyle.sideNav}>
          <span className={mainStyle.navLink}>About Us</span>
          <span className={mainStyle.navLink}>Contacts</span>
          <span className={mainStyle.navLink}>Service</span>
          <span className={mainStyle.navLink}>Menu</span>
          <span className={mainStyle.navLink}>Cart</span>
        </nav>
        <button onClick={closeNavSide} className={mainStyle.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default SideNavigation;
