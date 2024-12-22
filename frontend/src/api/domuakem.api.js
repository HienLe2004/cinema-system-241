import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/do_mua_kem';

export async function getDoMuaKem() {
    return await axios.get(API_URL)
}