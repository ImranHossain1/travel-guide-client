import React from "react";
import { Bounce } from "react-reveal";
import { toast } from "react-toastify";

const BookingDeleteModal = ({ deleteBooking, setDeleteBooking, refetch }) => {
  const { bookingName, _id } = deleteBooking;
  const handleDelete = () => {
    fetch(
      `https://travel-guide-server-production.up.railway.app/booking/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success(`Booking: ${bookingName} is deleted`);
          setDeleteBooking(null);
          refetch();
        }
      });
    //console.log(_id)
  };
  return (
    <div>
      <Bounce left cascade>
        <input
          type="checkbox"
          id="delete-booking-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <Bounce left cascade>
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-500">
                Are you sure you want to delete {bookingName}
              </h3>
              <p className="py-4">Are You sure to delete this booking?</p>
              <div className="modal-action">
                <button
                  onClick={() => handleDelete()}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
                <label htmlFor="delete-booking-modal" className="btn btn-xs">
                  Cancel
                </label>
              </div>
            </div>
          </Bounce>
        </div>
      </Bounce>
    </div>
  );
};

export default BookingDeleteModal;
