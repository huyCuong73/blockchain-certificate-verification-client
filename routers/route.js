import auth from './auth.js'
import user from './user.js'
import certification from "./certification.js"

function route(app){
    app.use('/', auth)
    app.use('/', certification)
    app.use('/', user)
}

export default route