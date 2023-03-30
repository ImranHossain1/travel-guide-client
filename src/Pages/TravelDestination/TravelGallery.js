import React from "react";
import { useQuery } from "react-query";
import { Bounce, LightSpeed } from "react-reveal";
import Loading from "../Shared/Loading";

const TravelGallery = ({ destinationName }) => {
  const {
    data: images,
    isLoading,
    refetch,
  } = useQuery(["images"], () =>
    fetch(
      `https://travel-guide-server-production.up.railway.app/destinationPhoto/${destinationName}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    <Loading></Loading>;
  }
  return (
    <div>
      <LightSpeed top cascade>
        <div className="flex items-center justify-center text-5xl font-bold text-primary text-center my-12">
          <h2 className=" mr-3">Explore More About</h2>
          <h2>
            <span className="text-orange-400 my-12">{destinationName}</span>{" "}
          </h2>
        </div>
      </LightSpeed>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-5 lg:ml-12">
        {images?.map((photo) => {
          return (
            <div
              key={photo._id}
              className="card lg:max-w-lg md:max-h-64 bg-base-100 md:shadow-xl md:mr-5 pics"
            >
              <Bounce top cascade>
                <img src={photo.image} alt="" className="w-100 rounded-lg" />
              </Bounce>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TravelGallery;
