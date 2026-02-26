 const todo = require('../model/todoschema')
 
 const gettodo = async (req ,res) => {
     try {
    const todolist = await todo.find({})
    res.status(200).json(todolist);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
 }
 const idgettodo =async (req ,res) => {
     const { id } = req.params
  try {
    const todolist = await todo.findById(id)
    res.status(200).json(todolist);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
 }
 const posttodo = async (req, res) => {
      try {
    const todolist = new todo({
      todo: req.body.todo,
      completed: req.body.completed ||true
      });
  const savedTodo = await todolist.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
 }
 const puttodo = async (req ,res) => {
     const { id } = req.params;
      try {
        const todolist = await todo.findByIdAndUpdate(id, req.body, { new: true })
                 
        res.status(200).json(todolist);
        if (!todolist) {
          res.status(404).json({
            message: 'todo not found'
          })
        }
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
 }
 const deletetodo = async (req,res) => {
        const { id } = req.params;
      try {
        const todolist = await todo.findByIdAndDelete(id, req.body)
        res.status(200).json(todolist);
        if (!todolist) {
          res.status(404).json({
            message: 'todo not found'
          })
        }
      } catch (error) {
        res.status(500).json({
          message: 'deletetion successful'
        })
      }
 }
 module.exports ={
    gettodo, 
    idgettodo,
    posttodo,
    puttodo,
    deletetodo
 }