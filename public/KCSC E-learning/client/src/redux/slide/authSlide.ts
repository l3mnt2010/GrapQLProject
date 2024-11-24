import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
    name: "auth",
    initialState: {
    login : {
     currentUser : null,
     isFetching : false,
     error : false  
    },
    register : {
      success : false,
      isFetching : false,
      error : false  
     }
  },
    reducers : {
      loginStart: (state : any) => {
        state.login.isFetching = true;
      },
      loginSuccess: (state, action: any) => {
        state.login.isFetching = false;
        state.login.currentUser = action.payload.login;
        state.login.error = false;
      },
      loginFailure: (state) => {
       state.login.isFetching = false;
       state.login.currentUser = null;
       state.login.error = true;
      },
      registerStart: (state : any) => {
        state.register.isFetching = true;
      },
      registerSuccess: (state, action: any) => {
      state.register.isFetching = false;
      state.register.success = action.data;
      state.register.error = false;
      },
      registerFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
      }
    }
})

export const {
   loginFailure,
   loginSuccess,
   loginStart,
   registerFailure,
   registerStart,
   registerSuccess
} = authSlide.actions;

export default authSlide.reducer;