import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/phim';

export async function getAllPhim() {
    return await axios.get(API_URL)
}