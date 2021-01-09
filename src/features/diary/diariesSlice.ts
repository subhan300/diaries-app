import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import {Diary} from "../../interfaces/diary.interface"

let initialState:Diary[]=[
 
]

const diaries=createSlice({
    name: 'diaries',
  initialState,
  reducers: {
    addDiary(state, { payload }: PayloadAction<Diary[]>) {
      console.log(initialState,"check")
        console.log(payload,"payload addDiary")
      // const diariesToSave = payload.filter((diary) => {
      //   return state.findIndex((item) => item.id === diary.id) === -1;
      // });
      // console.log(payload,"diaries to save")
      state.push(...payload);
    },
    updateDiary(state, { payload }: PayloadAction<Diary>) {
      const { id } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
}
}
})

export const { addDiary,updateDiary} = diaries.actions;

export default diaries.reducer;