import {takeLatest, call, put, takeEvery} from 'redux-saga/effects'
import { loginFailure, loginRequest, loginSuccess } from '../actions/user';
import { getUser, login } from '../../api/user';


const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

function* loginRequestSaga(action){
    try {    
        
        const userCre = yield call(login, action.payload)
        
        const user = yield call(getUser, {email: userCre.data.email})

        setUser({...user.data,accessToken:userCre.data.encryptedToken, role: userCre.data.role})

        yield put(loginSuccess({...user.data,accessToken:userCre.data.encryptedToken, role: userCre.data.role}))

    } catch (err){
        console.log(err)
        yield put(loginFailure(err.response.data))
    }
}


function* mySaga(){
    yield takeLatest("LOGIN_REQUEST",loginRequestSaga)
}

export default mySaga