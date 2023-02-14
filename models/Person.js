const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    age: Number,
    favouriteFoods: {
        type: [String]
    },
});

module.exports = Person = mongoose.model("persons", personSchema)