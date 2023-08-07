# Tour of Heroes Angular with Flask Backend

This repository contains a project that demonstrates the use of Angular directives, components, data binding, pipes, services, and routing to create a simple CRUD application. The application allows users to view a list of heroes, select a hero to edit, and update the hero's details. The application also uses pipes to format the data and a service to assemble the heroes. The backend uses Flask to provide a REST API for the heroes data.

## How to Run

To run the front end of web application, run the following commands:

```
npm install
npm start
```

and for the Flask backend, navigate to the folder that contains the code and run:

```
python tourofheroes_api.py
``` 

In your web browser, navigate to `http://localhost:4200/` to access the web application.

## Technologies
- **Angular** - Angular is sed to create the user interface for the application. The Angular components are used to display the list of heroes, edit the details of a hero, and navigate between different views.
- **Flask** - Flask is used to create the backend API for the application. The Flask API provides methods for getting, creating, updating, and deleting heroes.
- **RxJS** - RxJS is used to handle asynchronous events and data streams in the application. RxJS is used to subscribe to events from the Flask API and to update the user interface in response to those events.
