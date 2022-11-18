import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListBullets, SquaresFour } from "phosphor-react";
import { controlActions } from "../Redux/ReduxStore";
import { controlStylesActions } from "../Redux/ReduxStyleStore";
import { useEffect, useState } from "react";
import axios from "axios";

const Navigation = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.side_nav_style
  );

  const designNumber = useSelector(
    (state) => state.controlerStyles.desginNumber
  );
  const body_color = useSelector((state) => state.controlerStyles.body_color);
  const backgroundType = designNumber === 5 ? "background" : "backgroundColor";
  document.body.style[backgroundType] = body_color;

  const sideNavIcon = useSelector(
    (state) => state.controlerStyles.side_nav_icon
  );

  const [waitLogo, setWaitLogo] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/client/${params.domain}/${params.lang}/restandservice/${params.NumOfTable}`
      );

      if (mounted) {
        // Getting all the basic data about the user (First Request)
        dispatch(controlActions.getAllOwnerData(request.data));
        // Getting the design number for the whole app.
        dispatch(
          controlStylesActions.toggleDesignStyle(request.data.design_start)
        );
      }
    };

    getData();

    // Change the origin language
    document.documentElement.lang = langLetter.toLowerCase();

    setTimeout(() => {
      setWaitLogo(true);
    }, 500);

    dispatch(controlActions.getUserDomainAndNumOfTable(params));

    return () => {
      mounted = false;
    };
  }, []);

  const dispatch = useDispatch();

  const params = useParams();

  const navigate = useNavigate();

  const langLetter = params.lang.slice(-2);

  const showLayout = useSelector((state) => state.controler.show_layout);
  const layout1FR = useSelector((state) => state.controler.layout_oneFR);
  const layout2FR = useSelector((state) => state.controler.layout_twoFR);
  const activeColor = useSelector(
    (state) => state.controlerStyles.layout_active_color
  );

  const notActiveColor = useSelector(
    (state) => state.controlerStyles.layout_notActive_color
  );

  const color1FR = layout1FR ? activeColor : notActiveColor;
  const color2FR = !layout2FR ? notActiveColor : activeColor;

  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${params.domain}`;
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
      <header className={mainStyle.mainHeading}>
        <nav className={mainStyle.navArea}>
          <div className={mainStyle.logoArea} onClick={backToHomePage}>
            {waitLogo && (
              <div
                className={mainStyle.logoImg}
                style={{
                  backgroundImage: `url("${URL}/${ownerLogo}")`,
                }}
              ></div>
            )}
            <span className={mainStyle.textLogo}>{ownerName}</span>
          </div>
          <div className={mainStyle.actionArea}>
            {showLayout && (
              <div className={mainStyle.layoutArea}>
                <ListBullets
                  onClick={toggleLayout}
                  size={28}
                  color={color1FR}
                  weight="bold"
                />
                <SquaresFour
                  onClick={toggleLayout}
                  size={28}
                  color={color2FR}
                  weight="fill"
                />
              </div>
            )}
            <button
              onClick={togglleNavLang}
              type="button"
              className={mainStyle.btnLanguages}
            >
              {!params.lang ? "EN" : langLetter}
            </button>
            <img
              onClick={toggleNavSide}
              className={mainStyle.sideNavIcon}
              src={sideNavIcon}
              alt="icon"
            />
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navigation;
