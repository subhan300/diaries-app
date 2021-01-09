
import React,{useState,useRef} from 'react'
import {useSelector} from "react-redux"
import {RootState} from "../../rootReducer"
import http from '../../services/api';
import { Diary } from '../../interfaces/diary.interface';
import { User } from '../../interfaces/user.interface';
import DiaryTile from "./DiaryTile";
import DiaryEntriesList from "./DiaryEntriesList";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import {addDiary} from '../diary/diariesSlice';

import {useAppDispatch} from "../../store"
import {setUser} from "../auth/userSlice"

const DiaryPosts:any=()=> {

  const dispatch=useAppDispatch()
  const DIARIES_MAP = useSelector((state: RootState) => state.addDiary);
  // console.log(DIARIES_MAP,"KS")
    const USER = useSelector((state:RootState) =>state.user);
    // console.log(USER,"seecto")
    const Title=useRef()
    const Type=useRef()
    const [title,SetTitle]:any=useState("")
    const [type,SetType]:any=useState("private")
  
   
    const PostDiary:any=async()=>{
        const DiaryForm={
            title:title,
            type:type,
            userId:USER?.id}


    
        const { diary, user: _user } = await http.post<Partial<Diary>,
        { diary: Diary; user: User } >
      ('/diaries/',DiaryForm);
      if (diary && USER){
        // dispatch(addDiary([diary as Diary]))
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));

      }

    }
    return(
        <div>
         <div style={{display:"flex",justifyContent:"center",color:"violet",fontSize:"30px",fontWeight:"bold",

    }}> <h1 style={{}}>ADD DIARIES </h1>
</div>
<Router>
  <Switch>
  <Route path="/diary/:id" component={DiaryEntriesList}>
        
        </Route>
    <Route path="/">
<div style={{padding:"50px",margin:"20px"}}>


<label style={{fontSize:"20px",fontWeight:"bold",padding:"50px",color:"blue"}}>Give Your Title &nbsp;:</label>
<input style={{border:"2px solid blue",height:"30px"}} placeholder="enter title here" id="title" value={title}
onChange={(e)=>SetTitle(e.currentTarget.value)}></input>
<div style={{padding:"10px",textAlign:"left",marginLeft:"25px"}}>

<input  type="radio" id="public" name="type" value="public" onChange={(e)=>SetType(e.currentTarget.value)} />
<label htmlFor="public" style={{color:"blue",fontSize:"17px",fontWeight:"bold"}}>public</label>

<input type="radio" id="private" name="type" value="private" onChange={(e)=>SetType(e.currentTarget.value)}  />
<label htmlFor="private" style={{color:"blue",fontSize:"17px",fontWeight:"bold"}}>private</label>
</div>

<div><button onClick={PostDiary}  style={{ width: '50%' ,backgroundColor:"orange"}}>ADD DIARY</button></div>
</div>

<hr></hr>

<h1 style={{color:"green"}}>YOUR DIARIES ARE HERE</h1>
{
DIARIES_MAP.map(

  (val)=>{
  return(
  <DiaryTile  diary={val} />
)}

)

}
    
    </Route>
  </Switch>
</Router>
        

            
        </div>
    )
}

export default DiaryPosts
