const db = require("../config/db");

// Get all HinhThucChieu
const getHinhThucChieu = async (req, res) => {
    try {
        const query = 'CALL GetAllHinhThucChieu()';
        const [rows] = await db.query(query); 

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Hinh Thuc Chieu found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Hinh Thuc Chieu retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getHinhThucChieu API",
            error: err.message,
        });
    }
};

// Get a HinhThucChieu by ID
const getHinhThucChieuByID = async (req, res) => {
    try {
        const maHTC = req.params.id;
        if (!maHTC) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid HinhThucChieu ID",
            });
        }

        const query = 'CALL GetHinhThucChieuByID(?)';
        const [rows] = await db.query(query, [maHTC]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Hinh Thuc Chieu not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Hinh Thuc Chieu retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getHinhThucChieuByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getHinhThucChieu,
    getHinhThucChieuByID,
};
