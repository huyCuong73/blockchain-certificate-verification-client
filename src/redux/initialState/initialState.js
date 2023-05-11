export const INIT_STATE = {
    user:{
        isLoading:false,
        user: JSON.parse(localStorage.getItem("user")) || null,
        err:null
    }
    
}