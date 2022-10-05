import { createSlice } from "@reduxjs/toolkit";
import sideNav1 from "../UI-Components/SideNavigation.module.css";
import sideNav2 from "../UI-Components/SideNavigation2.module.css";
import orderComp1 from "../UI-Components/OrderComponent.module.css";
import orderComp2 from "../UI-Components/OrderComponent2.module.css";
import waiterModal1 from "../PopUp-Components/WaiterModal.module.css";
import waiterModal2 from "../PopUp-Components/WaiterModa2.module.css";
import waiterImg1 from "../Icons/imgBell.png";
import waiterImg2 from "../Icons/imgBell2.png";
import ClockImg1 from "../Icons/Clock.png";
import ClockImg2 from "../Icons/Clock2.png";
import ServiceImg1 from "../Icons/Service.png";
import ServiceImg2 from "../Icons/Service2.png";
import BasketIcon1 from "../Icons/Basket.svg";
import BasketIcon2 from "../Icons/Basket2.svg";

const initialState = {
  designNumber: 0,
  side_nav_style: "",
  order_comp_style: "",
  waiter_modal_style: "",
  waiter_img: "",
  clock_img: "",
  service_img: "",
  basket_icon: "",
};

const controlStylesSlice = createSlice({
  name: "controlStyles",
  initialState,
  reducers: {
    toggleDesignStyle(state, action) {
      if (action.payload === 1) {
        state.designNumber = 1;
        state.side_nav_style = sideNav1;
        state.waiter_modal_style = waiterModal1;
        state.waiter_img = waiterImg1;
        state.clock_img = ClockImg1;
        state.service_img = ServiceImg1;
        state.basket_icon = BasketIcon1;
        state.order_comp_style = orderComp1;
      }

      if (action.payload === 2) {
        state.designNumber = 2;
        state.side_nav_style = sideNav2;
        state.waiter_modal_style = waiterModal2;
        state.waiter_img = waiterImg2;
        state.clock_img = ClockImg2;
        state.service_img = ServiceImg2;
        state.basket_icon = BasketIcon2;
        state.order_comp_style = orderComp2;
      }
    },
  },
});

export const controlerStylesReducer = controlStylesSlice.reducer;
export const controlStylesActions = controlStylesSlice.actions;
