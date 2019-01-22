# Nomplate Project Template

This is a new project template for a Nomplate project. This template includes
support for an Express + Postgres backend with server-side and client side
Nomplate templates.

This project is continuously integrated using Codeship.

## Getting Started
To get started, clone this repository into a new project directory, delete the .git folder and run `make dev-install`.

To build all client artifacts:
```bash
make build
```

To run tests:
```bash
make test
```

To run tests and watch for file changes:
```bash
make test-w
```

To build client binaries and run the server in development mode:
```bash
make serve
```

To build client binaries and run the server in production mode:
```bash
NODE_ENV=production make serve
```

To start Postgres:
```bash
make pg-start
```

To stop Postgres:
```bash
make pg-stop
```
