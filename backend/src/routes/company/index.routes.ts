import { Request, Response, Router } from "express";
import { getCompanyAllController, createCompanyController,getCompanyByIdController, updateCompanyController,deleteCompanyController } from "../../controllers/company/index.controllers";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const companyall = await getCompanyAllController()
        res.status(200).send({ data: companyall })
    }catch (err) {
        res.status(500).send({ error: err })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const createCompany = await createCompanyController(req.body);
        res.status(200).send({ data: createCompany })
    } catch (err) {
        res.status(500).send({ error: err })
    }

})  

router.put('/',async(req:Request,res:Response) => {
    try{
        const updateCompany = await updateCompanyController(req.body)
        res.status(200).send({ data: updateCompany })
    } catch (err) {
        res.status(500).send({ error: err })
    }
})

router.get('/:companyId',async (req:Request,res:Response)=>{
    try{
        const getCompany:any = await getCompanyByIdController(req.params.companyId);
        res.status(200).send({data:getCompany})
    }catch (err) {
        res.status(500).send({ error: err })
    }
})


router.get("/delete/:companyId",async (req:Request,res:Response)=>{
    try{
        const deleteCompany = await deleteCompanyController(req.params.companyId);
        res.status(200).send({message:deleteCompany})
    }catch(err){
        res.status(500).send({error:err})
    }
})




export {router as companyRouter};