import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show_lang_nav: false,
  show_side_nav: false,
  show_service: false,
  soon_service: false,
  show_waiter: false,
  waiter_soon: false,
  layout_oneFR: true,
  layout_twoFR: false,
  remove_arrow: false,
  show_layout: true,
  hide_items: false,
  initial_slide: 0,
  first_carousel: 50,
  owner_restaurants: [],
  restaurants_menus: [],
  owner_service: [],
  service_items: [],
  categories_item: [],
  selected_items: [],
  items_heading: "",
  owner_name: "name",
  owner_logo: "Logo",
  user_language: "EN",
  serverAPI: "innomenu.ru",
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    toggleNavLang(state) {
      state.show_lang_nav = !state.show_lang_nav;
    },

    hideNavLang(state) {
      state.show_lang_nav = false;
    },

    toggleNavSide(state) {
      state.show_side_nav = !state.show_side_nav;
    },

    toggleLayoutPattern(state) {
      state.layout_oneFR = !state.layout_oneFR;
      state.layout_twoFR = !state.layout_twoFR;
    },

    toggleShowLayout(state, action) {
      state.show_layout = action.payload;
    },

    toggleShowService(state) {
      state.show_service = !state.show_service;
    },

    toggleSoonService(state) {
      state.soon_service = !state.soon_service;
    },

    toggleShowWaiter(state) {
      state.show_waiter = !state.show_waiter;
    },

    toggleWaiterSoon(state) {
      state.waiter_soon = !state.waiter_soon;
    },

    toggleRemoveArrow(state) {
      state.remove_arrow = true;
    },

    toggleHideItems(state, action) {
      state.hide_items = action.payload;
    },

    getAllOwnerData(state, action) {
      state.owner_name = action.payload.owner_name;
      state.owner_logo = action.payload.logo;
      state.owner_restaurants = action.payload.rest;
      state.owner_service = action.payload.service;
      state.first_carousel = action.payload.rest[0].id;
    },

    getAllRestaurantsData(state, action) {
      state.restaurants_menus = action.payload.menu;
    },

    getUserLanguage(state, action) {
      state.user_language = action.payload;
    },

    getCategoriesItem(state, action) {
      state.categories_item = action.payload;
    },

    getSelectedItems(state, action) {
      state.selected_items = action.payload;
    },

    getItemsHeading(state, action) {
      state.items_heading = action.payload;
    },

    getServiceItems(state, action) {
      state.service_items = action.payload;
    },

    setInitialSlide(state, action) {
      state.initial_slide = action.payload;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
