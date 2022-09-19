import React from "react";
import classes from "./HomePage.module.css";
import Navigation from "../UI-Components/Navigation";
import ServiceSoonModal from "../PopUp-Components/ServiceSoonModal";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import ServiceModal from "../PopUp-Components/ServiceModal";
import SwiperComponent from "../Swiper/SwiperComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { controlActions } from "../Redux/ReduxStore";
import axios from "axios";

const HomePage = () => {
  const restaurantsMenus = useSelector(
    (state) => state.controler.restaurants_menus
  );

  let showMenus = restaurantsMenus;

  if (restaurantsMenus.length === 1)
    showMenus = restaurantsMenus[0].categorymenu;

  if (showMenus.length === 1) showMenus = [];

  // We do this logic when we show the items of lonely category only.
  // We do this logic when we show the service carosel only.
  const selectedItems = useSelector((state) => state.controler.selected_items);
  const serviceItems = useSelector((state) => state.controler.service_items);

  const [hideMenus, setHideMenus] = useState(true);

  useEffect(() => {
    if (serviceItems.length !== 0) setHideMenus(false);
    if (serviceItems.length === 0) setHideMenus(true);
    if (selectedItems.length !== 0) setHideMenus(false);
    if (selectedItems.length === 0) setHideMenus(true);
  }, [serviceItems, selectedItems]);

  const hideItems = useSelector((state) => state.controler.hide_items);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const showService = useSelector((state) => state.controler.show_service);
  const soonService = useSelector((state) => state.controler.soon_service);
  const layoutState = useSelector((state) => state.controler.layout_oneFR);
  ////////////////////////////////////////////////////////////////////////////////

  const layoutActiveClass = layoutState
    ? classes.menuContainer1FR
    : classes.menuContainer2FR;

  const nameActiveClass = layoutState
    ? classes.elementName1FR
    : classes.elementName2FR;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;

  ////////////////////////////////////////////////////////////////////////////////
  const getClickedMenuOrItem = (event) => {
    const menuOrItem = showMenus[event.target.id].categorymenu ? true : false;

    // When there is a menu with different food categories we do this..
    if (menuOrItem) {
      //////////////////////////////////////////////////////////////////

      // When one of the menu's got only one category, then we just show to the user what's inside this category..(item)
      if (showMenus[event.target.id].categorymenu.length === 1) {
        const onlyItemID = showMenus[event.target.id].categorymenu[0].id;

        dispatch(
          controlActions.getItemsHeading(showMenus[event.target.id].name)
        );

        let mounted = true;

        const getData = async () => {
          const request = await axios.get(
            `http://${serverAPI}:8000/api/v1/client/CategoryWhisProduct/${onlyItemID}`
          );

          if (mounted) {
            dispatch(controlActions.getSelectedItems(request.data));

            dispatch(controlActions.toggleRemoveArrow());

            dispatch(controlActions.toggleShowLayout(false));

            navigate(
              `/menu/${params.domain}/${params.NumOfTable}/${params.lang}/items`,
              {
                replace: false,
              }
            );
          }
        };
        getData();
      }
      ////////////////////////////////////////////////////////////////////////////////////
      // When there is a menu with with some categories (more then one) we navigate to categories page and show them to the user.
      if (showMenus[event.target.id].categorymenu.length !== 1) {
        dispatch(controlActions.getCategoriesItem(showMenus[event.target.id]));

        navigate(
          `/menu/${params.domain}/${params.NumOfTable}/${params.lang}/categories`,
          {
            replace: false,
          }
        );
      }
    }
    //////////////////////////////////////////////////////////////////////////////////////

    // When there is only one menu without any categories,then we just show to the user what's inside that menu....
    if (!menuOrItem) {
      const categorieID = showMenus[event.target.id].id;

      let mounted = true;

      const getData = async () => {
        const request = await axios.get(
          `http://${serverAPI}:8000/api/v1/client/CategoryWhisProduct/${categorieID}`
        );

        if (mounted) {
          dispatch(
            controlActions.getItemsHeading(showMenus[event.target.id].name)
          );

          dispatch(controlActions.getSelectedItems(request.data));

          dispatch(controlActions.toggleRemoveArrow());

          dispatch(controlActions.toggleShowLayout(false));

          navigate(
            `/menu/${params.domain}/${params.NumOfTable}/${params.lang}/items`,
            {
              replace: false,
            }
          );
        }
      };

      getData();
    }
  };

  // Order Service function
  const orderServiceNow = () => {
    dispatch(controlActions.toggleShowService());
  };

  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      {showService && <ServiceModal />}
      {soonService && <ServiceSoonModal />}
      <section className={classes.firstSection}>
        <Navigation />
        <SwiperComponent />
      </section>
      <section
        className={showOrder ? classes.secondSection : classes.secondSection2}
      >
        <div className={layoutActiveClass}>
          {hideMenus &&
            showMenus.map((ele, index) => (
              <div
                onClick={getClickedMenuOrItem}
                style={{
                  backgroundImage: `linear-gradient(
                  0deg,
                  #0000005a 16.31%,
                  rgba(217, 217, 217, 0) 117.2%), url("${URL}/${ele.image}")`,
                }}
                key={ele.id}
                id={index}
                className={classes.menuElement}
              >
                <span id={index} className={nameActiveClass}>
                  {ele.name}
                </span>
              </div>
            ))}
        </div>

        <div className={classes.menuContainer1FR}>
          {serviceItems.map((ele, index) => (
            <div key={ele.id} id={index} className={classes.serviceElement}>
              <div className={classes.namePriceArea}>
                <span id={index} className={classes.serviceName}>
                  {ele.name}
                </span>
                <span className={classes.servicePrice}>
                  {ele.price !== 0 ? ele.price + " " + menuCurrency : ""}
                </span>
              </div>
              <div className={classes.serviceAction}>
                <span id={index} className={classes.serviceDescription}>
                  {ele.description}
                </span>
                <button
                  onClick={orderServiceNow}
                  className={classes.serviceBtn}
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>

        {hideItems && (
          <div className={classes.itemsContainer}>
            {selectedItems.map((ele) => (
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
                  <span className={classes.itemPrice}>
                    {`${ele.price} ${menuCurrency}`}
                  </span>
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
        )}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
