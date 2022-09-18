import classes from "./MealNutrition.module.css";
import React from "react";

const MealNutrition = () => {
  return (
    <React.Fragment>
      <div className={classes.modal}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage}>Hawaiian pizza</p>
          <p className={classes.nutrition}>Nutrition per 100g:</p>
        </div>

        <div className={classes.nutritionArea}>
          <div className={classes.nutritionItem}>
            <span className={classes.nutritionProp}>Calories</span>
            <span className={classes.nutritionNum}>425</span>
          </div>
          <div className={classes.nutritionItem}>
            <span className={classes.nutritionProp}>Total Fat</span>
            <span className={`${classes.nutritionNum} ${classes.fat}`}>
              90g
            </span>
          </div>
          <div className={classes.nutritionItem}>
            <span className={classes.nutritionProp}>Carbohydrates</span>
            <span className={`${classes.nutritionNum} ${classes.carb}`}>
              30g
            </span>
          </div>
          <div className={classes.nutritionItem}>
            <span className={classes.nutritionProp}>Protein</span>
            <span className={`${classes.nutritionNum} ${classes.protein}`}>
              22g
            </span>
          </div>
        </div>

        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default MealNutrition;
