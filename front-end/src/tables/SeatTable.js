import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, updateTable } from "../utils/api"
import ErrorAlert  from "../layout/ErrorAlert"
import formatReservationDate from "../utils/format-reservation-date";
import { formatDate,formatTime } from "../utils/date-time";


const SeatTable = () => {
    const [tables, setTables] = useState([]);
    const [reservation, setReservation] = useState({});
    const [tablesError, setTablesError] = useState(null);
    const [formData, setFormData] = useState("Please select a table")
    const {reservation_id} = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function getTables(){
            const tablesFromApi = await listTables(abortController.signal)
            setTables(tablesFromApi)
        }
        
        async function getReservation(){
            const response = await readReservation(reservation_id, abortController.signal)
            if(response){
                const reservationFromApi =  formatReservationDate(response)
            setReservation(reservationFromApi);
        }
    }
        getReservation();
        getTables();
    }, [reservation_id])
    
    
    function formChange(e) {
        setFormData(e.target.value)
    }
    
    async function formSubmit(e) {
        e.preventDefault();
        try {
            if(formData === "Please select a table") throw new Error("Please Select a table")
            await updateTable(formData, {data: {reservation_id} })
            history.push(`/dashboard?date=${reservation.reservation_date}`)
        } catch(error) {
            setTablesError(error)
        }
    }

    function handleCancel(){
        setFormData("Please Select a Table");
        history.goBack();
    }; 

    return ( 
        <>
        <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
        <form onSubmit={formSubmit} className="d-flex flex-column justify-content-center">
            <label htmlFor="table_id">
                <select 
                    className="select-menu m-2 p-2"
                    id="table_id"
                    name="table_id"
                    onChange={formChange}
                    value={formData}
                >
                    <option> Please select a table</option>
                    {tables.map((table) => (
                        <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    ))}
                </select>
            </label>
            <div className="row">
             <button className="btn btn-success m-2" type="submit"><span className="oi oi-arrow-thick-bottom" /> Seat </button>
             <button className="btn btn-danger m-2" onClick={handleCancel}><span className="oi oi-ban" /> Cancel </button>
            </div>
        </form>
        
        {reservation.reservation_id && (
            <div className="card text-center m-2 border" style={{ maxWidth: "50rem"}}>
            <div className="card-header">
              <h5>
                {reservation.first_name} {reservation.last_name}, Party of {reservation.people}
              </h5>
            </div>
            <div className="card-body">
              <p className="card-title">
                Name: {reservation.first_name} {reservation.last_name}
              </p>
              <p className="card-title">
              <span className="oi oi-calendar mr-1"></span> Date: {formatDate(reservation.reservation_date)}</p>
              <p className="card-title"><span className="oi oi-clock mr-1"></span>
                Reservation Time: {formatTime(reservation.reservation_time)}
              </p>
              <p className="card-title">
              <span className="oi oi-phone mr-1"></span>Mobile Number: {reservation.mobile_number}</p>
              <p className="card-title">
              <span className="oi oi-people mr-1"></span>Number People: {reservation.people}</p>
              <p className="card-title" data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
              <div className="btn-group" role="group" aria-label="Basic example">
        </div>
        </div>
        </div>
        )}
        </div>
        <ErrorAlert error={tablesError}/>
        </>
     );
}
 
export default SeatTable;