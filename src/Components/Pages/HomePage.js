import React from "react";
import Navigation from "../UI-Components/Navigation";
import ServiceSoonModal from "../PopUp-Components/ServiceSoonModal";
import BasketComponent from "../UI-Components/BasketComponent";
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
    if (selectedItems.length !== 0) setHideMenus(false);
    if (selectedItems.length === 0) setHideMenus(true);
    if (serviceItems.length !== 0) setHideMenus(false);
    if (serviceItems.length === 0) setHideMenus(true);
  }, [serviceItems, selectedItems]);
  
  const mainStyle = useSelector((state) => state.controlerStyles.pages_style);
  const serviceOrderBtn = useSelector((state)=> state.controlerStyles.serviceOrderBtn);
  const titleItemBtn = useSelector((state)=> state.controlerStyles.titleItemBtn);
  const hideItems = useSelector((state) => state.controler.hide_items);
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const showService = useSelector((state) => state.controler.show_service);
  const soonService = useSelector((state) => state.controler.soon_service);
  const layoutState = useSelector((state) => state.controler.layout_oneFR);
  const desginNumber = useSelector(
    (state) => state.controlerStyles.desginNumber
  );
  ////////////////////////////////////////////////////////////////////////////////
  
  const layoutActiveClass = layoutState
    ? mainStyle.menuContainer1FR
    : mainStyle.menuContainer2FR;
  
  const nameActiveClass = layoutState
    ? mainStyle.elementName1FR
    : mainStyle.elementName2FR;
  
  const menuElActiveClass = layoutState
    ? mainStyle.menuElement1FR
    : mainStyle.menuElement2FR;
  
  // Very important thing we will get back her later..
  const neededStyle =
    desginNumber === 1 ? mainStyle.menuElement : menuElActiveClass;
  
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const params = useParams();
  
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${params.domain}`;
  
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
            `${process.env.REACT_APP_URL}/api/v1/client/CategoryWhisProduct/${onlyItemID}`
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
      // When there is a menu with some categories (more then one) we navigate to categories page and show them to the user.
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
          `${process.env.REACT_APP_URL}/api/v1/client/CategoryWhisProduct/${categorieID}`
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
  const orderServiceNow = (serviceID) => {
    dispatch(controlActions.toggleShowService());
    dispatch(controlActions.setClickedServiceID(serviceID));
  };
  
  // Adding to cat handling function
  const handleAddToCart = (meal) => {
    dispatch(controlActions.addToCart(meal));
    dispatch(controlActions.getTotal());
  };
  
  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      {showService && <ServiceModal />}
      {soonService && <ServiceSoonModal />}
      <section className={mainStyle.firstSection}>
        <Navigation />
        <SwiperComponent />
      </section>
      <section
        className={
          showOrder ? mainStyle.secondSection : mainStyle.secondSection2
        }
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
                className={neededStyle}
              >
                <div
                  className={mainStyle.differentStyleImg}
                  key={ele.id}
                  id={index}
                  style={{
                    backgroundImage: `url("${URL}/${ele.image}")`,
                  }}
                ></div>
                <span id={index} className={nameActiveClass}>
                  {ele.name}
                </span>
              </div>
            ))}
        </div>
        
        <div className={mainStyle.menuContainer1FR}>
          {serviceItems.map((ele, index) => (
            <div key={ele.id} id={index} className={mainStyle.serviceElement}>
              <div className={mainStyle.namePriceArea}>
                <span id={index} className={mainStyle.serviceName}>
                  {ele.name}
                </span>
                <span className={mainStyle.servicePrice}>
                  {ele.price !== 0 ? ele.price + " " + menuCurrency : ""}
                </span>
              </div>
              <div className={mainStyle.serviceAction}>
                {ele.description && (
                  <span id={index} className={mainStyle.serviceDescription}>
                    {ele.description}
                  </span>
                )}
                <button
                  onClick={() => orderServiceNow(ele.id)}
                  className={mainStyle.serviceBtn}
                >
                  {serviceOrderBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {hideItems && (
          <div className={mainStyle.squareContainer ? mainStyle.squareContainer : mainStyle.itemsContainer}>
            {selectedItems.map((ele) => (
              <div key={ele.id} className={mainStyle.wholeItem}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(
                    0deg,
                    #00000016 16.31%,
                    rgba(217, 217, 217, 0) 117.2%
                  ), url("${URL}/${ele.image}")`,
                  }}
                  className={mainStyle.itemImgArea}
                ></div>
                <div className={mainStyle.itemInfoArea}>
                  <div className={mainStyle.itemNameSize}>
                    <span className={mainStyle.itemName}>{ele.name}</span>
                    <span className={mainStyle.itemSize}>
                      {ele.modifex[0].datamodifex[0].name}
                    </span>
                    <span className={mainStyle.itemDescription}>
                      {ele.description}
                    </span>
                  </div>
                  <span className={mainStyle.itemPrice}>
                    {`${ele.price} ${menuCurrency}`}
                  </span>
                </div>
                <div className={mainStyle.itemAddArea}>
                  <button
                    onClick={() => handleAddToCart(ele)}
                    className={mainStyle.miniAddCartBtn ? mainStyle.miniAddCartBtn : mainStyle.addCartBtn}
                    type="button"
                  >
                    {titleItemBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showOrder && <BasketComponent />}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
