import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Toggle States //
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
  show_bell: false,
  show_order_com: false,
  initial_slide: 0,
  first_carousel: 50,
  user_num_of_table: "",
  user_domain: "",
  // Data States //
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
  menu_currency: "$",
  serverAPI: "innomenu.ru",
  // Cart States //
  cart_items: [],
  cart_total_quantity: 0,
  cart_total_amount: 0,
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    // Toggle Functions //

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

    // Data Handling Functions //

    getAllOwnerData(state, action) {
      state.owner_name = action.payload.owner_name;
      state.owner_logo = action.payload.logo;
      state.owner_restaurants = action.payload.rest;
      state.owner_service = action.payload.service;
      state.first_carousel = action.payload.rest[0].id;
      state.show_bell = action.payload.garson_call;
      state.show_order_com = action.payload.menu_order;
      state.menu_currency = action.payload.money;
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

    getUserDomainAndNumOfTable(state, action) {
      state.user_num_of_table = action.payload.NumOfTable;
      state.user_domain = action.payload.domain;
    },

    setInitialSlide(state, action) {
      state.initial_slide = action.payload;
    },

    // Cart Functions //

    addToCart(state, action) {
      // We get the index of the chosen meal by the user
      const mealIndex = state.cart_items.findIndex(
        (meal) => meal.id === action.payload.id
      );

      // When the meal is already added we just incress the amout of it.
      if (mealIndex >= 0) {
        state.cart_items[mealIndex].cartQuantity += 1;
      }

      // When the chosen meal is new we just push it to the cart state with quantity of 1.
      if (mealIndex < 0) {
        const tempMeal = { ...action.payload, cartQuantity: 1 };
        state.cart_items.push(tempMeal);
      }
    },

    removeFromCart(state, action) {
      const nextCartMeal = state.cart_items.filter(
        (meal) => meal.id !== action.payload.id
      );

      state.cart_items = nextCartMeal;
    },

    decreaseMealQuantity(state, action) {
      const itemIndex = state.cart_items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart_items[itemIndex].cartQuantity > 1) {
        state.cart_items[itemIndex].cartQuantity -= 1;
      } else if (state.cart_items[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart_items.filter(
          (item) => item.id !== action.payload.id
        );

        state.cart_items = nextCartItems;
      }
    },

    getTotal(state) {
      let { total, quantity } = state.cart_items.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cart_total_quantity = quantity;
      state.cart_total_amount = total;
    },

    clearCart(state, action) {
      state.cart_items = action.payload;
    },
  },
});

export const controlerReducer = controlSlice.reducer;
export const controlActions = controlSlice.actions;
