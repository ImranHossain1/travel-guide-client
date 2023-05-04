import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle";
import Review from "./Review.";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery(["reviews"], () =>
    fetch("https://travel-guide-server-jex7.onrender.com/review").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-12">
      <PageTitle title="Reviews"></PageTitle>
      <h3 className="text-5xl font-bold text-primary text-center">
        Travelers Review
      </h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 my-5 lg:ml-5 ">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
