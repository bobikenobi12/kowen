# kowen

![main](https://github.com/bobikenobi12/kowen/actions/workflows/main.yml/badge.svg?branch=feature-1)

Kowen is a simple, fast, and secure document management system. It is
designed to be easy to use and easy to deploy, and to provide a simple
and secure way to store and share documents.

Used technologies include:

- [Java](https://www.java.com/) 17+
- [Spring Boot](https://spring.io/projects/spring-boot) 2.6.1
- [MySQL](https://www.mysql.com/) 8.0+
- [ChakraUI](https://chakra-ui.com/) +2.5.1
- [React](https://facebook.github.io/react/) ^18.2.0
- [TypeScript](https://www.typescriptlang.org/) ^4.9.5
- [Docker](https://www.docker.com/) 17.06+
- [Docker Compose](https://docs.docker.com/compose/) 1.14+
- [Redux Toolkit](https://redux-toolkit.js.org/) ^1.9.3
- [React Router](https://reactrouter.com/) ^6.0.2
- [Vite](https://vitejs.dev/) ^4.1.0

## Features

- Simple, intuitive, and easy to use
- Secure, with user authentication
- Provides a hierarchical folder structure for organizing documents
- There is a hierarchical permission system for controlling access to
  documents and folders
- Dynamic search for finding documents
- Stores the contents of documents in a database
- Documents can be uploaded via the web interface or via the REST API
- Documents can be downloaded via the web interface or via the REST API
- Documents can be organized into folders
- Group chat for sharing information with other users

## Installation

kowen can be installed in a variety of ways. The easiest way to install
kowen is to use the provided Docker Compose configuration. This will
install kowen and all of its dependencies in Docker containers. The
following instructions assume that you are using Docker Compose.

### Prerequisites

- [Java](https://www.java.com/) 17+
- [Spring Boot](https://spring.io/projects/spring-boot) 2.6.1
- [MySQL](https://www.mysql.com/) 8.0+
- [Maven](https://maven.apache.org/) 3.8.1+
- [Node.js](https://nodejs.org/) ^18.16.0

### Installation

1. Clone the repository

```
git clone https://bobikenobi12/kowen.git
```

2. Create a new MySQL database

```
mysql -u root -p
CREATE DATABASE kowenJava;
exit;
```

3. Build the backend

```
cd Kowen
mvn clean install
```

4. Run the backend

```
mvn spring-boot:run
```

5. Run the frontend

```
cd client
npm install / yarn install / pnpm install
npm run dev / yarn dev / pnpm dev
```

6. Navigate to http://localhost:5173
