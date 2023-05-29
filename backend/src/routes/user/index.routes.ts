import { Request, Response, Router } from "express";
import { createUserController,updateUserController,getUserAllController,getUserByIdController,changeStatusController, 
    deleteUserController,getUserByCompanyId,removeUserfromCompanyController,addUserfromCompanyController } from "../../controllers/user/index.controller";

const router = Router();

router.get('/',async(req:Request,res:Response)=>{
    try{
        const usersData = await getUserAllController();
        res.status(200).send({ data: usersData })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.post('/',async(req:Request,res:Response)=>{
    try{
        const createUser = await createUserController(req.body);
        res.status(200).send({ data: createUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.get('/:userId',async(req:Request,res:Response)=>{
    try{
        const getUser = await getUserByIdController(req.params.userId);
        res.status(200).send({ data: getUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.get('/company/remove/:userId',async(req:Request,res:Response)=>{
    try{
        const getUser = await removeUserfromCompanyController(req.params.userId);
        res.status(200).send({ data: getUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.put('/company/add/:userId',async(req:Request,res:Response)=>{
    try{
        const getUser = await addUserfromCompanyController(req.params.userId,req.body.companyId);
        res.status(200).send({ data: getUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.get('/company/:companyId',async(req:Request,res:Response)=>{
    try{
        const getUser = await getUserByCompanyId(req.params.companyId);
        res.status(200).send({data:getUser})
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.put('/',async(req:Request,res:Response)=>{
    try{
        const updateUser = await updateUserController(req.body);
        res.status(200).send({ data: updateUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})


router.get('/delete/:userId',async(req:Request,res:Response)=>{
    try{
        const updateUser= await deleteUserController(req.params.userId);
        res.status(200).send({ data: updateUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})

router.get('/:userId/:status',async(req:Request,res:Response)=>{
    try{
        const updateUser = await changeStatusController(req.params.status,req.params.userId);
        res.status(200).send({ data: updateUser })
    }catch(Err){
        res.status(500).send({error:Err})
    }
})


export {router as userRouter};