import React from "react";
import classes from "./Navigation.module.css";
import SideNav from "../Icons/SideNav.svg";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListBullets, SquaresFour } from "phosphor-react";
import { controlActions } from "../Redux/ReduxStore";
import { controlStylesActions } from "../Redux/ReduxStyleStore";
import { useEffect, useState } from "react";
import axios from "axios";

const Navigation = () => {
  const [waitLogo, setWaitLogo] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}:8000/api/v1/client/${params.domain}/${params.lang}/restandservice/${params.NumOfTable}`
      );

      if (mounted) {
        dispatch(controlActions.getAllOwnerData(request.data));
        // request.data.design_start
        dispatch(controlStylesActions.toggleDesignStyle(2));
      }
    };

    getData();

    // Change the origin language
    document.documentElement.lang = langLetter.toLowerCase();

    setTimeout(() => {
      setWaitLogo(true);
    }, 500);

    return () => {
      mounted = false;
    };
  }, []);

  const dispatch = useDispatch();

  const params = useParams();

  const navigate = useNavigate();

  const langLetter = params.lang.slice(-2);

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const showLayout = useSelector((state) => state.controler.show_layout);
  const layout1FR = useSelector((state) => state.controler.layout_oneFR);
  const layout2FR = useSelector((state) => state.controler.layout_twoFR);

  const color1FR = layout1FR ? "#27272a" : "#a1a1aa";
  const color2FR = !layout2FR ? "#a1a1aa" : "#27272a";

  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;
  const ownerName = useSelector((state) => state.controler.owner_name);
  const ownerLogo = useSelector((state) => state.controler.owner_logo);

  const toggleLayout = () => {
    dispatch(controlActions.toggleLayoutPattern());
  };

  const togglleNavLang = () => {
    dispatch(controlActions.toggleNavLang());
  };

  const toggleNavSide = () => {
    dispatch(controlActions.toggleNavSide());
  };

  const backToHomePage = () => {
    dispatch(controlActions.setInitialSlide(0));
    navigate(`/menu/${params.domain}/${params.NumOfTable}/${params.lang}`, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <header className={classes.mainHeading}>
        <nav className={classes.navArea}>
          <div className={classes.logoArea} onClick={backToHomePage}>
            {waitLogo && (
              <div
                className={classes.logoImg}
                style={{
                  backgroundImage: `url("${URL}/${ownerLogo}")`,
                }}
              ></div>
            )}
            <span className={classes.textLogo}>{ownerName}</span>
          </div>
          <div className={classes.actionArea}>
            {showLayout && (
              <div className={classes.layoutArea}>
                <ListBullets
                  onClick={toggleLayout}
                  size={26}
                  color={color1FR}
                  weight="bold"
                />
                <SquaresFour
                  onClick={toggleLayout}
                  size={26}
                  color={color2FR}
                  weight="fill"
                />
              </div>
            )}

            <button
              onClick={togglleNavLang}
              type="button"
              className={classes.btnLanguages}
            >
              {!params.lang ? "EN" : langLetter}
            </button>
            <img
              onClick={toggleNavSide}
              className={classes.sideNavIcon}
              src={SideNav}
              alt="icon"
            />
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navigation;
