const supabase=require('../Model/connect')
const bcrypt=require('bcrypt')
const jwt =require( 'jsonwebtoken');

const isEmail = (email) => {
  const nmail = email.trim();
  if (nmail.length === 0) return { message: "Email cannot be empty", bool: false };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(nmail)) return { message: "Invalid email format", bool: false };
  return { message: "Valid email", bool: true };
};
const ispassword = (password) => {
  const npass = password.trim();
  if(password.length!=npass.length)return {message:"Password have whitespaces",bool:false}
  if (npass.length === 0) return { message: "Password cannot be empty", bool: false };
  if (npass.length < 8) return { message: "Password must be at least 8 characters", bool: false };

  let capital = 0;
  let special = 0;
  let small = 0;
  let numeric = 0;
  const specialChars = "!@#$%&*^";

  for (let i = 0; i < npass.length; i++) {
    if (npass[i] >= 'a' && npass[i] <= 'z') {
      small++;
    } else if (npass[i] >= 'A' && npass[i] <= 'Z') {
      capital++;
    } else if (npass[i] >= '0' && npass[i] <= '9') {
      numeric++;
    } else if (specialChars.includes(npass[i])) {
      special++;
    } else {
      return { message: "Password contains invalid characters", bool: false };
    }
}
  if (small === 0) return { message: "Password must include a lowercase letter", bool: false };
  if (capital === 0) return { message: "Password must include an uppercase letter", bool: false };
  if (numeric === 0) return { message: "Password must include a number", bool: false };
  if (special === 0) return { message: "Password must include a special character (!@#$%&*^)", bool: false };

  return { message: "Valid password", bool: true };
};

const signup=async(req,res)=>{
    const {name,email,address,password}= req.body;
    if(name.trim()===""){
        return res.status(400).send({message: "name is empty"})
    }
    const emailcheck=isEmail(email)
    if(emailcheck.bool===false){
        return res.status(400).send({message: emailcheck.message})
    }

    const passwordcheck=ispassword(password)
    if(passwordcheck.bool===false){
        return res.status(400).send({message:passwordcheck.message})
    }
    
    if(address.trim().length===0){return res.status(400).send({message:"address is issue here"})}

    //all input are checked till here 
    //find person with same email exist in userDB of supabase

    //supabase query
    const { data:existingUser, error:fetchError } = await supabase
    .from('UserData')
    .select('*')
    .eq('email',email)
    .single()

    if (fetchError && fetchError.code !== "PGRST116") {   //PGRST116 is counted in error only
        return res.status(500).send({ message: "Database error" });
    }


    if(existingUser){
        return res.status(409).send({message:"User Already Exist"});  //409 is conflict issues
    }

    //no user exist till now
    //will use bcrypt to have new password 

    const npass=await bcrypt.hash(password,10);

    const {data:storedUser,error:insertError}=await supabase
    .from('UserData')
    .insert([{name,email,password:npass,address}])
    .select() //return inserted rows

    if(insertError){
        return res.status(500).send({message:insertError.message})
    }

    console.log(storedUser)
    //need to make token and store it in cookies

    const userToken=jwt.sign({
        email, userid:storedUser[0].id
    },
    process.env.JWT_SIGN

    )

    res.cookie("userCookie",userToken,{
        httpOnly: true,
        secure:true,
        sameSite:'none',
        maxAge: 24*60*60*1000
    })

    return res.status(201).send({message:" Account made successfully", 
        data:{
            name:storedUser[0].name,
            email:storedUser[0].email,
            address:storedUser[0].address,
            cart:[],

        }
    })

}

const login=async(req,res)=>{

    const {email,password}=req.body;
    
    const emailcheck=isEmail(email)
    if(emailcheck.bool===false){
        return res.status(400).send({message: emailcheck.message})
    }

    const passwordcheck=ispassword(password)
    if(passwordcheck.bool===false){
        return res.status(400).send({message:passwordcheck.message})
    }

    //email and password are okay it is now time to find user in db based on email

    const {data:userData,error:fetchError}=await supabase
    .from('UserData')
    .select('*')
    .eq('email',email)
    .single()

    if(fetchError){
        if(fetchError.code==='PGRST116'){
            return res.status(400).send({message:"no user exist with same email"})
        }
        return res.status(500).send({message:"Database Error"})
    }

    //user is found and exist at data[0]

    const check= await bcrypt.compare(password,userData[0].password)
    if(check===false){
        return res.status(409).send({message:"password does not match"})
    }

     const userToken=jwt.sign({
        email, userid:userData.id
    },
    process.env.JWT_SIGN

    )

    const {data:cartData,error:fetcherror}=await supabase
    .from('CartData')
    .select('*')
    .eq('user_id',userData.id)

    let cart=[]

    if(fetcherror){
        if(fetcherror.code!=='PGRST116'){
            return res.status(500).send({message:"Database Failed"})
        }
    }

    if(cartData && cartData.length>0){
        cart=[...cartData]  
    }

    res.cookie("userCookie",userToken,{
        httpOnly: true,
        secure:true,
        sameSite:'none',
        maxAge: 24*60*60*1000
    })

    return res.status(200).send({message:"user logged in succesfully",
         data:{
            name:userData.name,
            email:userData.email,
            address:userData.address,
            cart:cart,

        }
    })

}

module.exports={login,signup}