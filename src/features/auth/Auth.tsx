
import React, { FC, useState,useRef } from 'react';
import { User } from '../../interfaces/user.interface';
import http from '../../services/api';
import { saveToken, setAuthState } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../services/mirage/routes/user';
import { useAppDispatch } from '../../store';
function Auth() {
  const[isLogin,SetIsLogin]=useState(true)
  const Susername:any=useRef()
 const Semail:any=useRef()
 const Spassword:any=useRef()
 
 const Lemail:any=useRef()
 const Lpassword:any=useRef()
 const[Signup_User_Name,Set_Signup_User_Name]:any=useState("")
 const[Signup_Email,Set_Signup_Email]:any=useState("")
 const[Signup_Password,Set_Signup_Password]:any=useState("")
 const[Login_Email,Set_Login_Email]:any=useState("")
 const[Login_Password,Set_Login_Password]:any=useState("")
const dispatch=useAppDispatch()
  const Add:any=()=>{
    const obj:any={username:Signup_User_Name,email:Signup_Email,password:Signup_Password}

    // fetch("https://diaries.app/auth/Signup",{method:"post",body:JSON.stringify(obj)}).catch(error=>{console.log(error)})
    // const path = isLogin ? '/auth/login' : '/auth/signup';
    http
      .post<User, AuthResponse>("/auth/Signup",obj)
      .then((res) => {
        if (res) {
          const { user, token } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }


  

  const Login:any=()=>{
    const obj:any={username:Signup_User_Name,password:Login_Password}

    // fetch("https://diaries.app/auth/login",{method:"post",body:JSON.stringify(obj)})
    // .then((data)=>{console.log(data,"data")})
    // .catch(error=>{console.log(error)})
    http
    .post<User, AuthResponse>("/auth/login",obj)
    .then((res) => {
      if (res) {
        const { user, token } = res;
        dispatch(saveToken(token));
        dispatch(setUser(user));
        dispatch(setAuthState(true));
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>
{isLogin?   <div>
     <h1 style={{color:"red",padding:"20px"}}>LOGIN USER</h1>
     <input required
   style={{padding:"10px",marginLeft:"10px"}} ref={Lemail} placeholder="username" onChange={(e)=>Set_Login_Email(e.currentTarget.value)}></input>
<input required style={{padding:"10px",marginLeft:"10px"}} ref={Lpassword} placeholder="password"  onChange={(e)=>Set_Login_Password(e.currentTarget.value)}></input>

<div><button style={{backgroundColor:"orange",padding:"10px",width:"180px",margin:"14px"}} onClick={()=>Login()}>login</button></div>
<p onClick={()=>SetIsLogin(false)} style={{marginLeft:"20px",color:"blue",fontSize:"24px"}}>create a account if not</p>

   </div> :<div>
<h1 style={{color:"red",padding:"20px"}}>SIGNUP FROM HERE</h1>
<form>
<input required style={{padding:"10px",marginLeft:"10px"}} placeholder="name" ref={Semail}  onChange={(e)=>Set_Signup_User_Name(e.target.value)}></input>
<input required style={{padding:"10px",marginLeft:"10px"}} placeholder="password" ref={Spassword}  onChange={(e)=>Set_Signup_Password(e.target.value)}></input>
<div style={{padding:"10px"}} ><input required style={{padding:"10px"}} type="email" placeholder="email" ref={Susername}  onChange={(e)=>Set_Signup_Email(e.target.value)}></input></div>
</form>
<div>
<button style={{backgroundColor:"orange",padding:"10px",width:"180px",margin:"14px"}}  onClick={()=>Add()}>SIGN UP</button></div>
<p style={{marginLeft:"20px",color:"blue",fontSize:"24px"}} onClick={()=>SetIsLogin(true)}>LOGIN,IF ALREADY HAVE ACCOUNT</p>
</div>
}


    </div>
   
  );
}

export default Auth;
