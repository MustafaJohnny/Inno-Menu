import classes from "./MealSizeModal.module.css";
import React from "react";

const MealSize = () => {
  return (
    <React.Fragment>
      <div className={classes.modal}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage}>Pizza Size</p>
        </div>

        <div className={classes.mealSizes}>
          <div className={classes.wholeSize}>
            <input type="radio" className={classes.radioMeal} name="meal" />
            <span className={classes.sizeText}>Small (20 cm)</span>
          </div>
          <div className={classes.wholeSize}>
            <input type="radio" className={classes.radioMeal} name="meal" />
            <span className={classes.sizeText}>Small (20 cm)</span>
          </div>
          <div className={classes.wholeSize}>
            <input type="radio" className={classes.radioMeal} name="meal" />
            <span className={classes.sizeText}>Small (20 cm)</span>
          </div>
        </div>

        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default MealSize;
