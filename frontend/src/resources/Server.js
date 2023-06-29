
import axios from 'axios';

import { getAuthToken } from "./User"

const BASE_URL = process.env.REACT_APP_BACKEND_URL
// const BASE_URL = "http://localhost"

export const FILES_UPLOAD_URL = `${BASE_URL}/api/files`
export const GLOGIN_URL = `${BASE_URL}/api/user/glogin`


export async function login(email, password) {
    const response = await axios.post(
        `${BASE_URL}/api/user/login`, { email, password },
        {withCredentials: true}
    );

    return response
}



export async function getFileList(curPage, pageSize) {
    console.log("getFileList", getAuthToken())
    const response = await axios.get(
        `${BASE_URL}/api/files?page=${curPage}&size=${pageSize}`,
        { headers: getAuthHeaders() }
    );

    return response
}


export function getAuthHeaders() {
    return {"Authorization": `Bearer ${getAuthToken()}`};
}
