import axios from "axios";
const API_URL = 'http://localhost:8080/api/v1/ghe-da-dat';
export async function getGheDaDatByMaPCAndMaCN(MaSC, MaPC, MaCN) {
    try{
        const data = await axios.get(API_URL+`/${MaSC}/${MaPC}/${MaCN}`)
        return data
    }
    catch(err){
       return {data:{}}
    }
}
