import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  deleteTable,
  updateReservationStatus,
  deleteReservationId,
} from "../utils/api";

const ListTables = ({ table }) => {
  const history = useHistory();
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState("Free");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentTable.reservation_id) {
      setTableStatus(
        `Occupied by reservation ID: ${currentTable.reservation_id}`
      );
    } else {
      setTableStatus("Free");
    }
  }, [currentTable]);

  const handleFinish = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: "finished" },
        currentTable.reservation_id
      ).catch(setError);
      deleteReservationId(currentTable.table_id)
        .then((response) => {
          setCurrentTable(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

  const handleDelete =(e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
        "Are you sure you want to delete this table? This cannot be undone."
    );
    if (confirmBox === true) {
      deleteTable(currentTable.table_id)
        .catch(setError);
        history.go(0);
    }
}

const handleCancel = (e) => {
  e.preventDefault();
}


  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <h6>Table</h6>
        </div>
        <div className="card-body">
          <p className="card-title">{table.table_name}</p>
          <p className="card-title">Capacity: {table.capacity}</p>
          {table.reservation_id ? (
            <>
              <div>
                <h6
                  data-table-id-status={table.table_id}
                  className="btn btn-dark"
                >
                  occupied
                </h6>
              </div>
              <button
                data-table-id-finish={table.table_id}
                data-reservation-id-finish={table.reservation_id}
                type="button"
                onClick={(e) => handleFinish(e)}
                className="btn btn-danger ml-2 px-2 oi oi-check"
              >
                Finish
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            ""
          )}
        </div>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
};

export default ListTables;
