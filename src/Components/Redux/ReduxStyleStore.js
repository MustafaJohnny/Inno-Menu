import { createSlice } from "@reduxjs/toolkit";
import sideNav1 from "../UI-Components/SideNavigation.module.css";
import sideNav2 from "../UI-Components/SideNavigation2.module.css";

import orderComp1 from "../UI-Components/OrderComponent.module.css";
import orderComp2 from "../UI-Components/OrderComponent2.module.css";

import mainPages1 from "../Pages/PagesStyle.module.css";
import mainPages2 from "../Pages/PagesStyle2.module.css";

import waiterModal1 from "../PopUp-Components/WaiterModal.module.css";
import waiterModal2 from "../PopUp-Components/WaiterModa2.module.css";

import swiper1 from "../Swiper/SwiperComponent.module.css";
import swiper2 from "../Swiper/SwiperComponent2.module.css";

import SideNavIcon1 from "../Icons/SideNav.svg";
import SideNavIcon2 from "../Icons/SideNav2.svg";

import waiterImg1 from "../Icons/imgBell.png";
import waiterImg2 from "../Icons/imgBell2.png";

import ClockImg1 from "../Icons/Clock.png";
import ClockImg2 from "../Icons/Clock2.png";

import ServiceImg1 from "../Icons/Service.png";
import ServiceImg2 from "../Icons/Service2.png";

import BasketIcon1 from "../Icons/Basket.svg";
import BasketIcon2 from "../Icons/Basket2.svg";

import Arrow1 from "../Icons/ArrowBack.svg";
import Arrow2 from "../Icons/ArrowBack2.svg";

import Bell1 from "../Icons/Bell.svg";
import Bell2 from "../Icons/Bell2.svg";

const initialState = {
  desginNumber: 0,
  side_nav_style: "",
  order_comp_style: "",
  waiter_modal_style: "",
  waiter_img: "",
  clock_img: "",
  service_img: "",
  basket_icon: "",
  bell_icon: "",
  side_nav_icon: "",
  layout_active_color: "",
  layout_notActive_color: "",
  swiper_style: "",
  pages_style: "",
  arrow_back: "",
  body_color: "",
};

const controlStylesSlice = createSlice({
  name: "controlStyles",
  initialState,
  reducers: {
    toggleDesignStyle(state, action) {
      if (action.payload === 1) {
        state.desginNumber = 1;
        state.side_nav_style = sideNav1;
        state.waiter_modal_style = waiterModal1;
        state.waiter_img = waiterImg1;
        state.clock_img = ClockImg1;
        state.service_img = ServiceImg1;
        state.basket_icon = BasketIcon1;
        state.order_comp_style = orderComp1;
        state.bell_icon = Bell1;
        state.side_nav_icon = SideNavIcon1;
        state.layout_active_color = "#27272a";
        state.layout_notActive_color = "#a1a1aa";
        state.swiper_style = swiper1;
        state.pages_style = mainPages1;
        state.arrow_back = Arrow1;
        state.body_color = "#fff";
      }

      if (action.payload === 2) {
        state.desginNumber = 2;
        state.side_nav_style = sideNav2;
        state.waiter_modal_style = waiterModal2;
        state.waiter_img = waiterImg2;
        state.clock_img = ClockImg2;
        state.service_img = ServiceImg2;
        state.basket_icon = BasketIcon2;
        state.order_comp_style = orderComp2;
        state.bell_icon = Bell2;
        state.side_nav_icon = SideNavIcon2;
        state.layout_active_color = "#1F1F1F";
        state.layout_notActive_color = "#D5B118";
        state.swiper_style = swiper2;
        state.pages_style = mainPages2;
        state.arrow_back = Arrow2;
        state.body_color = "#feda3e";
      }
    },
  },
});

export const controlerStylesReducer = controlStylesSlice.reducer;
export const controlStylesActions = controlStylesSlice.actions;
