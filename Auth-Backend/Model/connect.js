
const  {createClient}  =require( '@supabase/supabase-js')

const connect=()=>{
    try {
        const supabaseUrl = process.env.SUPABASE_CONNECTION
        const supabaseKey = process.env.SUPABASE_KEY
        const supabase = createClient(supabaseUrl, supabaseKey)
        setTimeout(()=>console.log("Connected to SupaBase"),1000)
    } catch (error) {
        console.log(error);
    }finally{
        console.log("Tried Supabase connection")
    }
    
}

module.exports =connect;