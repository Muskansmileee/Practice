const Deal = require("../model/user");
const UserBuy=require("../model/userBuy");
const deal = {}
deal.createDeal = async (dealObject) => {
   
    const createdDeal= await Deal.create(dealObject);

    return createdDeal;
}

deal.endDeal= async (dealId) => {
     const deal=await Deal.findById({"_id":dealId._id});
     if(deal==null){
         let error=new Error();
         error.message="Deal Doesnot exist";
         error.status=404;
         throw error;

     }
     const endedDeal=await Deal.deleteOne({"id":dealId});
     return true;  
}

deal.updateDeal=async (dealToUpdate)=> {
    const deal=await Deal.findById({"_id":dealToUpdate.id});
    if(deal==null){
        let error=new Error();
        error.message="Deal Doesnot exist";
        error.status=404;
        throw error;

    }
    const updatedDeal=await Deal.updateOne({"_id":dealToUpdate.id},
                        {$set:
                            {"noOfItemsToBeSold":dealToUpdate.noOfItemsToBeSold,
                            "endTime":dealToUpdate.endTime}
                         }
                      );
     return updatedDeal;
}

deal.userBuy=async(itemId,userDetails)=>{
  const findUser=await UserBuy.findOne({"name":userDetails.name});
 if(findUser!=null){
     let err=new Error("Only 1 item allowed per user");
     err.status=404;
     throw err;
 }
 const item=await Deal.findById({"_id":itemId});
 if(item.noOfItemsToBeSold<=0){
    let err=new Error("All items sold");
    err.status=404;
    throw err;
 } else if(item.endTime<new Date().getHours()){
    let err=new Error("Deal Ended");
    err.status=404;
    throw err;
 }else{
     const updateItem=await Deal.updateOne({"_id":itemId},
     {$set:
        {"noOfItemsToBeSold":item.noOfItemsToBeSold-1}
     })
 }
  const user=await UserBuy.create(userDetails);
  
  return user;
}


module.exports = deal;