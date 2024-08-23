import { loginStart, loginFailure, loginSuccess, registerStart, registerSuccess, registerFailure } from "../redux/slide/authSlide";
import { getcoursesFailure, getcoursesStart, getcoursesSuccess } from "../redux/slide/courseSlide";
import { getSubjectsFailure, getSubjectsStart, getSubjectsSuccess } from "../redux/slide/subjectSlide";
import {URL} from "./baseURL";


export const loginUser = async(user: any, dispatch: any, navigate : any) => {
           dispatch(loginStart());
           try {
            const response = await URL.post('/graphql', {
               query: `mutation($username: String!, $password: String!) { login(username: $username, password: $password) {userInformation {id username}, token, refreshToken } }`,
                   variables: {
                       'username': user.username,
                       'password': user.password
                    }
               })
            console.log(response.data.data);
            dispatch(loginSuccess(response.data.data));
           }
       catch (err : any) {
            dispatch(loginFailure());
}
}

export const registerUser = async(user: any, dispatch: any, navigate : any) => {
                                        dispatch(registerStart());
                                        try {
                                                                 const response = await URL.post('/graphql', {
                                                                        query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                                                        variables: {
                                                                            'username': user.username,
                                                                            'password': user.password
                                                                        }
                                                                    })
                                                                 dispatch(registerSuccess(response.data));
                                        }
                                        catch (err : any) {
                                            dispatch(registerFailure());
                                        }
                             }

export const logOutUser = async(user: any, dispatch: any, navigate : any) => {
                                dispatch(registerStart());
                                try {
                                                         const response = await URL.post('/graphql', {
                                                                query: `mutation($username: String!, $password: String!) { logout(username: $username, password: $password) { message } }`,
                                                                variables: {
                                                                    'username': user.username,
                                                                    'password': user.password
                                                                }
                                                            })
                                                         dispatch(registerSuccess(response.data));
                                }
                                catch (err : any) {
                                    dispatch(registerFailure());
                                }
                     }


export const getAllSubjectsOfCourse = async(user: any, dispatch: any, navigate : any) => {
                                dispatch(getSubjectsStart());
                                try {
                                                         const response = await URL.post('/graphql', {
                                                                query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                                                variables: {
                                                                    'username': user.username,
                                                                    'password': user.password
                                                                }
                                                            })
                                                         dispatch(getSubjectsSuccess(response.data));
                                }
                                catch (err : any) {
                                    dispatch(getSubjectsFailure());
                                }
                     }


export const getAllCourses = async(user: any, dispatch: any, navigate : any) => {
                        dispatch(getcoursesStart());
                        try {
                                                 const response = await URL.post('/graphql', {
                                                        query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                                        variables: {
                                                            'username': user.username,
                                                            'password': user.password
                                                        }
                                                    })
                                                 dispatch(getcoursesSuccess(response.data));
                        }
                        catch (err : any) {
                            dispatch(getcoursesFailure());
                        }
             }

