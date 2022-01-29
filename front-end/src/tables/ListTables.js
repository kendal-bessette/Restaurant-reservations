import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { deleteTable, clearTable } from "../utils/api";

const ListTables = ({ table }) => {
  const history = useHistory();
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState("free");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentTable.reservation_id) {
      setTableStatus(
        `Occupied by reservation ID: ${currentTable.reservation_id}`
      );
    } else {
      setTableStatus("free");
    }
  }, [currentTable]);

  const handleFinish = async (event) => {
    event.preventDefault();

    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      clearTable(table.table_id)
        .then(() => {
          history.push("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      "Are you sure you want to delete this table? This cannot be undone."
    );
    if (confirmBox === true) {
      deleteTable(currentTable.table_id).catch(setError);
      history.go(0);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center"></div>
      <div className="col">
        <div
          className="card text-center text-white bg-secondary ml-2"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-body">
            <h4 className="card-title">Table: {table.table_name}</h4>
            <p className="card-text">
              Capacity - <span className="oi oi-people" /> {table.capacity}
            </p>
            {table.occupied ? (
              <>
                <div>
                  <h6
                    data-table-id-status={table.table_id}
                    className="btn btn-dark"
                  >
                    <span className="oi oi-people" /> occupied
                  </h6>
                </div>
                <button
                  data-table-id-finish={table.table_id}
                  onClick={(e) => handleFinish(e)}
                  className="btn btn-danger ml-2 px-2 oi oi-check"
                >
                  {" "}
                  Finish{" "}
                </button>
              </>
            ) : (
              <>
                <h6
                  data-table-id-status={table.table_id}
                  className="btn btn-success oi oi-check"
                >
                  {" "}
                  free{" "}
                </h6>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTables;
