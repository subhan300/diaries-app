import React,{FC} from 'react';
import DiaryPosts from "../diary/Diary";
import Editor from "../entry/Editor";
const Home=()=>{
    
    return(
       <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
       
       <DiaryPosts />

<Editor />

       </div>
    )
}
export default Home
