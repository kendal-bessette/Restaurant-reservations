import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, next } from "../utils/date-time";
import ListReservations from "../reservations/ListReservations";
import ListTables from "../tables/ListTables";
import { formatDate } from "../utils/date-time";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ today }) {
  const query = useQuery();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today);
  const [tables, setTables] = useState([]);

  const handleToday = () => setDate(today)
  const handleTomorrow = () => setDate(next(date));;
  const handlePrev = () => setDate(previous(date));

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

     listTables(abortController.signal)
     .then(setTables)
     .catch(err => console.error(err)) ;

    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="pt-4">Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {formatDate(date)}</h4>
      </div>
      <div>
      <div className="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-primary m-2" onClick={handlePrev}>
            Previous Day
          </button>
          <button type="button" className="btn btn-primary m-2" onClick={handleToday}>
            Today
          </button>
          <button type="button" className="btn btn-primary m-2" onClick={handleTomorrow}>
            Next Day
          </button>
      </div>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <div className="card-group mt-4">
        {!reservations ? <h4>Loading...</h4>
        :
        reservations.map((reservation) => (
          <ListReservations key={reservation.reservation_id} reservation={reservation} />
        ))}
        </div>
        <div className="card-group mt-5">
        {!tables ? <h4>Loading...</h4>
        :
        tables.map((table) => (
          <ListTables key={table.table_id} table={table} />
        ))}
        </div>
    </main>
  );
}

export default Dashboard;
