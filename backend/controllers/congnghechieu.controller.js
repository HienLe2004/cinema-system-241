const db = require("../config/db");

// Get all CongNgheChieu
const getCongNgheChieu = async (req, res) => {
    try {
        const query = 'CALL GetAllCongNgheChieu()';
        const [rows] = await db.query(query); 

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Cong Nghe Chieu found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Cong Nghe Chieu retrieved successfully",
            data: rows,  // Return the rows directly
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getCongNgheChieu API",
            error: err.message,
        });
    }
};

// Get a CongNgheChieu by ID
const getCongNgheChieuByID = async (req, res) => {
    try {
        const maCNC = req.params.id;
        if (!maCNC) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid CongNgheChieu ID",
            });
        }

        const query = 'CALL GetCongNgheChieuByID(?)';
        const [rows] = await db.query(query, [maCNC]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Cong Nghe Chieu not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Cong Nghe Chieu retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getCongNgheChieuByID API",
            error: err.message,
        });
    }
};
module.exports = {
    getCongNgheChieu,
    getCongNgheChieuByID,
};