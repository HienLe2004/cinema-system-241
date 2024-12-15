import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/ve';

export async function createVe(body) {
    return await axios.post(API_URL+`/${body.MaSC}/${body.MaPC}/${body.MaCN}`, body)
}