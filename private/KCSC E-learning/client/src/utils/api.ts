import { loginStart, loginFailure, loginSuccess, registerStart, registerSuccess, registerFailure } from "../redux/slide/authSlide";
import {URL} from "./baseURL";


export const loginUser = async(user: any, dispatch: any, navigate : any, toast: any) => {
           dispatch(loginStart());
           try {
            const response = await URL.post('/graphql', {
               query: `mutation($username: String!, $password: String!) { login(username: $username, password: $password) {userInformation {id username}, token, refreshToken } }`,
                   variables: {
                       'username': user.username,
                       'password': user.password
                    }
               })
            
            if (response.data.data.login){
                dispatch(loginSuccess(response.data.data));
                toast.clearWaitingQueue();
                toast('Login success!', { type: 'success' });
                navigate("/dashboard/course");
            } else {
                toast.clearWaitingQueue();
                toast('Username or password incorrect', { type: 'error'});
            }
            
           }
       catch (err : any) {
            dispatch(loginFailure());
            toast.clearWaitingQueue();
            toast('Something is wrong', { type: 'error'});
        }
}

export const registerUser = async(user: any, dispatch: any, navigate : any, toast: any) => {
                                        dispatch(registerStart());
                                        try {
                                            const response = await URL.post('/graphql', {
                                                                        query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                                                        variables: {
                                                                            'username': user.username,
                                                                            'password': user.password
                                                                        }
                                                                    })
                                            
                                                                    if (response.data.data.register){
                                                                        dispatch(registerSuccess(response.data.data));
                                                                        toast.clearWaitingQueue();
                                                                        toast('Register success!', { type: 'success' });
                                                                        navigate("/login");
                                                                    } else {
                                                                        dispatch(registerFailure());
                                                                        toast.clearWaitingQueue();
                                                                        toast('Username already exist', { type: 'error'});
                                                                    }
                                                                 
                                        }
                                        catch (err : any) {
                                            dispatch(registerFailure());
                                            toast.clearWaitingQueue();
                                            toast('Something is wrong', { type: 'error'});
                                        }
                             }

export const logOutUser = async(token: string, navigate : any) => {
                                try {
                                                         const response = await URL.post('/graphql', {
                                                                query: `mutation { logout { success message } }`
                                                            },
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                        )
                                                        
                                                        return response.data.data.logout;
                                }
                                catch (err : any) {
                                }
                     }

export const getAllSubjects = async(token?: string) => {
                                try {
                                    const response = await URL.post('/graphql', {
                                        query: `query { monhocs { id ten_mon } }`,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )

                                 return response.data.data;
                                }
                                catch (err : any) {
                                    
                                }
                     }

export const getAllCourses = async(token?: string) => {
                        try {
                            const response = await URL.post('/graphql', {
                                query: `query { khoahocs { id ten_khoa } }`,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )

                         return response.data.data;
                        }
                        catch (err : any) {
                            
                        }
             }          

export const getAllQuestions = async(token?: string) => {
                try {
                    const response = await URL.post('/graphql', {
                        query: `query { cauhois { id noi_dung phuongan { id noi_dung dung } } }`,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                 return response.data.data;
                }
                catch (err : any) {
                    
                }
     }