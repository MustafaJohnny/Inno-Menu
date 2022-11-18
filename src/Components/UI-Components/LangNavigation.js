import React from "react";
import {useEffect, useState} from "react";
import Overlay from "../UI-Components/Overlay";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {controlActions} from "../Redux/ReduxStore";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import OwnerLogoName from '../UI-Components/OwnerLogoName';
import {flags} from "../entities/flags"

const LangNavigation = () => {
  const mainStyle = useSelector(
    (state) => state.controlerStyles.side_nav_style
  );
  const designNumber = useSelector((state) => state.controlerStyles.desginNumber);
  
  const navImg = useSelector((state) => state.controlerStyles.navImg);
  
  const [languages, setLanguages] = useState([]);
  
  const langFlags = languages.map((el) => {
    const flag = flags.find(fl => fl.name === el[0]);
    if (flag) {
      return {language: el[1], name: el[0], src: flag.src}
    }
  })
  
  useEffect(() => {
    let mounted = true;
    
    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/dict/lang`
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
    dispatch(controlActions.clearCart([]));
    
    window.location.reload();
  };
  
  const closeNavLang = () => {
    dispatch(controlActions.toggleNavLang());
  };
  
  return (
    <React.Fragment>
      <Overlay/>
      <div className={mainStyle.langModal ? mainStyle.langModal : mainStyle.modal}>
        {navImg && <img src={navImg} alt="background" className={mainStyle.navImg}/>}
        {designNumber === 4 && <OwnerLogoName/>}
        <nav className={mainStyle.langNav}>
          {designNumber === 4 ?
            langFlags.map((item, index) => (
              <div className={mainStyle.languageFlagContainer} key={index}>
                <img src={item.src} alt="flag" className={mainStyle.flagImg}/>
                <button className={mainStyle.langBtn}
                        onClick={getUserLanguage}
                        key={index}
                        type="button"
                        value={item.name}>
                  {item.language}
                </button>
              </div>
            )) :
            languages.map((element, index) => (
              <button
                className={mainStyle.langBtn}
                onClick={getUserLanguage}
                key={index}
                type="button"
                value={element[0]}
              >
                {element[1]}
              </button>
            ))}
        </nav>
        <button onClick={closeNavLang}
                className={mainStyle.btnLangCloseModal ? mainStyle.btnLangCloseModal : mainStyle.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default LangNavigation;
