import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/ve_co_do_mua_kem';

export async function createVeCoDoMuaKem(body) {
    return await axios.post(API_URL, body)
}