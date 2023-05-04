import React from "react";
import { useQuery } from "react-query";
import { Bounce, Fade } from "react-reveal";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle";
import UserRow from "./UserRow";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://travel-guide-server-jex7.onrender.com/user", {
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
    <div className=" w-full mx-12 mb-12">
      <PageTitle title="Users"></PageTitle>
      <Fade top cascade>
        <h2 className="text-5xl font-bold text-primary text-center my-5">
          All Users
        </h2>
      </Fade>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <Bounce right cascade>
                <th>NO:</th>
                <th>Name</th>
                <th>Role</th>
              </Bounce>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <UserRow
                index={index}
                key={user._id}
                user={user}
                refetch={refetch}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
