const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())
app.use(express.json())

//CRUD routes

app.post('/createtodo', async(req, res) => {
  try {
    const { description } = req.body
    if(!description) throw new Error("Unable to create todo")
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
    res.json(newTodo.rows[0])
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

app.get('/displaytodos', async(req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json({result: allTodos.rows})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

app.get('/viewtodo/:id', async(req, res) => {
  try {
    const {id} = req.params
    const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    if(getTodo.rows.length === 0) throw new Error("Unable to view todo")
    res.json({result: getTodo.rows})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

app.put('/updatetodo/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", 
      [description, id]
    );
    // if(updatedTodo.rows.length === 0) throw new Error("Unable to view todo")
    res.json({result: updatedTodo.rows[0]})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

app.delete('/deletetodo/:id', async(req, res) => {
  try {
    const {id} = req.params
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json({result: "Successfully deleted todo"})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

const PORT = 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))