import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

const NewTable = () => {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "0",
    occupied: false,
    reservation_id: null,
  };

  const [table, setTable] = useState({ ...initialFormState });

  // async function submitForm(e) {
  //   e.preventDefault();
  //   await createTable(table);
  //   setTable({ ...initialFormState });
  //   history.push("/dashboard");
  // }

  async function submitForm(e) {
    e.preventDefault(); 
    createTable({ ...table }); 
    try {
        await createTable(table); 
        history.push(`/dashboard`)
    } catch (err) {
        console.err(err)
    }
}; 

  const changeForm = ({ target }) => {
    setTable({ ...table, [target.name]: target.value });
  };

  return (
    <>
      <div>
        <div>
          <h2>Create Table</h2>
        </div>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="table_name" className="form-label">
              Table Name
            </label>
            <input
              type="text"
              name="table_name"
              className="form-control"
              placeholder="Table Name"
              id="table_name"
              value={table.table_name}
              onChange={changeForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="table_capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              className="form-control"
              placeholder="Capacity"
              id="capacity_name"
              required
              min="1"
              value={table.capacity}
              onChange={changeForm}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="cancel"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTable;
