import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/phim_co_htc';

export async function getPhimCoHTCByMaP(id) {
    return await axios.get(API_URL+`/${id}`)
}