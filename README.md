# Cortex
![version](https://img.shields.io/badge/version-0.0.1-brightgreen.svg?style=flat-square) ![docs](https://img.shields.io/badge/docs-coming%20soon-orange.svg?style=flat-square)

- [Cortex](#cortex)
                - [Description](#description)
                - [API Docs](#api-docs)
                - [Project Structure](#project-structure)
                - [Default Environment Variable Values:](#default-environment-variable-values)

### Description
Cortex is an IoT stack developed for the purpose of being easily used and integrated.

### API Docs
Live preview available [here](https://web.postman.co/collections/4171682-435a8395-5c76-42ba-9c18-2ac44d600eb0?workspace=22c4a95b-20eb-4c5c-8b8d-b1f034293f03).

### Project Structure

File Path | Description
-|-
.env | environment variables
server/init/ | the scripts to load and setup the expressjs server
server/main.js | runs the server, called on server start
server/api/models/ | the data schemas for storage
server/api/middle/ | middleware used throughout routes
server/api/routes/ | app route logic
server/api/tests/ | testing all modules
server/api/util/ | helper functions 

### Default Environment Variable Values:
```
DB_URL=mongodb://localhost:27017
SECRET=1234
```
