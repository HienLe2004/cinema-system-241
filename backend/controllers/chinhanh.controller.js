const db = require("../config/db");

// Get all ChiNhanh
const getAllChiNhanh = async (req, res) => {
    try {
        const query = 'CALL GetAllChiNhanh()';  // Call stored procedure to get all ChiNhanh
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No ChiNhanh found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All ChiNhanh retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllChiNhanh API",
            error: err.message,
        });
    }
};

// Get a ChiNhanh by ID
const getChiNhanhByID = async (req, res) => {
    try {
        const maCN = req.params.id;
        if (!maCN) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid ChiNhanh ID",
            });
        }

        const query = 'CALL GetChiNhanhByID(?)';  // Call stored procedure to get ChiNhanh by ID
        const [rows] = await db.query(query, [maCN]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "ChiNhanh not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "ChiNhanh retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getChiNhanhByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllChiNhanh,
    getChiNhanhByID,
};
