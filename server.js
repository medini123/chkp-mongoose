const express = require('express');
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Person = require("./models/Person");

const DBPWS = process.env.DBPWS;
const DBUSER = process.env.DBUSER;

mongoose.connect(`mongodb+srv://${DBUSER}:${DBPWS}@cluster0.p52p6cy.mongodb.net/MYLIBRARY?retryWrites=true&w=majority`)
.then(()=> console.log("connected to database") )
.catch((err)=>console.log(err));



const addPerson = async () => {
try {
    const newPerson = new Person({
        name: "Omar",
        age:20,
        favouriteFoods: ["Kouchari","Meloukiya","Foul"],
    });
    const person = await newPerson.save();
      console.log(person);

} catch (error) {
    if (error) throw error;
}

};
//addPerson();



const getPersons = async () => {
    try {
        const result = await Person.find();
        console.log(result);
    } catch (error) {
        if (error) throw error;
    }
};
//getPersons();


const getPersonsByFood = async () => {
    try {
        const result = await Person.findOne({favouriteFoods: {$all: ["Couscous"]}});
        console.log(result);
    } catch (error) {
        if (error) throw error;
    }
};
//getPersonsByFood();

const getPersonsById = async () => {
    try {
        const result = await Person.findById("63e9173e7bd46fbce609bc84");
        console.log(result);
    } catch (error) {
        if (error) throw error;

    }
};
//getPersonsById();


//find and update
let id2 = "63d293234c4526dc25f0287c"
Person.findOneAndUpdate(
  { _id: id2 },
  { $push: { favoriteFoods: "hamburger" } },
  (err, data) => {
    if (err) throw err;

    console.log(data);
  }
);

// find one and delete
let id3 = "63d2929d1e1d37507525ce0b";
Person.findByIdAndRemove({_id:id3},(err)=>{
    if (err) throw err
    //console.log('Deleted successfully');
}) 

//check if delete 
Person.findById({_id : id3} , (err , data)=>{
    if(err) throw err  
    //console.log(data)
  })


  // delete many
Person.deleteMany({name:'Mary'} ,(err)=>{
    if(err) throw err
   //console.log('Mary is removed');
})

//Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods:'burritos'})
    .limit(2)
    .sort({firstName: 1})
    .select({age: true})
    .exect()
    .then(docs => {
        console.log(docs)
      })
     .catch(err => {
        console.error(err)
      })





app.listen(5000, (err) => {
    if (err) throw err;
    console.log("server is up and running ...");
});  