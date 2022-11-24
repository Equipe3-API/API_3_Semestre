import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const airplaneFlapRoute = Router();
const airplaneFlap = require('../models/airplaneFlapTable')



airplaneFlapRoute.get('/airplaneFlap', async(req: Request, res: Response, next: NextFunction)=>{
    const airplaneFlapList = await airplaneFlap.findAll();
    res.status(StatusCodes.OK).send(airplaneFlapList)
})

airplaneFlapRoute.get('/airplaneFlap/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await airplaneFlap.findAll({ where: { airplaneId: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "airplaneFlap não cadastrado!"
        })
    } else {
        let arrayFlap:any =  []
        project.forEach(flap => {
            arrayFlap.push(flap.flapId)
        });
        return res.json(arrayFlap)
    }
})

airplaneFlapRoute.post('/airplaneFlap/cadastrar/:uuid', async (req: Request, res: Response, next: NextFunction)=>{
    const newairplaneFlap = req.body.ids
    const airplaneId = req.params.uuid;
    let ok = false

    for(let c = 0; c < newairplaneFlap.length ; c++){
        
        await airplaneFlap.create({
            "airplaneId": Number(airplaneId),
            "flapId": Number(newairplaneFlap[c])
        }).then(() => {
            ok = true
        }).catch(() => {
            ok = false
            c = newairplaneFlap.length
        })
    }
    
    return res.json({
            ok: ok,
            mensagem: ok ? "airplaneFlap cadastrado com sucesso!" : "n foi"
    })
   
})

airplaneFlapRoute.put('/airplaneFlap/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedAirplaneFlap = req.body;
    modifiedAirplaneFlap.uuid = uuid
    await airplaneFlap.update(modifiedAirplaneFlap, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             erro: false,
             mensagem: "airplaneFlap atualizado com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             erro: true,
             mensagem: "airplaneFlap não atualizado!"
        })
     })
})


airplaneFlapRoute.delete('/airplaneFlap/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await airplaneFlap.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "airplaneFlap deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "airplaneFlap não deletado!"
        })
    })
})


export default airplaneFlapRoute;