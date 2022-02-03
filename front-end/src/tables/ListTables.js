import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { clearTable, deleteTable } from "../utils/api";

const ListTables = ({ table }) => {
  const history = useHistory();
  const [currentTable] = useState(table);
  const [, setTableStatus] = useState("free");

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

  function handleDelete(e) {
    e.preventDefault(); 
    if (window.confirm(
      "Delete this table? You will not be able to recover it."
      )
      ) {
        deleteTable(table.table_id)
        history.go(0)
        .catch((error) => console.error(error))
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center"></div>
      <div className="col">
        <div
          className="card text-center ml-2"
          style={{ maxWidth: "20rem", minHeight:"14rem", maxHeight: "18rem" }}
        >
          <h4 className="card-header">{table.table_name}</h4>
          <div className="card-body">
            <p className="card-text">
              Capacity: <span className="oi oi-people" /> {table.capacity}
            </p>
            {table.occupied ? (
              <>
                <div>
                  <h4
                    data-table-id-status={table.table_id}
                    className="badge badge-pill badge-warning"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Occupied
                  </h4>
                </div>
                <button
                  data-table-id-finish={table.table_id}
                  onClick={(e) => handleFinish(e)}
                  className="btn btn-secondary ml-2 mt-1"
                >
                  {" "}
                  Finish{" "}
                </button>
              </>
            ) : (
              <>
                <h4
                  data-table-id-status={table.table_id}
                  className="badge badge-pill badge-success"
                  style={{ fontSize: "1.2rem" }}
                >
                  {" "}
                  Free{" "}
                </h4>
                <div>
            <button
            data-table-id-finish={table.table_id}
            onClick={(e) => handleDelete(e)}
            className="btn btn-danger ml-2 mt-1"
          >
            {" "}
            Delete Table{" "}
          </button>
          </div>
          </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTables;
