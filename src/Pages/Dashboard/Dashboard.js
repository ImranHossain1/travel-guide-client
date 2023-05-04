import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import userImg from "../../assets/user.png";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import useNotifications from "../../hooks/useNotifications";
import { Bounce, Zoom } from "react-reveal";
import { useState } from "react";
import { signOut } from "firebase/auth";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState();
  const [userData, setUserData] = useState([]);
  const [admin] = useAdmin(user);
  //const [messageUpdate, setMessageUpdate] = useState(false)
  const navigate = useNavigate();
  let count = 0;
  useEffect(() => {
    if (user) {
      fetch(
        `https://travel-guide-server-jex7.onrender.com/user/${user.email}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          //console.log('res',res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        });
    }
    if (user) {
      fetch("https://travel-guide-server-jex7.onrender.com/notifications", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          //isLoading(false)
        });
    }
  }, [user]);
  /* useEffect(()=>{
        
    },[user]) */
  messages?.forEach((message) => {
    if (message.unread) {
      count++;
    }
  });
  //console.log(user)
  //console.log(messages)
  return (
    <div className="drawer drawer-mobile  ">
      <input id="myDrawerDashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  mt-5 ml-2 ">
        {/* <!-- Page content here --> */}
        <label
          htmlFor="myDrawerDashboard"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <div className="flex justify-center  ">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="myDrawerDashboard" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content ">
          {/* <!-- Sidebar content here --> */}
          <div className="avatar flex flex-col items-center">
            <Zoom top cascade>
              <div className="w-24 rounded-full pics">
                <img src={userData?.image || userImg} alt={user.displayName} />
              </div>
            </Zoom>
            <Bounce left cascade>
              <p>
                <li>{user.displayName}</li>
              </p>
            </Bounce>
          </div>
          <Bounce left cascade>
            <li>
              <Link to="/dashboard">My Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/booking">My Bookings</Link>
            </li>
            <li>
              <Link to="/dashboard/addImage">Add Image</Link>
            </li>
            <li>
              <Link to="/dashboard/addReview">Add Review</Link>
            </li>
          </Bounce>
          {admin && (
            <>
              <Bounce right cascade>
                <li>
                  <Link to="/dashboard/users">Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/addDestination">
                    Add New Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manageDestinations">
                    Manage Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/notifications">
                    Notifications{" "}
                    {count !== 0 && (
                      <span className="text-red-500">({count})</span>
                    )}
                  </Link>
                </li>
              </Bounce>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
