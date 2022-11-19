import {createSlice} from "@reduxjs/toolkit";
import sideNav1 from "../UI-Components/SideNavigation.module.css";
import sideNav2 from "../UI-Components/SideNavigation2.module.css";
import sideNav3 from "../UI-Components/SideNavigation3.module.css";
import sideNav4 from "../UI-Components/SideNavigation4.module.css";
import sideNav5 from "../UI-Components/SideNavigation5.module.css";

import orderComp1 from "../UI-Components/OrderComponent.module.css";
import orderComp2 from "../UI-Components/OrderComponent2.module.css";
import orderComp3 from "../UI-Components/OrderComponent3.module.css";
import orderComp4 from "../UI-Components/OrderComponent4.module.css";
import orderComp5 from "../UI-Components/OrderComponent5.module.css";

import mainPages1 from "../Pages/PagesStyle.module.css";
import mainPages2 from "../Pages/PagesStyle2.module.css";
import mainPages3 from "../Pages/PagesStyle3.module.css";
import mainPages4 from "../Pages/PagesStyle4.module.css";
import mainPages5 from "../Pages/PagesStyle5.module.css";

import waiterModal1 from "../PopUp-Components/WaiterModal.module.css";
import waiterModal2 from "../PopUp-Components/WaiterModa2.module.css";
import waiterModal3 from "../PopUp-Components/WaiterModal3.module.css";
import waiterModal4 from "../PopUp-Components/WaiterModal4.module.css";
import waiterModal5 from "../PopUp-Components/WaiterModal5.module.css";

import swiper1 from "../Swiper/SwiperComponent.module.css";
import swiper2 from "../Swiper/SwiperComponent2.module.css";
import swiper3 from "../Swiper/SwiperComponent3.module.css";
import swiper4 from "../Swiper/SwiperComponent4.module.css";
import swiper5 from "../Swiper/SwiperComponent5.module.css";

import SideNavIcon1 from "../Icons/SideNav.svg";
import SideNavIcon2 from "../Icons/SideNav2.svg";
import SideNavIcon3 from "../Icons/SideNav3.svg";
import SideNavIcon4 from "../Icons/SideNav4.svg";
import SideNavIcon5 from "../Icons/SideNav5.svg";

import waiterImg1 from "../Icons/imgBell.png";
import waiterImg2 from "../Icons/imgBell2.png";
import waiterImg4 from "../Icons/imgBell4.png";

import OrderReadyImg1 from "../Icons/Heart.png";
import OrderReadyImg2 from "../Icons/Heart2.png";
import OrderReadyImg4 from "../Icons/Heart4.png";

import BasketImg1 from "../Icons/CartImg.png";
import BasketImg2 from "../Icons/CartImg2.png";
import BasketImg3 from "../Icons/CartImg3.png";
import BasketImg4 from "../Icons/CartImg4.png";
import BasketImg5 from "../Icons/CartImg5.png";

import ClockImg1 from "../Icons/Clock.png";
import ClockImg2 from "../Icons/Clock2.png";
import ClockImg4 from "../Icons/Clock4.png";

import ServiceImg1 from "../Icons/Service.png";
import ServiceImg2 from "../Icons/Service2.png";
import ServiceImg4 from "../Icons/Service4.png";

import BasketIcon1 from "../Icons/Basket.svg";
import BasketIcon2 from "../Icons/Basket2.svg";
import BasketIcon3 from "../Icons/Basket3.svg";
import BasketIcon4 from "../Icons/Basket4.svg";
import BasketIcon5 from "../Icons/Basket5.svg";

import Arrow1 from "../Icons/ArrowBack.svg";
import Arrow2 from "../Icons/ArrowBack2.svg";
import Arrow3 from "../Icons/ArrowBack3.svg";
import Arrow4 from "../Icons/ArrowBack4.svg";
import Arrow5 from "../Icons/ArrowBack5.svg";

