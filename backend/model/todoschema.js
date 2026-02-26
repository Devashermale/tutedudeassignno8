const mongoose = require('mongoose')
const todolist = mongoose.Schema({

    todo:{
        type:'String',
        required:true
    },
    completed:{
        type:Boolean,
        required:false 
    }
})
const todo = mongoose.model('todo',todolist)
module.exports =todo