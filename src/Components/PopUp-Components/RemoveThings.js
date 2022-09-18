import classes from "./RemoveThings.module.css";
import React from "react";
import { useParams } from "react-router-dom";

const RemoveThings = () => {
  const params = useParams();
  console.log(params);
  return (
    <React.Fragment>
      <div className={classes.modal}>
        <div className={classes.MessageArea}>
          <p className={classes.theMessage}>Remove ingredients</p>
        </div>

        <div className={classes.ingredientsArea}>
          <span className={classes.ingredient}>Papper</span>
          <span className={classes.ingredient}>Pickles</span>
          <span className={classes.ingredient}>Onion</span>
          <span className={classes.ingredient}>Onion</span>
          <span className={classes.ingredient}>Onion</span>
          <span className={classes.ingredient}>Onion</span>
        </div>

        <div className={classes.orders}>
          <span className={classes.cancel}>CANCEL</span>
          <span className={classes.save}>SAVE</span>
        </div>
        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default RemoveThings;
