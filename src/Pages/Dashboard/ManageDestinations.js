import React, { useState } from "react";
import { useQuery } from "react-query";
import { Bounce, Fade } from "react-reveal";
import Loading from "../Shared/Loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DestinationRow from "./DestinationRow";

const ManageDestinations = () => {
  const [deletingDestination, setDeletingDestination] = useState(null);
  const {
    data: destinations,
    isLoading,
    refetch,
  } = useQuery("manageDestination", () =>
    fetch("https://travel-guide-server-production.up.railway.app/destination", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full mx-5 mb-12">
      <Fade top cascade>
        <h2 className="text-5xl font-bold text-primary text-center my-5">
          Total Destinations
        </h2>
      </Fade>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <Bounce right cascade>
                <th></th>
                <th>Avatar</th>
                <th>Job</th>
                <th>Speciality</th>
                <th>Action</th>
              </Bounce>
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination, index) => (
              <DestinationRow
                key={destination._id}
                destination={destination}
                index={index}
                refetch={refetch}
                setDeletingdestination={setDeletingDestination}
              ></DestinationRow>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDestination && (
        <DeleteConfirmModal
          deletingDestination={deletingDestination}
          refetch={refetch}
          setDeletingDestination={setDeletingDestination}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default ManageDestinations;
