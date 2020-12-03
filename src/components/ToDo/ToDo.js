import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Box, Typography, TextField } from '@material-ui/core';

import Swal from 'sweetalert2'
import './ToDo.css';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ToDo(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
    const [heading, setHeading] = useState('MUI Functional ToDo List');
    // const [tasks, setTasks] = useState('this.props.store.tasks')
    const dispatch = useDispatch();   

    //TASK ACTIONS
    const createTask = (event) => {
        console.log('in createTask');
        dispatch({
            type: 'CREATE_TASK'
        })

        // Swal.fire({
        //     icon: 'success',
        //     title: 'Task Created!',
        //     showConfirmButton: false,
        //     timer: 1000
        // })
    }
    const deleteTask = (task) => {
        Swal.fire({
            title: 'Are you sure you want to delete this task?',
            showCancelButton: true,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            //   Swal.fire({
            //     icon: 'success',
            //     title: 'Task Deleted!',
            //     showConfirmButton: false,
            //     timer: 1000
            // })
              console.log('in delete with task id:', task);
              dispatch({
                  type: 'DELETE_TASK',
                  payload: task
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Aborted!',
                showConfirmButton: false,
                timer: 1500
            })
            }
        });
    }
    const toggleCompletion = (task) => {
        const taskId = task.id 
        const isCompleteUpdate = !task.isComplete
        console.log('task is currently',task);
        const taskUpdate = {id: taskId, taskName: task.taskName, isComplete: isCompleteUpdate}
        console.log('taskupdate is ', taskUpdate);
        dispatch({
            type: 'UPDATE_TASK',
            payload: taskUpdate
        })
    }
    const updateTaskDescription = (event, task) => {
        console.log('in updateTaskDescription with', event.target.value, '+', task);
        const taskIndex = state.taskMap.findIndex(taskMapTask => taskMapTask.id === task.id )
        console.log('updateTaskDescription taskIndex is', taskIndex);
        const foundTask = state.taskMap[taskIndex]
        console.log('foundTask is:', foundTask);
        dispatch({
            type: 'UPDATE_TASK',
            payload: foundTask
        });

        Swal.fire({
            icon: 'success',
            title: 'Updated!', 
            showConfirmButton: false,
            timer: 1300
        })
    }
    //'STATE' STUFF
    useEffect( () => {
        console.log('in useEffect');
        dispatch({type: 'GET_TASKS'}) 
        checkTaskMap();
    },[state])

    const [state, setState] = React.useState({
        taskMap: ''
    });

    const taskMap = useSelector((state)=>{
    return state.tasks; 
    });
    
    const checkTaskMap = ()=>{
        console.log('state is', state);
        console.log('in checkTaskMap with', taskMap);
        setState({
            taskMap: taskMap
        });

    };
    
    if (state.taskMap.length === 0 && taskMap.length >= 1){
        console.log('conditions met');
        checkTaskMap();
    }
    
    const handleChange = (event, task) => {
        console.log(`in handlechange with: '`, event.target.value,`' +`, task);
        const tasksToSearch = state.taskMap
        console.log('tasksToSearch is:', tasksToSearch);
        const taskIndex = state.taskMap.findIndex(taskMapTask => taskMapTask.id === task.id )
        console.log('taskIndex is', taskIndex);
        let newArray = [...state.taskMap]
        newArray[taskIndex] = {...newArray[taskIndex], taskName: event.target.value}
        console.log('newArray is gonna be', newArray);
        setState({
            //...state,
            taskMap: newArray
			// [propertyName]: event.target.value,
        });
        console.log('state is now:', state);
	};

    // console.log('* state.taskMap is', state.taskMap);
    // console.log('* taskMap is', taskMap);
  return (
    <div>
        <Typography align='center' variant="h3" gutterBottom>{heading}</Typography>
        {/* <hr/> */}
        <Box textAlign='center'>
            <Button 
            className="centeredBtn"
            onClick={createTask}
            variant="contained" 
            color="primary">
            Create Task
            </Button>
        </Box>
        <hr/>
        
        <table className="centered">
            <thead>
                <tr>
                    <td>
                        <Typography variant="h5" gutterBottom>
                        Task
                        </Typography>
                    </td>

                    <td>
                        <Typography variant="h5" gutterBottom>
                        Update
                        </Typography>
                    </td>

                    <td>
                        <Typography variant="h5" gutterBottom>
                        Toggle
                        </Typography>
                    </td>

                    <td>
                        <Typography variant="h5" gutterBottom>
                        Delete
                        </Typography>
                    </td>
                </tr>
            </thead>
            <tbody>
                
                {taskMap.map( task =>
                    <tr key={task.id} >

                        {task.isComplete === true ?
                        <td >
                            <TextField style ={{width: 400}} onChange={(event)=>handleChange(event, task)} className="completedTask" key={task.id} label={task.taskName} variant="outlined" />
                        </td>
                        :
                        <td >
                            <TextField style ={{width: 400}} onChange={(event)=>handleChange(event, task)} key={task.id} label={task.taskName} variant="outlined" />
                        </td>
                        }

                        <td>
                            <Button 
                            onClick={(event)=>updateTaskDescription(event,task)}
                            name="checkedA"
                            variant="contained" 
                            color="primary"
                            >
                            Save
                            </Button>
                        </td>
                        <td>
                            <Button 
                            onClick={()=>toggleCompletion(task)}
                            name="toggleComplete"
                            variant="contained" 
                            color="primary">
                            ✓ / ⟲
                            </Button>
                        </td>
                        <td>
                            <Button 
                            onClick={()=>deleteTask(task.id)}
                            name="delete"
                            variant="contained" 
                            color="secondary">
                            X
                            </Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        
    </div>
  );
}
export default connect(mapStoreToProps)(ToDo);