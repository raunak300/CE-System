const supabase=require('../Model/connect')

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
            return res.status(403).send({message:"no data for this category"})
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

        console.log(itemData)
        return res.status(200).send({message:"Data fetched successfully",obj:itemData})

        //return the object for category based on things in supabase
    } catch (error) {
        return res.status(500).send({message:"server error"})
    }
}

module.exports={adminCart}