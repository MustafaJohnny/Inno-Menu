import React from "react";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import BasketComponent from "../UI-Components/BasketComponent";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {controlActions} from "../Redux/ReduxStore";
import Navigation from "../UI-Components/Navigation";

const ItemsPage = () => {
  useEffect(() => {
    dispatch(controlActions.toggleShowLayout(false));
    window.scrollTo(0, 0);
  }, []);
  
  const mainStyle = useSelector((state) => state.controlerStyles.pages_style);
  const arrowBack = useSelector((state) => state.controlerStyles.arrow_back);
  const titleItemBtn = useSelector((state) => state.controlerStyles.titleItemBtn);
  const arrowState = useSelector((state) => state.controler.remove_arrow);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  ///////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${params.domain}`;
  
  const itemsHeading = useSelector((state) => state.controler.items_heading);
  const selectedItems = useSelector((state) => state.controler.selected_items);
  
  const navigateStepBack = () => {
    // Maybe it's a bad thing to do
    dispatch(controlActions.getSelectedItems([]));
    dispatch(controlActions.toggleShowLayout(true));
    navigate(-1);
  };
  
  // Adding to cat handling function
  const handleAddToCart = (meal) => {
    dispatch(controlActions.addToCart(meal));
    dispatch(controlActions.getTotal());
  };
  const needContainer = showOrder ? `${mainStyle.itemsContainer} ${mainStyle.squareContainer}`
    : `${mainStyle.itemsContainer2}${mainStyle.squareContainer}`;
  
  return (
    <React.Fragment>
      {showSideNav && <SideNavigation/>}
      {showLangNav && <LangNavigation/>}
      <section className={mainStyle.firstSection}>
        <Navigation/>
        <div className={mainStyle.theMealsHeading}>
          {arrowState && (
            <img
              onClick={navigateStepBack}
              alt="icon"
              src={arrowBack}
              className={mainStyle.arrowIcon}
            />
          )}
          <span className={mainStyle.foodSecHeading}>{itemsHeading}</span>
        </div>
      </section>
      <section
        className={
          showOrder ? mainStyle.secondSection : mainStyle.secondSection2
        }
      >
        <div
          className={needContainer}
        >
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
                <span
                  className={mainStyle.itemPrice}
                >{`${ele.price} ${menuCurrency}`}</span>
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
        {showOrder && <BasketComponent/>}
      </section>
    </React.Fragment>
  );
};

export default ItemsPage;
