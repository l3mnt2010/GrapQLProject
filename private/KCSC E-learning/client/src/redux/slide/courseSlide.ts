import { createSlice } from "@reduxjs/toolkit";

const courseSlide = createSlice({
    name: "course",
    initialState: {
    courses : {
     allcourses : null,
     isFetching : false,
     error : false  
    }
  },
    reducers : {
      getcoursesStart: (state) => {
          state.courses.isFetching = true;
      },
      getcoursesSuccess: (state, action: any) => {
        state.courses.isFetching = false;
        state.courses.allcourses = action.data;
        state.courses.error = false;
      },
      getcoursesFailure: (state) => {
       state.courses.isFetching = false;
       state.courses.error = true;
      }
    }
})

export const {
   getcoursesStart,
   getcoursesFailure,
   getcoursesSuccess
} = courseSlide.actions;

export default courseSlide.reducer;