import Bell1 from "../Icons/Bell.svg";
import Bell2 from "../Icons/Bell2.svg";
import Bell3 from "../Icons/Bell3.svg";
import Bell4 from "../Icons/Bell4.svg";
import Bell5 from "../Icons/Bell5.svg";

import navImg4 from "../Images/NavImgX4.png";

const initialState = {
  desginNumber: 0,
  side_nav_style: "",
  order_comp_style: "",
  waiter_modal_style: "",
  waiter_img: "",
  basket_img: "",
  order_ready_img: "",
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
  titleItemBtn: "",
  serviceOrderBtn: "",
  navImg: "",
  body_height: "",
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
        state.basket_img = BasketImg1;
        state.order_ready_img = OrderReadyImg1;
        state.titleItemBtn = "Добавить";
        state.serviceOrderBtn = "Заказать";
        state.navImg = "";
        state.body_height = "";
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
        state.basket_img = BasketImg2;
        state.order_ready_img = OrderReadyImg2;
        state.titleItemBtn = "Добавить";
        state.serviceOrderBtn = "Заказать";
        state.navImg = "";
        state.body_height = "";
      }
      
      if (action.payload === 3) {
        state.desginNumber = 3;
        state.side_nav_style = sideNav3;
        state.waiter_modal_style = waiterModal3;
        state.waiter_img = "";
        state.clock_img = "";
        state.service_img = "";
        state.basket_icon = BasketIcon3;
        state.order_comp_style = orderComp3;
        state.bell_icon = Bell3;
        state.side_nav_icon = SideNavIcon3;
        state.layout_active_color = "#454545";
        state.layout_notActive_color = "#E7C61A";
        state.swiper_style = swiper3;
        state.pages_style = mainPages3;
        state.arrow_back = Arrow3;
        state.body_color = "#1A1A1A";
        state.basket_img = BasketImg3;
        state.order_ready_img = "";
        state.titleItemBtn = "+";
        state.serviceOrderBtn = "Заказать";
        state.navImg = "";
        state.body_height = "";
      }
      
      if (action.payload === 4) {
        state.desginNumber = 4;
        state.side_nav_style = sideNav4;
        state.waiter_modal_style = waiterModal4;
        state.waiter_img = waiterImg4;
        state.clock_img = ClockImg4;
        state.service_img = ServiceImg4;
        state.basket_icon = BasketIcon4;
        state.order_comp_style = orderComp4;
        state.bell_icon = Bell4;
        state.side_nav_icon = SideNavIcon4;
        state.layout_active_color = "";
        state.layout_notActive_color = "";
        state.swiper_style = swiper4;
        state.pages_style = mainPages4;
        state.arrow_back = Arrow4;
        state.body_color = "#AA1C1E"
        state.basket_img = BasketImg4;
        state.order_ready_img = OrderReadyImg4;
        state.titleItemBtn = "+";
        state.serviceOrderBtn = "+";
        state.navImg = navImg4;
        state.body_height = "";
      }
  
      if (action.payload === 5) {
        state.desginNumber = 5;
        state.side_nav_style = sideNav5;
        state.waiter_modal_style = waiterModal5;
        state.waiter_img = "";
        state.clock_img = "";
        state.service_img = "";
        state.basket_icon = BasketIcon5;
        state.order_comp_style = orderComp5;
        state.bell_icon = Bell5;
        state.side_nav_icon = SideNavIcon5;
        state.layout_active_color = "#FFFFFF";
        state.layout_notActive_color = "#48BBC5";
        state.swiper_style = swiper5;
        state.pages_style = mainPages5;
        state.arrow_back = Arrow5;
        state.body_color ="linear-gradient(169.79deg, #2A90A1 3.49%, #6CCDBA 95.64%)";
        state.basket_img = BasketImg5;
        state.order_ready_img = "";
        state.titleItemBtn = "+";
        state.serviceOrderBtn = "+";
        state.navImg = "";
        state.body_height = "100vh";
      }
    },
  },
});

export const controlerStylesReducer = controlStylesSlice.reducer;
export const controlStylesActions = controlStylesSlice.actions;
