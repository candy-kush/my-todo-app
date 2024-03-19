import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import {AiOutlineDelete} from "react-icons/ai";
import {BsCheckLg} from "react-icons/bs";
import moment from 'moment';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completeTodo,setCompleteTodo] = useState([]);

  const handleAddTodo = (e) => {
    let assignedOn = moment().format('LLLL');

    if(newTitle.length === 0) {
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      assignedOn: assignedOn
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    setNewTitle('');
    setNewDescription('');

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete = (index) => {
    let completedOn = moment().format('LLLL');

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completeTodo];
    updatedCompletedArr.push(filteredItem);
    setCompleteTodo(updatedCompletedArr);
    handleDeleteTodo(index,1);

    localStorage.setItem('completeTodo',JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completeTodo];
    reducedTodo.splice(index,1);
    localStorage.setItem('completeTodo',JSON.stringify(reducedTodo));
    setCompleteTodo(reducedTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completeTodo'));
    if(savedTodo) {
      setTodos(savedTodo);
    }

    if(savedCompletedTodo) {
      setCompleteTodo(savedCompletedTodo);
    }
  },[]);


  return (

    <div className="App">

      <Sidebar />
      <div className="todo-wrapper">
        <h1> Add Jobs </h1>
        <div className="todo-input">
          <input type="text" placeholder="Try 'To shop veggies'!"
            value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              
          <input type="text" placeholder="Add Task description"
            value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />

          <button className="btn" onClick={handleAddTodo} >
            <label className="label add">Add</label>
          </button>

        </div>

        <div className="btn-area">
          <button
            className={`sec-btn ${isCompleteScreen===false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)} > To-do
          </button>

          <button 
            className={`sec-btn sec-btn2 ${isCompleteScreen===true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)} > Completed
          </button>
        </div>

        <div className="todo-list">
          { isCompleteScreen === false && 
            allTodos.map((item,index) => {
              return(
                <div className="todo-list-item" key={index}>

                  <div className="list-content">
                    
                    <div className="icons">
                      <h3>{item.title}</h3>
                      <div className="icon-boxes">
                        <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete" />
                        <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} title="Mark Done"/>
                      </div>
                    </div>

                    <p>{item.description}</p>
                    <p><small>Added On : {item.assignedOn}</small></p>
                  </div>

                </div>
              )
            })
          }

          { isCompleteScreen === true && 
            completeTodo.map((item,index) => {
              return(
                <div className="todo-list-item completed-screen" key={index}>

                <div className="list-content">
                  <div className="icons">
                    <h3>{item.title}</h3>
                    <AiOutlineDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete ?" />
                  </div>
                  <p>{item.description}</p>
                  <p><small> Done at : {item.completedOn}</small></p>
                </div>

                </div>
              )
            })
          }

        </div>

      </div>
    </div>
  );
};

export default App;
