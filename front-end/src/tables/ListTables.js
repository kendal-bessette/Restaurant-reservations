import React from "react";
import { useHistory } from "react-router";
import { clearTable } from "../utils/api";

const ListTables = ({ table }) => {
    const history = useHistory(); 

async function handleFinish(e) {
    e.preventDefault()

    if(window.confirm(
    'Is this table ready to seat new guests? This cannot be undone.'
    )){
        clearTable(table.table_id).then(() => {
            history.pushState('/')
        })
        .catch((err) => console.error(err)); 
    }
}

    return ( 

        <div className="card text-center">
      <div className="card-header">
          <h6>Table</h6>
      </div>
      <div className="card-body">
        <p className="card-title">
          {table.table_name}{" "}
        </p>
        <p className="card-title">Capacity: {table.capacity}</p>
        {table.occupied  ?
        <>
        <div>
            <h6 data-table-id-status={table.table_id} className="btn btn-dark">Occupied</h6>
        </div>
            <button data-table-id-finish={table.table_id} onClick={(e)=>handleFinish(e)} className="btn btn-dark">Finish</button>
        </>
        :
        <>
        <h6 data-table-id-finish={table.table_id} className="btn btn-dark">Free</h6>
        </>
        }
        </div>
      </div>

     );
}
 
export default ListTables;