# kowen

![main](https://github.com/bobikenobi12/kowen/actions/workflows/main.yml/badge.svg?branch=feature-1)

kowen is a simple, fast, and secure document management system. It is
designed to be easy to use and easy to deploy, and to provide a simple
and secure way to store and share documents.

Used technologies include:

- [Python](https://www.python.org/) 3.5+
- [Django](https://www.djangoproject.com/) 1.11+
- [MySQL](https://www.mysql.com/) 5.7+
- [ChakraUI](https://chakra-ui.com/) +2.5.1
- [React](https://facebook.github.io/react/) 15.6+
- [TypeScript](https://www.typescriptlang.org/) 2.6+
- [Docker](https://www.docker.com/) 17.06+
- [Docker Compose](https://docs.docker.com/compose/) 1.14+
- [Redux](https://redux.js.org/) +1.9.3

## Features

- Simple, intuitive, and easy to use
- Secure, with user authentication
- Provides a hierarchical folder structure for organizing documents
- There is a hierarchical permission system for controlling access to
  documents and folders
- Dynamic search for finding documents
- Stores the contents of documents in a git repository
- There is a REST API for programmatic access to documents
- Documents can be uploaded via the web interface or via the REST API
- Documents can be downloaded via the web interface or via the REST API
- Documents can be viewed in the web interface
- Documents can be searched via the web interface
- Documents can be tagged with keywords
- Documents can be organized into folders

<!-- ## Screenshots

### Login

to be added

### Home

to be added

### Folder

to be added

### Document

to be added

### Search

to be added

### Admin

to be added -->

## Installation

kowen can be installed in a variety of ways. The easiest way to install
kowen is to use the provided Docker Compose configuration. This will
install kowen and all of its dependencies in Docker containers. The
following instructions assume that you are using Docker Compose.

### Prerequisites

- [Docker](https://www.docker.com/) 17.06+
- [Docker Compose](https://docs.docker.com/compose/) 1.14+

<!-- ### Installation

1.  Clone the kowen repository:

        git clone `https://github.com/bobikenobi12/kowen.git`

2.  Create a `docker-compose.override.yml` file in the kowen repository

        cp docker-compose.override.yml.example docker-compose.override.yml

3.  Edit the `docker-compose.override.yml` file to set the `SECRET_KEY`

4.  Start the kowen containers:

        docker-compose up -d

5.  Create the database schema:

        docker-compose exec web python manage.py migrate

6.  Create a superuser:

        docker-compose exec web python manage.py createsuperuser

7.  Open a web browser and navigate to `http://localhost:8000/`

8.  Log in with the superuser credentials

9.  Create a new user

10. Use the app as desired

## Configuration

kowen can be configured by setting environment variables. The following is
a list of environment variables that can be set: -->
