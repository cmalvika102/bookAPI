const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    bookName : String,
    bookAuthor : String,
},{timestamps:true})
mongoose.model("Book",bookSchema)