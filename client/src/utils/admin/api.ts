
import { getUserFailure, getUserStart, getUserSuccess } from "../../redux/slide/userSlide";
import {URL} from "../baseURL";

export const getAllUser = async(user: any, dispatch: any, navigate : any) => {
                dispatch(getUserStart());
                try {
                                         const response = await URL.post('/graphql', {
                                                query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                                variables: {
                                                    'username': user.username,
                                                    'password': user.password
                                                }
                                            })
                                         dispatch(getUserSuccess(response.data));
                }
                catch (err : any) {
                    dispatch(getUserFailure());
                }
     }

export const createDetailUser = async(user: any, dispatch: any, navigate : any) => {
        dispatch(getUserStart());
        try {
                                 const response = await URL.post('/graphql', {
                                        query: `mutation($username: String!, $password: String!) { createUser(username: $username, password: $password, admin: $admin) { message } }`,
                                        variables: {
                                            'username': user.username,
                                            'password': user.password,
                                            'admin': user.admin ?? 0
                                        }
                                    })
                                 dispatch(getUserSuccess(response.data));
        }
        catch (err : any) {
            dispatch(getUserFailure());
        }
}

export const getDetailUser = async(user: any, dispatch: any, navigate : any) => {
        dispatch(getUserStart());
        try {
                                 const response = await URL.post('/graphql', {
                                        query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                        variables: {
                                            'username': user.username,
                                            'password': user.password
                                        }
                                    })
                                 dispatch(getUserSuccess(response.data));
        }
        catch (err : any) {
            dispatch(getUserFailure());
        }
}


export const editDetailUser = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { updateUser(id: $id ,username: $username, password: $password, admin: $admin) { message } }`,
                                    variables: {
                                        'id': user.id,
                                        'username': user.username,
                                        'password': user.password,
                                        'admin': user.admin ?? 0
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const deleteDetailUser = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation(id: Int) { deleteUser(id: $id) { message } }`,
                                    variables: {
                                        'id': user.id
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const getDetailCourses = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const createDetailCourses = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($ten_khoa: String) {ten_khoa: $ten_khoa) { message } }`,
                                    variables: {
                                        'ten_khoa': user.username
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const editDetailCourses = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { updateKhoahoc(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const deleteDetailCourses = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { deleteKhoahoc(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const createDetailSubject = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { createMonhoc(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const getDetailSubject = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const editDetailSubject = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { updateMonhoc(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const deleteDetailSubject = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { deleteMonhoc(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const createDetailQuestion = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { createCauhoi(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const getDetailQuestion = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { register(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}


export const editDetailQuestion = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { updateCauhoi(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const deleteDetailQuestion = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { deleteCauhoi(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}



export const createDetailAnswer = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { createPhuongan(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const editDetailAnswer = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { updatePhuongan(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}

export const deleteDetailAnswer = async(user: any, dispatch: any, navigate : any) => {
    dispatch(getUserStart());
    try {
                             const response = await URL.post('/graphql', {
                                    query: `mutation($username: String!, $password: String!) { deletePhuongan(username: $username, password: $password) { message } }`,
                                    variables: {
                                        'username': user.username,
                                        'password': user.password
                                    }
                                })
                             dispatch(getUserSuccess(response.data));
    }
    catch (err : any) {
        dispatch(getUserFailure());
    }
}