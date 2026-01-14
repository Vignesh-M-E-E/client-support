# Client Support Ticket Booking System

Minimal client/support portal using Angular frontend, Spring Boot backend, and SQL (H2 file).

## Stack
- Frontend: Angular 17 standalone components, HttpClient, forms.
- Backend: Spring Boot 3, Spring Web, Spring Data JPA, H2 (SQL) file DB, OpenAPI UI.

## Backend (Spring Boot)
```
cd backend
mvn spring-boot:run
```
- Runs on `http://localhost:8080`.
- H2 console at `/h2-console` (JDBC URL `jdbc:h2:file:./data/supportdb`).
- API docs: `http://localhost:8080/swagger-ui.html`.
- Uploads stored in `backend/uploads` and served under `/uploads/...`.

## Frontend (Angular)
```
cd frontend
npm install
npm start
```
- Opens on `http://localhost:4200`.
- Update `apiBase` in `src/app/services/ticket.service.ts` if backend host/port differs.

## REST Endpoints
- `POST /api/tickets` (multipart): `title`, `description`, `clientName`, optional `image`.
- `GET /api/tickets`: list all tickets.
- `PUT /api/tickets/{id}`: JSON body `{ "status": "OPEN|IN_PROGRESS|RESOLVED|CLOSED" }`.

## Notes
- No auth included (per scope).
- SQL storage via H2 file; swap to MySQL/PostgreSQL by updating `application.properties` and adding the JDBC driver.

