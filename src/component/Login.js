import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Login(props) {
let history =  useHistory();
const [cred, setcred] = useState({email:"",password:""})

useEffect(() => {
  window.scrollTo(0, 0)
}, [])

const handleSubmit=async(e)=>{

     e.preventDefault();
    console.log(cred.email);
    console.log(cred.password);
     const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/login`, {
        method: 'POST',
  
        headers: {
          'Content-Type': 'application/json',
        //  'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3NTQyMmJhNTliYzkwMDA2ZGE3MTVjIn0sImlhdCI6MTYzNTA3NDcxNX0.dGgMjnKsL7r5JR9KNwFYwRMzxKe5Mxtn1sgScJHT7nY"
        },
       body: JSON.stringify({email:cred.email,password:cred.password })
      });
      const json = await response.json();
      if(json.success){
          localStorage.setItem('token',json.authtoken)
          history.push('/home')
          window.location.reload();
      }
      else{
        props.showAlret(json.error,'warning')
      }
      console.log(json)
}
let onChange=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value})
}
    return (
        <div className="container loginContainer">
        <h2 className="loginHeading">Login to Store</h2>
           <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onChange} value={cred.email} aria-describedby="emailHelp" placeholder="Enter email"/>
     </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="password" name="password" onChange={onChange} value={cred.password} placeholder="Password"/>
  </div>
  <button type="submit" class="btn btn-primary btn-block submit_btn">Submit</button>
</form>
<Link to="/signup" >creat account</Link>
        </div>
    )
}