import React from 'react'

import {useAppDispatch} from "../../store"
import {Link} from "react-router-dom"
import { setCanEdit,setActiveDiaryId,setCurrentlyEditing } from '../entry/editorSlice'


const DiaryTile:any=({diary}:any)=> {
  const dispatch=useAppDispatch()
  console.log(diary,"diary tile")
    return (
        <div style={{padding:"20px",marginBottom:"26px"}}>
          {/* <h1>sk</h1> */}
          <h1 style={{color:"red"}}>{diary.title}</h1>  
          <button  style={{ width: '50%' ,backgroundColor:"orange"}}  onClick={() =>{
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as String))
            dispatch(setCurrentlyEditing(null))
          
             
          }
        }
        >
          Add New Entry
        </button>
            <Link to={`diary/${diary.id}`} >
          <button style={{ width: '50%' ,backgroundColor:"orange"}}>
          SHOW ENTRY OF THIS EDITOR 
          </button>
        </Link>
        </div>
    )
}

export default DiaryTile
