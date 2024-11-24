import { createSlice } from "@reduxjs/toolkit";

const subjectSlide = createSlice({
    name: "subject",
    initialState: {
    subjects : {
     allSubjects : null,
     isFetching : false,
     error : false  
    }
  },
    reducers : {
      getSubjectsStart: (state) => {
          state.subjects.isFetching = true;
      },
      getSubjectsSuccess: (state, action: any) => {
        state.subjects.isFetching = false;
        state.subjects.allSubjects = action.data;
        state.subjects.error = false;
      },
      getSubjectsFailure: (state) => {
       state.subjects.isFetching = false;
       state.subjects.error = true;
      }
    }
})

export const {
   getSubjectsStart,
   getSubjectsFailure,
   getSubjectsSuccess
} = subjectSlide.actions;

export default subjectSlide.reducer;