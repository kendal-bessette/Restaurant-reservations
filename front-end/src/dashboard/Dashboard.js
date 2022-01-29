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
      <h1 className="pt-4 text-center">Dashboard</h1>
        <h4 className="pt-2 pb-3 text-center">Reservations for: {formatDate(date)}</h4>
      <div>
      <div className="btn-group d-flex mt-2 justify-content-center" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-primary m-2" onClick={handlePrev}>
          <span className="oi oi-arrow-circle-left mr-2" />
            Previous Day
          </button>
          <button type="button" className="btn btn-primary m-2" onClick={handleToday}>
          <span className="oi oi-calendar mr-2" />
            Today
          </button>
          <button type="button" className="btn btn-primary m-2" onClick={handleTomorrow}>
            Next Day
            <span className="oi oi-arrow-circle-right ml-2" />
          </button>
      </div>
      </div>

      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <h2 className="text-center pt-2">Reservations</h2>
      {!reservations.length ? <h5 className="text-center pt-2">No Reservations for {formatDate(date)}</h5> : ""}

      <div className="card-group mt-4 ">
        {!reservations ? <h4>No Reservations</h4>
        :
        reservations.map((reservation) => (
          <ListReservations key={reservation.reservation_id} reservation={reservation} />
        ))}
        </div>
        <h2 className="text-center pt-2">Tables</h2>
        <div className="card-group mt-4 mb-4">
        {!tables ? <h4>No Tables</h4>
        :
        tables.map((table) => (
          <ListTables key={table.table_id} table={table} />
        ))}
        </div>
    </main>
  );
}

export default Dashboard;
