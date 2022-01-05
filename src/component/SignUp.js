import React, { useState, useContext, useEffect } from 'react'
import shopContext from '../context/shops/shopContext';
import { useHistory } from "react-router-dom";

function SignUp() {
let history= useHistory();
const [cred, setcred] = useState({name:"",email:"",password:""})

const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/createUser`, {
        method: 'POST',
  
        headers: {
          'Content-Type': 'application/json',
            },
       body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password })
      });
      const json = await response.json();
      if(json.success){
          localStorage.setItem('token',json.authtoken)
          history.push('/home')
      }
      console.log(json)
}

let onChange=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value})
}
    return (
        <div>
        <div className="container singUpContainer">
        <h2>Create an account</h2>
     <form onSubmit={handleSubmit}>
     <div className="form-group">
    <label for="exampleInputEmail1">Enter Name</label>
    <input type="text" className="form-control" id="name" name="name" value={cred.name} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Name"/>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={cred.email} onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={cred.password} onChange={onChange}  placeholder="Password"/>
  </div>

  <button type="submit" className="btn btn-primary btn-block submit_btn">Submit</button>
</form> </div>
        </div>
    )
}

export default SignUp
