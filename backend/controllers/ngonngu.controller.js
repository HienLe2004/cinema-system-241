const db = require("../config/db");

// Get all NgonNgu
const getNgonNgu = async (req, res) => {
    try {
        const query = 'CALL GetAllNgonNgu()';
        const [rows] = await db.query(query); 

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Ngon Ngu found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Ngon Ngu retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getNgonNgu API",
            error: err.message,
        });
    }
};

// Get NgonNgu by TenNgonNgu and MaHTC
const getNgonNguByID = async (req, res) => {
    try {
        const { TenNgonNgu, MaHTC } = req.params;
        if (!TenNgonNgu || !MaHTC) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid parameters",
            });
        }

        const query = 'CALL GetNgonNguByID(?, ?)';
        const [rows] = await db.query(query, [TenNgonNgu, MaHTC]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Ngon Ngu not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Ngon Ngu retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getNgonNguByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getNgonNgu,
    getNgonNguByID,
};
