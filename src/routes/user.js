const express = require("express");
const dealService = require("../services/user");
const router = express.Router();

router.post("/createDeal", async (req, res, next) => {
    try{
        const dealCreated= await dealService.createDeal(req.body);
        res.send(dealCreated);
    }catch(error){
        next(error);
    }
});

router.post("/endDeal",async (req,res,next)=> {
    try{
        const dealEnded=await dealService.endDeal(req.body);
        res.send({"dealEnded":true});
    }catch(error){
        next(error);
    }
})

router.post("/updateDeal",async(req,res,next)=>{
    try{
       const updatedDeal=await dealService.updateDeal(req.body);
       res.send(updatedDeal);
    }catch(error){
        next(error);
    }
})

router.post("/userBuy/:itemId",async(req,res,next)=>{
    try{
        
        const user=await dealService.userBuy(req.params.itemId,req.body);
        res.send(user);
    }catch(error){
        next(error);
    }
})

module.exports = router;