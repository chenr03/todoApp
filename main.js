// bring the express framework into our application

let express = require("express");

// defined the port the application is listening on
let PORT = 4000;

// create the application server object
let app = express();

// enable our app to parse json requests
//using the body-parser middleware
app.use(express.json());


// start our application server, and print out what port it is listening on
app.listen(PORT, function(){
    console.log('Application is listening on PORT', PORT);
})

// this is our database of items
// when we learn about SQL we will work with a real database
let db = [];

// get all items
app.get("/todos", function(request, response){
    console.log("GET /todos");
    response.json(db); // we really don't want to do this in real life, but ok for now

});
// get a specific item but the id
app.get("/todos/:id", function(request, response){
    console.log("GET /todos/:id");
    // get the id we are looking for from the route
    let myId = request.params.id


    // find the item in our database that matches the id

    let matchingItem = db.find(function(item, index){
        return item.id === myId;
    })
    // you can use a bunch of different ways to find the item with the matching id from the array:
    // for-loop
    // while-loop
    // higher order find
    // higher order filter
    // higher order reduce
    if (matchingItem){
        response.json(matchingItem);
    } else {
        response.json(null);
    }
})


// delete a specific item but the id
app.delete("/todos/:id", function(request, response){
    console.log("DELETE /todos:id");

    // find the id we want to delete
    let myId = request.params.id;

    // we need to remove this item from our db array
    // there is a lot of ways to do this
    // I am choosing to use filter, to create a new array with all-of-the items except for
    // the one with the matching id
    //
    //find the position of the item we want to remove
    // and then remove it from the array using splice

    let matchingIndex = db.find(function(item, index){
        return item.id === myId;
    })

    // if the index is less than 0, that means there was no match to the id in the db array
    if(matchingIndex < 0){
        response.json(null);
    } else {
        // remove the item from the db array and return it
        let deletedItem = db.splice(matchingIndex, 1);
        response.json(deletedItem)
    }
});



// create a new item
app.post("/todos", function(request, response){
    console.log("POST /todos");
    let description = request.body.description;
    let id = getRandomInt();
    let completed = false;

    // read the description from the request body,
    // and creat e a new item, with the description
    // and use a random number from the id

    let newItem = {};
    newItem.description = description;
    newItem.id = id;
    newItem.completed = completed;

    // add the new item to the database array
    db.push(newItem);

    // return the new item on the response
    response.json(newItem);

});

// update a specific item but the id
app.put("/todos", function(request, response){
    console.log("PUT /todos/:id");

   //get the id to update from the route
    let myId = request.params.id;

    // get the new description from the body
    let description = request.body.description;

    // get the new completed flag from the body
    let completed = request.body.completed;

    // we need to get the item we want to update from the db array
    let matchingItem = db.find(function(item, index ){
        return item.id === myId;
    });

    // if we found a matching item, update it
    // and return the updated item in the response
    // if not return null exclusively

    if(matchingItem){
        matchingItem.description = description;
        matchingItem.completed = completed;
        response.json(matchingItem);
    } else {
        response.json(null);
    }


});

// this function will return a random integer
// between 0 and 1000000.
let getRandomInt = function(){
    let randomFloat = Math.random();
    let bigRandomFloat = randomFloat * 1000000;
    let randomInt = Math.floor(bigRandomFloat);
    return randomInt;

}