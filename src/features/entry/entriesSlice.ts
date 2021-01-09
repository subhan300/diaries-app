import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {Entry} from "../../interfaces/entry.interface"
const initialState:Entry[]=[]
const entries=createSlice({
    name:"entries",
    initialState,
    reducers: {
        setEntries(state, { payload }: PayloadAction<Entry[] | null>) {
            console.log(payload,"setentries")
          return (state = payload != null ? payload: []);
       
        },
        updateEntry(state, { payload }: PayloadAction<Entry>) {
            console.log(payload,"updaetentries")
          const { id } = payload;
          console.log(id,"id ai")
          const index = state.findIndex((e) => e.id === id);
          if (index !== -1) {
              console.log(state,"dekh splice kia hai yaha")
            state.splice(index, 1, payload);
          }
        },
      },

})

export const {setEntries,updateEntry} =entries.actions
export default entries.reducer;