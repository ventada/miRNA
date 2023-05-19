import React , {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer, toast , } from 'react-toastify'
import axios from 'axios'
export default function Login() {

  
    const navigate = useNavigate();

    const [values , setValues] = useState({
        email:"",
        password:""
    })

    const generateError =(err)=> toast.error(err,{position:"bottom-right"})
    
   async function handleSubmit(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post("/auth/login",{
                ...values
            },{
                withCredentials:true
            })
        
            console.log(data);
            if(data){
                    if(data.errors){
                        const {email , password, msg} = data.errors
                     
                        if(email) generateError(email)
                         if (msg) generateError(msg)
                         if(password) generateError(password)
                        
                    }else{                       
                            
                            navigate('/')
                       
                    }
            }

        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className='container'>

        <h2>Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email'onChange={(e)=> setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password">PassWord</label>
                <input type="password" name='password' placeholder='Email'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>

            <button type='submit'>submit</button>

            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
        <ToastContainer/>
    </div>
  )
}
