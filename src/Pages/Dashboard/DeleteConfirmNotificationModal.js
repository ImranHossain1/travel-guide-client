import React from "react";
import { Bounce } from "react-reveal";
import { toast } from "react-toastify";

const DeleteConfirmNotificationModal = ({
  deletingNotification,
  refetch,
  setDeletingNotification,
}) => {
  const { subject, _id } = deletingNotification;
  const handleDelete = () => {
    fetch(
      ` https://travel-guide-server-production.up.railway.app/notification/${_id}`,
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
          toast.success(`Notification: ${subject} is deleted`);
          setDeletingNotification(null);
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
          id="delete-confirm-notification-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <Bounce left cascade>
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-500">
                Are you sure you want to delete {subject}
              </h3>
              <p className="py-4">
                Please Confirm if you want to delete this Message.
              </p>
              <div className="modal-action">
                <button
                  onClick={() => handleDelete()}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
                <label
                  htmlFor="delete-confirm-notification-modal"
                  className="btn btn-xs"
                >
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

export default DeleteConfirmNotificationModal;
