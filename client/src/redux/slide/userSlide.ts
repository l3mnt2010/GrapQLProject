import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
    name: "user",
    initialState: {
    getAllUser : {
     allUser : null,
     isFetching : false,
     error : false  
    },
    getDetailUser : {
        detailUser : null,
        isFetching : false,
        error : false  
    },
    deleteUser : {
      success : false,
      isFetching : false,
      error : false  
     }

  },
    reducers : {
      getUserStart: (state : any) => {
          state.getAllUser.isFetching = true;
      },
      getUserSuccess: (state, action: any) => {
        state.getAllUser.isFetching = false;
        state.getAllUser.allUser = action.allUser;
        state.getAllUser.error = false;
      },
      getUserFailure: (state) => {
       state.getAllUser.isFetching = false;
       state.getAllUser.error = true;
      },

      getDetailUserStart: (state : any) => {
                                        state.getDetailUser.isFetching = true;
                                    },
      getDetailUserSuccess: (state, action: any) => {
                                      state.getDetailUser.isFetching = false;
                                      state.getDetailUser.detailUser = action.detailUser;
                                      state.getDetailUser.error = false;
                                    },
      getDetailUserFailure: (state) => {
                                     state.getDetailUser.isFetching = false;
                                     state.getDetailUser.error = true;
                                    },
                              

      deleteUserStart: (state : any) => {
        state.deleteUser.isFetching = true;
      },
      deleteUserSuccess: (state, action: any) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.success = action.data;
      state.deleteUser.error = false;
      },
      deleteUserFailure: (state) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.error = true;
      }
    }
})

export const {
   getUserFailure,
   getUserSuccess,
   getUserStart,
   deleteUserFailure,
   deleteUserStart,
   deleteUserSuccess
} = userSlide.actions;

export default userSlide.reducer;