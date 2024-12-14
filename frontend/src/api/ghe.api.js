import axios from "axios";
const API_URL = 'http://localhost:8080/api/v1/ghe';
export async function getGheByMaPCAndMaCN(MaPC, MaCN) {
    return await axios.get(API_URL+`/${MaPC}/${MaCN}`)
}
