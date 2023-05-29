import express from 'express';
import cors from 'cors';
import config from './src/helpers/config';
import mongoose from 'mongoose'

import { companyRouter } from './src/routes/company/index.routes';
import { userRouter } from './src/routes/user/index.routes';

const app=express(); 
app.use(express.json());

app.use(
    cors({
        credentials:true,
        origin:"*",
    })
)

app.use("/api/company",companyRouter);
app.use('/api/user',userRouter)


mongoose.connect(config.dbURL as string).then(()=>{
    app.listen(config.PORT,async ()=>{
        try{
            console.log("Server Created Successfully")
        }
        catch(Err){
            console.log("Error ===>",Err)
        }       
    })
})
