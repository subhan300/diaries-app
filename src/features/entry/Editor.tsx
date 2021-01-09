import React,{useState,FC,useEffect} from "react"
import {useSelector} from "react-redux"
import {RootState} from "../../rootReducer"

import { Entry } from '../../interfaces/entry.interface';
import { Diary } from '../../interfaces/diary.interface';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import {setEntries,updateEntry} from "./entriesSlice"
import {updateDiary} from "../../features/diary/diariesSlice"
import {useAppDispatch} from "../../store"
import http from "../../services/api";
import DiaryEntriesList from "../diary/DiaryEntriesList";
const Editor:FC=()=>{
    const{currentlyEditing:entry,canEdit,activeDiaryId}=useSelector((state:RootState)=>state.editor)
    const [editedEntry,updatedEditedEntry]=useState(entry)
    const dispatch=useAppDispatch();
    console.log(entry,"hai kia yah")
    const saveEntry=async()=>{
        if(activeDiaryId==null){
            return alert("plz select a diary")
        }
        if (entry==null){
            http.post<Entry,{diary:Diary;entry:Entry}>(
                `/diaries/entry/${activeDiaryId}`,editedEntry
            ) .then((data) => {
                if (data != null) {
                  const { diary, entry: _entry } = data;
                  console.log(_entry,"_entry",">>>>data",data)
                  dispatch(setCurrentlyEditing(_entry));
                  // dispatch(updateEntry(_entry));
                  //  dispatch(setEntries([_entry]))
                  dispatch(updateDiary(diary));
             
                }
              });
          }
          else {
            http
              .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
              .then((_entry) => {
                if (_entry != null) {
                  console.log(_entry,"entry editor mai ")
                  dispatch(setCurrentlyEditing(_entry))   ;
                   
                  // ;yeh q nahi chala dekhna logic aiski
                  dispatch(updateEntry(_entry));
                  // dispatch(setEntries([_entry]))
             
             
              
                }
              });
          }
          dispatch(setCanEdit(false));
        };
      
        useEffect(() => {
            updatedEditedEntry(entry);
          }, [entry]);
        
    
    return(
        <div>

<div className="entryTitleHeader">
{entry && !canEdit ? (
          <h4>
            {entry.title}
            <a
              href="#edit"
              onClick={(e) => {
                e.preventDefault();
                if (entry != null) {
                  dispatch(setCanEdit(true));
                }
              }}
             
            >
              (Edit)
            </a>
          </h4>
        ) : (
          <input style={{height:"20px"}}
            value={editedEntry?.title ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedEntry) {
                updatedEditedEntry({
                  ...editedEntry,
                  title: e.target.value,
                });
              } else {
                updatedEditedEntry({
                  title: e.target.value,
                  content: '',
                });
              }
            }}
          />
        )}

        <div>
        {entry && !canEdit ? (
 <div>
        {entry.content}
 </div>
      ) : (
        <>
          <textarea style={{height:"200px"}}
            disabled={!canEdit}
            placeholder="Supports markdown!"
            value={editedEntry?.content ?? ''}
            onChange={(e) => {
              if (editedEntry) {
                updatedEditedEntry({
                  ...editedEntry,
                  content: e.target.value,
                });
              } else {
                updatedEditedEntry({
                  title: '',
                  content: e.target.value,
                });
              }
            }}
          />
      <div style={{padding:"20px"}}>   <button style={{width:"120px",height:"30px",backgroundColor:"orange"}} onClick={saveEntry} disabled={!canEdit}>
            Save
          </button></div>
        </>
      )}
        </div>
</div>



        </div>
    )
}
export default Editor