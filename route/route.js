const express=require ('express');
const router=express.Router();
const contact=require("../models/contacts");
//retriveing contact
router.get("/contacts",(req,res)=>{
    contact.find((err,contacts)=>{
        res.json(contacts);
    })
})
//retriveing contact based on particular name
router.get("/contacts/:firstname",(req,res)=>{
    var query = { first_name: req.params.firstname };
    contact.find(query,(err,contacts)=>{
        res.json(contacts);
    })
})
//update contact
router.put("/contactupdate/:firstname",(req,res)=>{
    console.log(req.params.firstname+" "+req.body.Phone);
    var myquery = { first_name: req.params.firstname };
    var newvalues = { $set: {Phone: req.body.Phone} };
    contact.updateOne(myquery, newvalues,(err,contact)=>{
        if(err){
            res.json({msg:"failed to update contact"});
        }else{
            res.json({msg:"contact updated successfully"});   
        }
    })
})
//add contact
router.post("/contact",(req,res)=>{
    let newcontact=new contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        Phone:req.body.Phone
    })
    newcontact.save((err,contact)=>{
        if(err){
            res.json({msg:"failed to add contact"});
        }else{
            res.json({msg:"contact added successfully"});   
        }
    })
})

//deleting contact
router.delete("/contact/:id",(req,res)=>{
    contact.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
                }else{
                    res.json(result);
                }
    })
})

module.exports=router;