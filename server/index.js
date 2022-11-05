const express = require("express")
const app = express()
const pool = require("./db")


// middleware

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
// Routes

// create a todo
 app.post('/create-todo',async(req,res) =>{
try {
    
const {description}  = await req.body;

const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",


[description]

);
res.json(newTodo);


} catch (error) {
    console.log(error)
}
})

// get all todo

app.get('/todo',async(req,res) =>{
    try {
        const  allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows)
        
    } catch (error) {
        console.log(error)
    }
})

// get a todo
app.get('/todo/:id',async (req,res) =>{
    try {
        const {id} = req.params
        
        const aTodo =  await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(aTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

// update a todo
app.put('/todos/:id', async(req,res) =>{
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
             
        
        [description,id]
        );
        res.json('todo was updated')
    } catch (error) {
        console.log(error)
    }
})

// delete a todo
app.delete('/deletetodo/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const deleteTodo =  await pool.query('DELETE FROM todo WHERE todo_id = $1',
        [id]
        );
        res.json('todo was deleted')
    


    } catch (error) {
        console.log(error)
    }
})



app.listen(4000,() =>{
    console.log("server has started on port 5000")
})