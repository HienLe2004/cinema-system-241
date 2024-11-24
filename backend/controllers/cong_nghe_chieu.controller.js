const db = require("../config/db");

const getCong_nghe_chieu = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM cong_nghe_chieu')
        if (!data) {
            return res.status(404).send({
                success:false,
                message:"not found any records"
            })
        }
        res.status(200).send({
            success:true,
            message:"all cong_nghe_chieu",
            data: data[0]
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in getCong_nghe_chieu API"
        })
    }
}

const getCong_nghe_chieuByID = async (req,res) => {
    try{
        const cong_nghe_chieuID = req.params.id
        if (!cong_nghe_chieuID) {
            return res.status(404).send({
                success:false,
                message:'invalid or missing id'
            })
        }
        const data = await db.query(`SELECT * FROM cong_nghe_chieu WHERE ma_cnc=${cong_nghe_chieuID}`)
        if (!data) {
            return res.status(404).send({
                success:false,
                message:"not found any records"
            })
        }
        res.status(200).send({
            success:true,
            cong_nghe_chieu: data[0]
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"error in getCong_nghe_chieuByID API",
            err
        })
    }
}

const createCong_nghe_chieu = async (req,res) => {
    try {
        const {ma_cnc, loai} = req.body
        if (!ma_cnc || !loai) {
            return res.status(500).send({
                success:false,
                message:'missing field'
            })
        }
        const data = await db.query(`INSERT INTO cong_nghe_chieu (ma_cnc, loai) VALUES (?,?)`,[ma_cnc,loai]).catch(err => {
            return res.status(500).send({
                success:false,
                message:"invalid INSERT QUERY"
            })
        })
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "error INSERT QUERY"
            })
        }
    }catch(err) {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"error in createCong_nghe_chieu API",
            err
        })
    }
}
module.exports = {getCong_nghe_chieu, getCong_nghe_chieuByID, createCong_nghe_chieu};