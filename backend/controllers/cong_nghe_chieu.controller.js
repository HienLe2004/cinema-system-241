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

const createCong_nghe_chieu = async (req, res) => {
    try {
        const { loai } = req.body; // Chỉ cần thông tin "loai" từ request body

        if (!loai) {
            return res.status(400).send({
                success: false,
                message: 'Thiếu trường "loai".',
            });
        }

        // Chạy câu lệnh INSERT
        const query = `INSERT INTO cong_nghe_chieu (loai) VALUES (?)`;
        const [result] = await db.query(query, [loai]);

        res.status(201).send({
            success: true,
            message: 'Công nghệ chiếu đã được thêm thành công.',
            id: result.insertId, // Trả về ID tự động tăng
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi thêm công nghệ chiếu.',
            error: err.message,
        });
    }
};


const updateCong_nghe_chieuByID = async (req,res) => {
    try {
        const cong_nghe_chieuID = req.params.id
        if(!cong_nghe_chieuID){
            return res.status(404).send({
                success:false,
                message:"invalid or missing id"
            })
        }
        const {loai} = req.body;
        if (!loai) {
            return res.status(404).send({
                success:false,
                message:"missing field"
            })
        }
        const data = await db.query(`UPDATE cong_nghe_chieu SET loai = ? WHERE ma_cnc = ?`, [loai,cong_nghe_chieuID]).catch(err => {
            return res.status(404).send({
                success:false,
                message:"invalid UPDATE QUERY",
                err
            })
        })
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "error INSERT QUERY"
            })
        }
        res.status(200).send({
            success:true,
            message:"cap nhat thanh cong"
        })
    }catch(err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in updateCong_nghe_chieuByID API",
            err
        })
    }
}

const deleteCong_nghe_chieuByID = async (req,res) => {
    try{
        const cong_nghe_chieuID = req.params.id
        if (!cong_nghe_chieuID){
            return res.status(404).send({
                success:false,
                message:"missing id"
            })
        }
        const data = await db.query(`DELETE FROM cong_nghe_chieu WHERE ma_cnc = ?`,[cong_nghe_chieuID]).catch(err => {
            return res.status(404).send({
                success:false,
                message:"invalid DELETE QUERY",
                err
            })
        })
        if (!data) {
            return res.status(404).send({
                success:false,
                message:"error DELETE QUERY"        
            })
        }
        res.status(200).send({
            success:true,
            message:"xoa thanh cong"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in deleteCong_nghe_chieuByID API",
            err
        })
    }
}
module.exports = {getCong_nghe_chieu, getCong_nghe_chieuByID, createCong_nghe_chieu, updateCong_nghe_chieuByID, deleteCong_nghe_chieuByID};