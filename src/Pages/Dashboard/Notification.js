import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { Link } from "react-router-dom";
import PageTitle from "../Shared/PageTitle";
import { Zoom } from "react-reveal";
const Notification = () => {
  const { id } = useParams();
  const url = ` https://travel-guide-server-production.up.railway.app/notification/${id}`;

  const { data: notification, isLoading } = useQuery(["notification", id], () =>
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
  const { senderEmail, subject, body } = notification;
  return (
    <div className="card w-full m-12 p-12 bg-neutral text-neutral-content flex justify-center items-center">
      <Zoom top cascade>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{subject}</h2>
          <p>Email by: {senderEmail}</p>
          <div className="card-actions flex flex-col items-center">
            <p>{body}</p>
            <button className="btn btn-primary my-5">
              {" "}
              <Link to="/dashboard/notifications">Back to Notifications</Link>
            </button>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default Notification;
