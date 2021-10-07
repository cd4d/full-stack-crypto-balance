import React from "react";
import emptyBalance from "../../images/undraw_pie_chart.svg";
export default function EmptyBalance() {
  return (
    <div className="row mt-3">
      <h4>Your portfolio is empty, add a coin or two to start.</h4>
      <img className="w-50 mt-2" src={emptyBalance} alt="balance is empty" />
    </div>
  );
}
