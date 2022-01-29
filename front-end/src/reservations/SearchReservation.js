import React, { useState } from "react";
import ListReservations from "./ListReservations";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const SearchReservation = () => {
  const [mobileNumber, setMobileNumber] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const formChange = ({ target }) => {
    setMobileNumber({ ...mobileNumber, [target.name]: target.value });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    const reservationByNum = await listReservations(
      mobileNumber,
      abortController.signal
    );
    setReservations(reservationByNum);
    if (reservationByNum.length === 0) {
      setReservationsError({ message: "No reservations found" });
    } else {
      setReservationsError(null);
    }
  };

  return (
    <>
      <ErrorAlert error={reservationsError} />
      <h1 className="pt-4 text-center">Search For Reservation</h1>
      <div className="text-center input-group form-body">
        <form
          onSubmit={handleSearch}
          className="card p-4 bg-light mt-5"
          style={{ width: "30rem" }}
        >
                <div>
    </div>
          <div>
          <input
            className="form-control"
            name="mobile_number"
            placeholder="Search by customer's phone number"
            onChange={formChange}
            required
          />

          </div>
          <button className="btn btn-primary mt-3 mr-3" type="submit">
            {" "}
            Find Reservation{" "}
          </button>
        </form>
      </div>
      {!reservations
        ? null
        : reservations.map((reservation) => (
            <ListReservations
              className="mt-5"
              key={reservation.reservation_id}
              reservation={reservation}
            />
          ))}
    </>
  );
};

export default SearchReservation;
