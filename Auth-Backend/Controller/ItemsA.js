const supabase=require('../Model/connect');
const { updateItems } = require('../QueueSystem/ItemsQueue');

//supabase check call for person
const adminCart=async(req,res)=>{
    const category=req.params.category;
    const adm_email=req.userinfo.email;

    try {
        const {data:userData,error:fetchError}=await supabase
        .from("UserData")
        .select('email,role')
        .eq('role','admin')
        .single()
        if(fetchError){
            console.log("fetch error: ",fetchError.message)
            return res.status(500).send({message:"Database Error"})
        }
        if(!userData){
            return res.status(403).send({message:"no data for user"})
        }

        const {data:itemData,error:itemfetchError}=await supabase
        .from('ItemData')
        .select()
        .eq('Category_Name',category)
        if(itemfetchError){
            console.log("error in fetching item: ",itemfetchError.message)
            return res.status(500).send({message:"Database Error"})
        }
        if(!itemData || itemData.length===0){
            return res.status(200).send({message:"no object",obj:[]})
        }        
        return res.status(200).send({message:"Data fetched successfully",obj:itemData})

        //return the object for category based on things in supabase
    } catch (error) {
        return res.status(500).send({message:"server error"})
    }
}

const updateItemData=async(req,res)=>{
    try {
        let val=req.body.obj;
        const email=req.userinfo.email;
        const id=req.userinfo.id

        const {data:userData,error:fetchError}=await supabase
        .from('UserData')
        .select()
        .eq('email',email)
        .single()
        //error and user is admin
        if(fetchError){
            return res.status(500).send({message:"DataBase Error"})
        }
        if(!userData){
            return res.status(400).send({message:"no user with this email"})
        }
        if('admin'!==userData.role){
            return res.status(409).send({message:"not an admin"})
        }

        const queueObj={
            email,
            allData: val
        }
        console.log("backend",queueObj)

       const result=await updateItems(userData.role,queueObj)

       if(result.message==="Queue add operation is complete"){
        const id=result.job;
        //will check in redis instance
        return res.status(200).send({message:"Job Queued"})
       }

       console.log(result.message);
       return res.status(500).send("Queue error")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }
}

module.exports={adminCart,updateItemData}