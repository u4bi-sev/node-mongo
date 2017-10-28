## node mongo

### server
```
npm install
npm start
```

### client(CORS)
```
http://127.0.0.1:5500/client/index.html
```

### API
| URL                       | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /user                     | GET    | selects user              |
| /user/:id                 | GET    | select user (_id)         |
| /user                     | POST   | insert user               |
| /user/:id                 | PUT    | update user (_id)         |
| /user/:id                 | DELETE | delete user (_id)         |

### Schema
```json
User {
    "name": "String",
    "pay" : "Double",
    "age" : "Number"
}
```

> requirements
> * mongoose
> * mongoose-double
> * mongoose-string-query
> * restify
> * restify-cors-middleware
> * axios (client)
