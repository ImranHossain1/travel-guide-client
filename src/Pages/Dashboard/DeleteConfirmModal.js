import React from "react";
import { Bounce } from "react-reveal";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({
  deletingDestination,
  refetch,
  setDeletingDestination,
}) => {
  const { destinationName, _id } = deletingDestination;
  const handleDelete = () => {
    fetch(
      `https://travel-guide-server-production.up.railway.app/destination/${_id}`,
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
          toast.success(`Destintion: ${destinationName} is deleted`);
          setDeletingDestination(null);
          refetch();
        }
      });
    //console.log(_id)
  };
  return (
    <div>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <Bounce right cascade>
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-500">
              Are you sure you want to delete {destinationName}
            </h3>
            <p className="py-4">
              Make sure if you delete this destination would create some issue
              while people want to book.
            </p>
            <div className="modal-action">
              <button
                onClick={() => handleDelete()}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
              <label htmlFor="delete-confirm-modal" className="btn btn-xs">
                Cancel
              </label>
            </div>
          </div>
        </Bounce>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
