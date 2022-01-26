import React, { useState } from "react";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";

const NewReservation = () => {

    const history = useHistory(); 

    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:"",
        reservation_time:"",
        people:"",
    }

    const [newRes, setNewRes] = useState({ ...initialFormState }); 
    const [reservationError, setReservationError] = useState(null); 

    async function submitForm(e) {
        e.preventDefault(); 
        setNewRes({ ...newRes }); 
        try {
            await createReservation(newRes); 
            history.push(`/dashboard?date=${newRes.reservation_date}`)
        } catch (err) {
            setReservationError(err)
        }
    }; 

    const changeForm = ({ target }) => {
        setNewRes({...newRes, [target.name]: target.value});
    }

    const peopleChangeForm = ({ target }) => {
        setNewRes({...newRes, [target.name]: parseInt(target.value,10) });
    }

    return ( 
        <div>
            <ErrorAlert error={reservationError} />

            <ReservationForm
                submitForm={submitForm}
                reservation={newRes}
                changeForm={changeForm}
                peopleChangeForm={peopleChangeForm} />
        </div>
     )
};
 
export default NewReservation;