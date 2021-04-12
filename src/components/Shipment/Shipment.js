import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProceedPayment from "../ProceedPayment/ProceedPayment";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    };

    fetch("http://localhost:3002/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          // alert('your order placed successfully');
        }
      });
  };

  console.log(watch("example"));

  return (
    <div className="row">
      <div
        style={{ display: shippingData ? "none" : "block" }}
        className="col-md-6"
      >
        <form className="custom" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.displayName}
            ref={register({ required: true })}
          />
          {errors.name && <span className="error">This field is required</span>}
          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
          />
          {errors.email && (
            <span className="error">This field is required</span>
          )}
          <input name="address" ref={register({ required: true })} />
          {errors.address && (
            <span className="error">This field is required</span>
          )}
          <input name="number" ref={register({ required: true })} />
          {errors.number && (
            <span className="error">This field is required</span>
          )}
          <input type="submit"  />
        </form>
      </div>

      <div
        style={{ display: shippingData ? "block" : "none" }}
        className="col-md-6"
      >
        <div className="m-5">
          <ProceedPayment handlePayment={handlePaymentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Shipment;
