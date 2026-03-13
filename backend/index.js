import app from './src/app.js'
import dotenv from 'dotenv'
dotenv.config();

import dbconnect from './src/config/db.js';

dbconnect()


const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is up and running on http://localhost:${PORT} `);
    
})