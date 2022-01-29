import React, { useState } from "react";
import { formatDate, formatTime } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom"
import { cancelReservation } from "../utils/api";

const ListReservations = ({ reservation }) => {
  const resDate = formatDate(reservation.reservation_date);
  const [reservationsError, setReservationsError] = useState(null)
  const history = useHistory();

  const handleCancel = async(event) => {
    try{
      if(window.confirm("Do you want to cancel this reservation?")){
        await cancelReservation(reservation.reservation_id);
        history.go(0);
      } 
    } catch(error) {
      setReservationsError(error)
    }
  }
  if(reservation.status === 'cancelled') { 
    return null;
  }

  return (
    <div className="card text-center">
      <div className="card-header">
        <h5>
          {reservation.first_name} {reservation.last_name}, Party of {reservation.people}
        </h5>
      </div>
      <div className="card-body">
        <p className="card-title">
          Name: {reservation.first_name} {reservation.last_name}
        </p>
        <p className="card-title">Reservation Date: {resDate}</p>
        <p className="card-title">
          Reservation Time: {formatTime(reservation.reservation_time)}
        </p>
        <p className="card-title">Mobile Number: {reservation.mobile_number}</p>
        <p className="card-title">Number People: {reservation.people}</p>
        <p className="card-title" data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
        <div className="btn-group" role="group" aria-label="Basic example">
        
        {reservation.status === "seated" ? null : 
            <Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-success">Seat</Link>
          }
          <Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-secondary"> Edit</Link>
          <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel} className="btn btn-danger">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ListReservations;
