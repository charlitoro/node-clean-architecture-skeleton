# NodeJS Clean Architecture Skeleton

A use case of Clean Architecture in Node.js comprising Express.js, MongoDB and Redis as the main (but replaceable) infrastructure.

### Overview

This example is a simple RESTful API application in which a user can create / update / delete / find a post, by using the _Clean Architecture_.

The objective of _Clean Architecture_ by [Robert C. Martin] is the separation of concerns in software.
This separation is achieved by dividing the software into layers. Each layer is encapsulated by a higher level layer and the way to communicate between the layers is with the _Dependency Rule_.

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

#### Dependency Rule

This rule says that nothing in an inner circle can know anything at all about something in an outer circle. The dependency direction is from the outside in. Meaning that the _Entities_ layer is independent and the _Frameworks & Drivers_ layer (Web, UI, DB etc.) depends on all the other layers.

#### Domain

Contains all the business entities an application consists of. In our example the _User_ and the _Post_.

#### Use Cases

Contains application specific business rules. These use cases orchestrate the flow of data to and from the entities. In our example some of the use cases are: _AddPost_, _AddUser_, _DeleteById_ etc.

#### Interface Adapters

This layer is a set of adapters (controllers, presenters, and gateways) that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the DB or the Web. In other words, is an entry and exit points to the Use Cases layer. In our example we implemented controllers and presenters together and these are the PostController and the UserController.

#### Frameworks and Drivers

The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc.

### How to run it

#### 1. Start the Databases (MongoDB & Redis)

You can use Docker Compose to start the required services:

```sh
docker-compose up -d
```

This will start **MongoDB** and **Redis** containers. The application server is **not** started by Docker Compose and must be run separately.

#### 2. Start the Server

After the databases are running, start the Node.js server:

- For development (with hot reload):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm run build
  npm run start
  ```

### How to test if the service is running

Once the server is running, you can check the health/status endpoint:

- **Endpoint:** `GET /api/v1/status`
- **Example using curl:**
  ```sh
  curl http://localhost:3000/api/v1/status
  ```
- **Expected response:**
  ```json
  { "status": "Service is up and running" }
  ```
