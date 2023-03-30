import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L7ggVFbphkgAKK4OPhZ0A288iRm9B6d1vb4E06DO2TP5RMWKrVWyYkZZKjJWMMl79Ta2ERKd65xeZ96p9PbKhYf00biEstqRp"
);
const Payment = () => {
  const { id } = useParams();
  console.log(id);
  const url = `https://travel-guide-server-production.up.railway.app/booking/${id}`;
  const { data: booking, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(booking);
  return (
    <div className="w-full">
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100 my-12 mx-auto">
        <div className="card-body">
          <p className="text-success font-bold">Hello, {booking.userName}</p>
          <h2 className="card-title">Please pay for {booking.bookingName}</h2>
          <p>
            Your booking:{" "}
            <span className="text-orange-700">{booking.date}</span>{" "}
          </p>
          <p>please pay: ${booking.cost}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
