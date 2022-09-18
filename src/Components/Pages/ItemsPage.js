import React from "react";
import classes from "./HomePage.module.css";
import OrderComponent from "../UI-Components/OrderComponent";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";
import Navigation from "../UI-Components/Navigation";
import ArrowL from "../Icons/ArrowL.svg";

const ItemsPage = () => {
  useEffect(() => {
    dispatch(controlActions.toggleShowLayout(false));
    window.scrollTo(0, 0);
  }, []);

  const arrowState = useSelector((state) => state.controler.remove_arrow);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  ///////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;
  const itemsHeading = useSelector((state) => state.controler.items_heading);
  const selectedItems = useSelector((state) => state.controler.selected_items);

  const navigateStepBack = () => {
    navigate(-1);
    dispatch(controlActions.toggleShowLayout(true));
    // Maybe it's a bad thing to do
    dispatch(controlActions.getSelectedItems([]));
  };

  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      <section className={classes.firstSection}>
        <Navigation />
        <div className={classes.theMealsHeading}>
          {arrowState && (
            <img
              onClick={navigateStepBack}
              alt="icon"
              src={ArrowL}
              className={classes.arrowIcon}
            />
          )}
          <span className={classes.foodSecHeading}>{itemsHeading}</span>
        </div>
      </section>
      <section className={classes.secondSection}>
        <div className={classes.itemsContainer}>
          {selectedItems.map((ele, index) => (
            <div key={ele.id} className={classes.wholeItem}>
              <div
                style={{
                  backgroundImage: `linear-gradient(
                    0deg,
                    #00000016 16.31%,
                    rgba(217, 217, 217, 0) 117.2%
                  ), url("${URL}/${ele.image}")`,
                }}
                className={classes.itemImgArea}
              ></div>
              <div className={classes.itemInfoArea}>
                <div className={classes.itemNameSize}>
                  <span className={classes.itemName}>{ele.name}</span>
                  <span className={classes.itemSize}>
                    {ele.modifex[0].datamodifex[0].name}
                  </span>
                  <span className={classes.itemDescription}>
                    {ele.description}
                  </span>
                </div>
                <span className={classes.itemPrice}>{ele.price} RUB</span>
              </div>
              <div className={classes.itemAddArea}>
                <button className={classes.minusBtn} type="button">
                  -
                </button>
                <span className={classes.itemQTA}>1</span>
                <button className={classes.plusBtn} type="button">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <OrderComponent />
    </React.Fragment>
  );
};

export default ItemsPage;
