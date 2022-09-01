These are my Notes:

- We want to build a todo backend and here is what we want to support


- we want a route that will return all-of-the todo items in our list
GET/ todos

- we want a route that will return a single todo item, based on the id provided
GET/ Todos /:id , :id is the id of the
todo item to return if it exists,
otherwise null

- we want a route that will delete a single todo item, based on the id provided
DELETE /todos/:id
:id is the id of the todo item to delete
return the item that was deleted

- we want a route that will add a todo item to the list
POST /todos
body should include an object, that has a description
ex body: {"description" : "plant the flowers"}


- we want a route that will update an existing todo item in the list
PUT /todos/:id, and include a body that has a description and a completed flag
ex: /todos/5, body= {"description": "feed the bird", "completed" : true}


Get
Put
Update
Delete

todo object should have:

- id: an id of the todo item
- description: what the todo is
- completed: true if it is completed, or false if it is not completed

{
    "id": 234234
    "description": "birth the baby",
    "completed" : false
}

{
    "id": 234234
    "description": "kill the fish",
    "completed" : false
}