import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* sendEquation(action) {
//   const equation = action.payload;
//   console.log(equation);
  yield axios({
    method: 'POST',
    url: '/api/calculator',
    data: action
  });
//   yield put ({
//     type: 'GET_EQUATIONS'
//   })
}

function* userSaga() {
  yield takeLatest('SEND_EQUATION', sendEquation);
}

export default userSaga;
