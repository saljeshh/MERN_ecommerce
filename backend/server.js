const app = require("./app")

const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


// config
dotenv.config({path: "backend/config/config.env"})

// call database connection after config
connectDatabase()

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
}) 