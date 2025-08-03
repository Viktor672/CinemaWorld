# CinemaWorld

## Description
CinemaWorld is a Single Page Application built with Angular. The theme revolves around movies. Its purpose is to allow users to browse films, register, add, edit, delete, and like movie entries.

## Technologies 
This project uses the Angular framework and libraries such as:
@angular/platform-browser, @angular/core, @angular/core/testing, @angular/router, @angular/forms, @angular/common, @angular/common/http, and rxjs.

## Project Structure
The project is divided into two main folders: Client and Server.

## Architecture
The project follows a client-server architecture. The Angular application (client) communicates with a Node.js backend (Softuni Practise Server) via HTTP REST API. 
The frontend is structured using a feature-based component architecture, with reusable logic placed in 'shared' and 'core' folders. Routing is managed by Angular Router, and authentication logic restricts access to protected views and actions. Custom directives enhance HTML behavior, while services handle communication and local state within the app.

### Client
The client-side part contains the Angular application and is located in the **Client** folder. Inside it, the following structure can be found:

- **public/** – stores static resources like images and videos that are accessible without Angular processing.

- **src/** – the main folder where the application's source code lives:
  -**app/** -  the core part of the app, where all major logic and structure are defined.
  - **core/** – contains application-wide services, route guards, and other logic that is meant to be used globally and loaded once.
  - **directives/** – holds custom directives that extend or modify the behavior of HTML elements.
  - **features/** –  contains standalone components organized by feature or functionality within the application.
  - **models/** – defines the data structures and interfaces used for type safety and consistent data handling across the app.
  - **shared/** – includes common components and pipes that are reused in multiple parts of the UI to avoid duplication.

## Starting the Project
To start the client: ng serve

To start the server: node server.js

## Functionalities 
This application allows you to view all movies, search for movies by title, and view detailed information about each movie. You can go to about page to see information about the app. If you try to access page that does not exist you will redirected to 404 page. You can register or login(if you have already account) and of course you can loggout. If you are logged in you can add movies, you can edit your own added movies or delete them and you can like movies that you are not the owner of.

## Authentication
Home, About, PageNotFound, Movies and Details Pages can be accessed regardless of whether you are logged in or not.
- **Logged In Users** - You have access to Add, Edit, Delete, and Logout pages. Once logged in, you can interact with the platform by creating and managing your own movies. You can also like movies and interact with them.
- **Not Logged In** - You can access Register and Login pages. You can only view public content and your ability to add or modify content is forbidden. You can view the likes on each movie, but you cannot like any movies yourself.

**CinemaWorld** offers an intuitive platform for users to explore and manage movie content. Built with Angular and Node.js, the app provides a responsive and smooth user experience. The authentication system ensures secure access to user-specific actions, while keeping public content available to all visitors. This project showcases front-end development skills and provides a solid foundation for future improvements and features.