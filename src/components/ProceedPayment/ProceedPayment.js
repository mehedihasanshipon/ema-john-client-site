import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimplePayment from "./SimplePayment";
import SplitCardForm from "./SplitCardForm";

const stripePromise = loadStripe(
  "pk_test_51Ie1erC3sA7TyyiGWcvo3tPjM4guckRPPB0LQXLLfc9ghZ4ricVfBhUugsfrQ3wB2Ujlqx4BWwNgf6xoDI7MGhwU007NmWN7Pb"
);

const ProceedPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimplePayment handlePayment={handlePayment} />
      {/* <SplitCardForm /> */}
    </Elements>
  );
};

export default ProceedPayment;
