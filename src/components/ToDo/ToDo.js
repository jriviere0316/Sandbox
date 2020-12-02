import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Typography, TextField } from '@material-ui/core';
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
        dispatch({
            type: 'UPDATE_TASK_STATUS',
            payload: {taskId, isCompleteUpdate}
        })
    }

    const updateTaskDescription = (task) => {
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            showConfirmButton: false,
            timer: 1500
        })
        console.log('in updateTaskDescription with task id:', task);
    }



    //??
    //GET_TASKS 
    const mapDispatchToProps = dispatch => {
        return {
          // dispatching plain actions
          getTasks: () => dispatch({ type: 'GET_TASKS' }),
        }
    }

    //??
    useEffect( () => {
        dispatch({type: 'GET_TASKS'}) 
        console.log('state is',state)   
        console.log('tasks are', taskMap);      
    },[state])

    const [state, setState] = React.useState({
        checkedA: false,
        // taskMap: taskMap
    });

    const taskMap = useSelector((state)=>{
    return state.tasks; 
    });
    

    const [reduxTasks, setReduxTasks] = React.useState({
        tasks: taskMap
    })
    
    console.log('state',state);
    console.log('taskMap is', taskMap);

    console.log('reduxTasks is', reduxTasks);
    
    const handleChange = (event, propertyName) => {
		setState({
			...state,
			[propertyName]: event.target.value,
		});
	};

    
  return (
    <div>
        <Typography variant="h3" gutterBottom>{heading}</Typography>
        <hr/>
        
        <table>
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
                            <TextField onChange={(event)=>handleChange(event, task)} className="completedTask" key={task.id} label={task.taskName} variant="outlined" />
                        </td>
                        :
                        <td >
                            <TextField onChange={(event)=>handleChange(event, task)} key={task.id} label={task.taskName} variant="outlined" />
                        </td>
                        }

                        <td>
                            <Button 
                            onClick={()=>updateTaskDescription(task.id)}
                            name="checkedA"
                            variant="contained" 
                            color="primary">
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

        <Button 
        onClick={createTask}
        variant="contained" 
        color="primary">
        Create Task
        </Button>
    </div>
  );
}

export default connect(mapStoreToProps)(ToDo);
