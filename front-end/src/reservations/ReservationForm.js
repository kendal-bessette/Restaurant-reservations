import React from "react";
import { useHistory } from 'react-router-dom'; 

const ReservationForm = ({ submitForm, reservation, changeForm, peopleChangeForm }) => {
  const history = useHistory(); 

    return (
   <div>   
<div className="text-center input-group form-body">
<form onSubmit={submitForm} className='card p-4 bg-light mt-5'>
  <div>
  </div>
  <div className="mb-3">
    <label htmlFor="first_name" className="form-label">First Name</label>
    <input 
    type="text" 
    name="first_name"
    className="form-control" 
    placeholder="First Name"
    id="floatingInputValue"
    value={reservation.first_name}
    onChange={changeForm}
    required  />
  </div>
  <div className="mb-3">
    <label htmlFor="last_name" className="form-label">Last Name</label>
    <input 
    type="text" 
    name="last_name"
    className="form-control" 
    placeholder="Last Name"
    id="last_name"
    value={reservation.last_name}
    onChange={changeForm}
    required  /> 
  </div>
  <div className="mb-3">
    <label htmlFor="first_name" className="form-label">Mobile Number</label>
    <input 
    type="text" 
    name="mobile_number"
    className="form-control" 
    placeholder="Mobile Number"
    id="mobile_number"
    value={reservation.mobile_number}
    onChange={changeForm}
    required  />
  </div>
  <div className="mb-3">
    <label htmlFor="reservation_date" className="form-label">Reservation Date</label>
    <input 
    type="date" 
    name="reservation_date"
    className="form-control" 
    id="reservation_date"
    value={reservation.reservation_date}
    onChange={changeForm}
    required  />
  </div>
  <div className="mb-3">
    <label htmlFor="reservation_time" className="form-label">Reservation Time</label>
    <input 
    type="time" 
    name="reservation_time"
    className="form-control" 
    placeholder='HH:MM'
    id="reservation_time"
    value={reservation.reservation_time}
    onChange={changeForm}
    required  /> 
  </div>
  <div className="mb-3">
    <label htmlFor="people" className="form-label">People</label>
    <input 
    type="number" 
    name="people"
    className="form-control" 
    min="1"
    id="people"
    value={reservation.people}
    onChange={peopleChangeForm}
    required  />
  </div>
  <div className="button-group center">
<button type="submit" className="btn btn-primary mt-3 mr-3">Submit</button>
<button type="cancel" className="btn btn-danger mt-3 mr-3" onClick={() => history.goBack()}>Cancel</button>
</div>
</form>
</div>
</div>

    );
}; 
 
export default ReservationForm;