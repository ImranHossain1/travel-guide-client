import React from "react";
import { Bounce } from "react-reveal";
import { toast } from "react-toastify";

const UserRow = ({ user, refetch, index }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    fetch(`https://travel-guide-server-jex7.onrender.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to make an Admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.result.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
        }
      });
  };
  return (
    <tr>
      <Bounce left cascade>
        <th>{index + 1}</th>
        <td>{email}</td>
        <td>
          {role !== "admin" ? (
            <button className="btn btn-xs" onClick={makeAdmin}>
              Make Admin
            </button>
          ) : (
            <p className="text-success font-bold">Admin</p>
          )}
        </td>
      </Bounce>
    </tr>
  );
};

export default UserRow;
