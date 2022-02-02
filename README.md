# Capstone: Restaurant Reservation System

[Deployed App](https://restaurant-reservations-frontend-a5zbss9hu-kendal-bessette.vercel.app/dashboard)

## Installation

1. Run `npm install` to install project dependencies.
2. Run `npm run start:dev` to start the server in development mode.
3. Run the full test suite with `npm run test`
4. To run frontend and backend tests separately run `npm run test:frontend or npm run test:backend`

## App Summary

- Allows users to create, edit, and delete reservations.
- Allows for users to create tables.
- Reservations can be sat at the tables and finished when they are done. 
- Allows for users to search for existing reservations by phone number. 


## API Documentation


| API Path | Method(s) |
| ------------- | ------------- |
| `/reservations`	  | 	GET: List all reservations |
| `/reservations`	  | 	POST: Create a new reservation. |
| `/reservations/?date='YYYY-MM-DD'`	 | GET: List all reservations by date. |
| `/reservations/:reservation_id`	 | GET: Read a single reservation by 'reservation_id'. |
| `/reservations/:reservation_id`	 | PUT: Update a reservation by 'reservation_id'. |
| `/reservations/:reservation_id`	 | DELETE: Delete a reservation by 'reservation_id'. |
| `/reservations/:reservation_id/status` | PUT: Update a reservation's status. Options being "booked", "seated", or "finished". |
| `/tables` | GET: List all tables.  |
| `/tables` | POST: Create a new table. |
| `/tables/:table_id` | GET: Read a single table by 'table_id'.  |
| `/tables/:table_id` | DELETE: Delete a table by 'table_id'. |
| `/tables/:table_id/seat	` |  PUT: Update a table's status to "occupied".  |
| `/tables/:table_id/seat	` | DELETE: Update a table's status to "free".  |



## Project Tech Stack

Front-end:

- Bootstrap
- CSS
- HTML
- JavaScript
- React

Back-end:

- Express
- JavaScript
- Knex
- Node.js

Database:

- PostgreSQL
- Production Site Through Heroku and Vercel 

## App Screenshots
<img width="1440" alt="Screen Shot 2022-01-29 at 9 55 58 PM" src="https://user-images.githubusercontent.com/87912955/151707844-2723c860-6593-4d0a-9312-5da42c3f161d.png">
<img width="1440" alt="Screen Shot 2022-01-29 at 9 56 11 PM" src="https://user-images.githubusercontent.com/87912955/151707845-0e22a2d2-ef2d-4d33-988f-7bd482b03079.png">
<img width="1440" alt="Screen Shot 2022-01-29 at 9 56 05 PM" src="https://user-images.githubusercontent.com/87912955/151707846-fc47a3ef-31d9-40d2-a6c5-c33ed4b62f7a.png">
<img width="879" alt="Screen Shot 2022-01-29 at 9 56 29 PM" src="https://user-images.githubusercontent.com/87912955/151707847-669dcfcb-56da-43c7-afdc-b5489702d02e.png">
<img width="1440" alt="Screen Shot 2022-01-29 at 9 56 17 PM" src="https://user-images.githubusercontent.com/87912955/151707850-bccb1024-dc8e-4913-bd02-81c5595e16b2.png">

