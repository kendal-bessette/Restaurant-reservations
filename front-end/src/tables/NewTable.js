import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();
  const [table_name, setTable_name] = useState("");
  const [capacity, setCapacity] = useState("");
  const [newError, setNewError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setNewError(null);
    const table = {
      table_name,
      capacity,
    };
    createTable(table)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(setNewError);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <div className="text-center input-group form-body">
      <div>
        <form className="form-group" onSubmit={submitHandler} className='card p-4 bg-light mt-5'>
        <h3 className="d-flex m-3 justify-content-center">New Table</h3>
          <label>Table Name:</label>
          <br />
          <input
            name="table_name"
            type="text"
            required
            onChange={(e) => setTable_name(e.target.value)}
            value={table_name}
            className="form-control"
          />
          <br />
          <label>Table Capacity:</label>
          <br />
          <input
            name="capacity"
            type="number"
            required
            onChange={(e) => setCapacity(e.target.valueAsNumber)}
            value={capacity}
            className="form-control"
          />
          <br />

          <div className="d-flex justify-content-around">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-danger" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default NewTable;