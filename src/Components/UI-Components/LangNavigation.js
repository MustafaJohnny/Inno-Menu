import React from "react";
import Overlay from "../UI-Components/Overlay";
import classes from "./SideNavigation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const LangNavigation = () => {
  const [languages, setLanguages] = useState([]);
  const serverAPI = useSelector((state) => state.controler.serverAPI);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}:8000/api/v1/dict/lang`
      );

      if (mounted) {
        // Converting the received objects {key: valye} to an array of [key, valye].
        const convertLanguages = request.data
          .map((ele) => Object.entries(ele))
          .map((ele) => ele[0]);

        setLanguages(convertLanguages);
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, []);

  const params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Getting the user preferred language.
  const getUserLanguage = (event) => {
    event.preventDefault();

    dispatch(controlActions.getUserLanguage(event.target.value));

    const userLang = event.target.value;

    navigate(`/menu/${params.domain}/${params.NumOfTable}/${userLang}`, {
      replace: true,
    });

    dispatch(controlActions.toggleNavLang());
    dispatch(controlActions.setInitialSlide(0));

    window.location.reload();
  };

  const closeNavLang = () => {
    dispatch(controlActions.toggleNavLang());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <nav className={classes.langNav}>
          {languages.map((element, index) => (
            <button
              className={classes.langBtn}
              onClick={getUserLanguage}
              key={index}
              type="button"
              value={element[0]}
            >
              {element[1]}
            </button>
          ))}
        </nav>

        <button onClick={closeNavLang} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default LangNavigation;
