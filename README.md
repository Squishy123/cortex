# Cortex
IoT Infrastructure

### API 
https://web.postman.co/collections/4171682-435a8395-5c76-42ba-9c18-2ac44d600eb0?workspace=22c4a95b-20eb-4c5c-8b8d-b1f034293f03

### Required Env Variables
.env
##### Default Values:
```
DB_URL=mongodb://localhost:27017
SECRET=1234
```

### Project Structure
server/init/ - the scripts to load and setup the expressjs server
server/main.js - runs the server, called on server start

server/api/models/ - the data schemas for storage
server/api/middle/ - middleware used throughout routes
server/api/routes/ - app route logic
server/api/tests/ - testing all modules
server/api/util/ - helper functions 

