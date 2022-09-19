import React from "react";
import classes from "./HomePage.module.css";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../UI-Components/Navigation";
import ArrowL from "../Icons/ArrowL.svg";
import { controlActions } from "../Redux/ReduxStore";
import axios from "axios";

const CategoriesPage = () => {
  const categorieItem = useSelector((state) => state.controler.categories_item);

  useEffect(() => {
    dispatch(controlActions.toggleShowLayout(true));
    window.scrollTo(0, 0);
  }, [categorieItem]);

  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  ////////////////////////////////////////////////////////////////////////////////
  const layoutState = useSelector((state) => state.controler.layout_oneFR);
  const layoutActiveClass = layoutState
    ? classes.menuContainer1FR
    : classes.menuContainer2FR;

  const nameActiveClass = layoutState
    ? classes.elementName1FR
    : classes.elementName2FR;
  ///////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;
  const allItems = categorieItem.categorymenu;

  const navigateStepBack = () => {
    navigate(-1);
  };

  const getSelectedItem = (event) => {
    const categorieID = allItems[event.target.id].id;

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}:8000/api/v1/client/CategoryWhisProduct/${categorieID}`
      );

      if (mounted) {
        dispatch(
          controlActions.getItemsHeading(allItems[event.target.id].name)
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
  };

  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      <section className={classes.firstSection}>
        <Navigation />
        <div className={classes.theMealsHeading}>
          <img
            onClick={navigateStepBack}
            alt="icon"
            src={ArrowL}
            className={classes.arrowIcon}
          />
          <span className={classes.foodSecHeading}>{categorieItem.name}</span>
        </div>
      </section>
      <section
        className={showOrder ? classes.secondSection : classes.secondSection2}
      >
        <div className={layoutActiveClass}>
          {allItems.map((ele, index) => (
            <div
              onClick={getSelectedItem}
              id={index}
              style={{
                backgroundImage: `linear-gradient(
                  0deg,
                  #000000b4 16.31%,
                  rgba(217, 217, 217, 0) 117.2%), url("${URL}/${ele.image}")`,
              }}
              key={ele.id}
              className={classes.menuElement}
            >
              <span id={index} className={nameActiveClass}>
                {ele.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default CategoriesPage;
