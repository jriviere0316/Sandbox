import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* createTask() {
  console.log('in createTask with');
  yield axios({
      method: 'POST',
      url: '/api/tasks'
    });
  yield put ({
      type: 'GET_TASKS'
  })
}

function* getTasks(){
    console.log('in getTasks saga');
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        console.log('config is:', config);
        const response = yield axios.get('api/tasks', config);

        console.log('back from GET tasks with:', response.data);
        yield put({ type: 'SET_TASKS', payload: response.data});
    }catch (error){
        console.log('GET event request failed,', error);
    }
}

function* deleteTask(action){
    console.log('in deleteTask saga with', action.payload);
    yield axios ({
        method: 'DELETE',
        url: `/api/tasks/${action.payload}`,
        data: action.payload
    })
    yield put({
    type: 'GET_TASKS'
    })
}

// function* updateTaskStatus(action){
//     console.log('in updateTaskStatus with', action.payload);
//     const urlid = action.payload.task.id
//     console.log('urlid is', urlid);
//     yield axios ({
//         method: 'PUT',
//         url: `/api/tasks/${urlid}`,
//         data: action.payload
//     })
//     yield put({
//     type: 'GET_TASKS'
//     })
// }

function* updateTaskName(action){
    console.log('in updateTaskName with', action.payload);
    yield axios ({
        method: 'PUT',
        url: `/api/tasks/updatename`,
        data: action.payload
    })
    yield put({
    type: 'GET_TASKS'
    })
}

function* registrationSaga() {
  yield takeLatest('CREATE_TASK', createTask);
  yield takeLatest('GET_TASKS', getTasks);
  yield takeLatest('DELETE_TASK', deleteTask);
//   yield takeLatest('UPDATE_TASK_STATUS', updateTaskStatus);

  yield takeLatest('UPDATE_TASK', updateTaskName);

}

export default registrationSaga;
