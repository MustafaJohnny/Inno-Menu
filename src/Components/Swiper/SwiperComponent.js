import React from "react";
import { EffectCoverflow, Pagination } from "swiper";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "swiper/css/pagination";
import "./Pagination.css";

const SwiperComponent = () => {
  const mainStyle = useSelector((state) => state.controlerStyles.swiper_style);

  const restaurantsMenus = useSelector(
    (state) => state.controler.restaurants_menus
  );

  const designNumber = useSelector(
    (state) => state.controlerStyles.desginNumber
  );

  const initialSlide = useSelector((state) => state.controler.initial_slide);

  ///////////////////////////////////////////////////////////////////////////////////
  const [activeCarousel, setActiveCarousel] = useState("");
  const firstCarousel = useSelector((state) => state.controler.first_carousel);
  const activeID = !activeCarousel ? firstCarousel.toString() : activeCarousel;
  //////////////////////////////////////////////////////////////////////////////////

  // Main get requst to server to recevie all menus depending on the showing ID.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(controlActions.getSelectedItems([]));

    let mounted = true;

    setTimeout(() => {
      const getData = async () => {
        const request = await axios.get(
          `${process.env.REACT_APP_URL}/api/v1/client/AllMenuListWithCategory/${activeID}`
        );

        if (mounted) {
          dispatch(controlActions.getAllRestaurantsData(request.data));

          // If we have only one restaurent, only one menu and only one category then we send a requst to get the items of that one category instantly!..
          if (
            request.data.menu.length === 1 &&
            request.data.menu[0].categorymenu.length === 1
          ) {
            const lonelyCattgory = request.data.menu[0].categorymenu[0].id;

            let mounted = true;

            const getData = async () => {
              const request = await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/client/CategoryWhisProduct/${lonelyCattgory}`
              );

              if (mounted) {
                dispatch(controlActions.getSelectedItems(request.data));
                dispatch(controlActions.toggleHideItems(true));
                dispatch(controlActions.toggleShowLayout(false));
              }
            };

            getData();
          }

          // Some doubts about this logic.
          if (
            request.data.menu.length !== 1 &&
            request.data.menu[0].categorymenu.length !== 1
          ) {
            dispatch(controlActions.getSelectedItems([]));
            dispatch(controlActions.toggleHideItems(false));
            dispatch(controlActions.toggleShowLayout(true));
          }
          // Some doubts about this logic.
        }
      };

      getData();
    }, 600);

    return () => {
      mounted = false;
    };
  }, [activeID, initialSlide]);

  /////////////////////////////////////////////////////////////////////////////
  const ownerServices = useSelector((state) => state.controler.owner_service);
  const ownerRestaurants = useSelector(
    (state) => state.controler.owner_restaurants
  );
  //////////////////////////////////////////////////////////////////////////
  const packageLength = ownerRestaurants.length + ownerServices.length;
  const carouselState = packageLength <= 1 ? false : true;
  /////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////
  const getActiveCarousel = (event) => {
    if (!event.slides[event.activeIndex].className.includes("services")) {
      dispatch(controlActions.getServiceItems([]));
      dispatch(controlActions.setInitialSlide(event.activeIndex));
      dispatch(controlActions.toggleHideItems(true));
      setActiveCarousel(event.slides[event.activeIndex].id);

      if (restaurantsMenus.length > 1) {
        dispatch(controlActions.toggleShowLayout(true));
      }
    }
    ///////////////////////////////////////////////////////////////////////////
    if (event.slides[event.activeIndex].className.includes("services")) {
      const servicesID = event.slides[event.activeIndex].id;

      let mounted = true;

      const getData = async () => {
        const request = await axios.get(
          `${process.env.REACT_APP_URL}/api/v1/client/uslugiList/${servicesID}`
        );

        if (mounted) {
          dispatch(controlActions.getServiceItems(request.data));
          dispatch(controlActions.toggleShowLayout(false));
          dispatch(controlActions.toggleHideItems(false));
        }
      };

      getData();
    }
  };
  ///////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  const params = useParams();
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${params.domain}`;
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <Swiper
        pagination={
          designNumber === 4 && {
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"></span>';
            },
          }
        }
        onSlideChange={getActiveCarousel}
        watchSlidesProgress={true}
        initialSlide={initialSlide}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination]}
        className={mainStyle.swiperEl}
      >
        {carouselState &&
          ownerRestaurants.map((ele) => (
            <SwiperSlide
              style={{ backgroundImage: `url("${URL}/${ele.image}")` }}
              className={mainStyle.swiperSlide}
              key={ele.id}
              id={ele.id}
            >
              <div className={mainStyle.packageArea}>
                <span className={mainStyle.packageName}>{ele.name_rest}</span>
              </div>
            </SwiperSlide>
          ))}

        {carouselState &&
          ownerServices.map((ele) => (
            <SwiperSlide
              style={{ backgroundImage: `url("${URL}/${ele.image}")` }}
              className={`${mainStyle.swiperSlide} ${mainStyle.services}`}
              key={ele.id + 5}
              id={ele.id}
            >
              <div className={mainStyle.packageArea}>
                <span className={mainStyle.packageName}>
                  {ele.name_service}
                </span>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </React.Fragment>
  );
};

export default SwiperComponent;
