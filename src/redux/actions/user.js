export const loginRequest = (user) => ({
    type: "LOGIN_REQUEST",
    payload: user,
});
export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const loginFailure = (payload) => ({
    type: "LOGIN_FAILURE",
    payload,
});


export const logout = () => ({
    type: "LOGOUT",
  });
  


export const updatePracticeProgressRequest = (data) => ({
    type: "UPDATE_PRACTICE_PROGRESS_REQUEST",
    payload: data,
});
export const updatePracticeProgressSuccess = (user) => ({
    type: "UPDATE_PRACTICE_PROGRESS_SUCCESS",
    payload: user,
});
export const updatePracticeProgressFailure = () => ({
    type: "UPDATE_PRACTICE_PROGRESS_FAILURE",
});




export const updatePracticeRecordRequest = (data) => ({
    type: "UPDATE_PRACTICE_RECORD_REQUEST",
    payload: data,
});
export const updatePracticeRecordSuccess = (user) => ({
    type: "UPDATE_PRACTICE_RECORD_SUCCESS",
    payload: user,
});
export const updatePracticeRecordFailure = () => ({
    type: "UPDATE_PRACTICE_RECORD_FAILURE",
});



export const updateLearningProgressRequest = (data) => ({
    type: "UPDATE_LEARNING_PROGRESS_REQUEST",
    payload: data,
});
export const updateLearningProgressSuccess = (user) => ({
    type: "UPDATE_LEARNING_PROGRESS_SUCCESS",
    payload: user,
});
export const updateLearningProgressFailure = () => ({
    type: "UPDATE_LEARNING_PROGRESS_FAILURE",
});



export const updateUserInfoRequest = (user) => ({
    type: "UPDATE_USER_INFO_REQUEST",
    payload: user,
});
// export const updateUserSuccess = (user) => ({
//     type: "UPDATE_USER_SUCCESS",
//     payload: user,
// });
// export const updateUserFailure = () => ({
//     type: "UPDATE_USER_FAILURE",
// });



export const updateUserRequest = (user) => ({
    type: "UPDATE_USER_REQUEST",
    payload: user,
});
export const updateUserSuccess = (user) => ({
    type: "UPDATE_USER_SUCCESS",
    payload: user,
});
export const updateUserFailure = () => ({
    type: "UPDATE_USER_FAILURE",
});

