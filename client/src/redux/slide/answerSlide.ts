import { createSlice } from "@reduxjs/toolkit";

const answerSlide = createSlice({
    name: "answer",
    initialState: {
    answers : {
     allanswers : null,
     isFetching : false,
     error : false  
    }
  },
    reducers : {
      getanswersStart: (state) => {
          state.answers.isFetching = true;
      },
      getanswersSuccess: (state, action: any) => {
        state.answers.isFetching = false;
        state.answers.allanswers = action.data;
        state.answers.error = false;
      },
      getanswersFailure: (state) => {
       state.answers.isFetching = false;
       state.answers.error = true;
      }
    }
})

export const {
   getanswersStart,
   getanswersFailure,
   getanswersSuccess
} = answerSlide.actions;

export default answerSlide.reducer;