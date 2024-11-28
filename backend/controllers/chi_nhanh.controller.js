const db = require("../config/db");

const getChiNhanh = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM chi_nhanh');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No branches found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All branches retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getChiNhanh API",
            error: err.message,
        });
    }
};

const getChiNhanhByID = async (req, res) => {
    try {
        const chiNhanhID = req.params.id;
        if (!chiNhanhID) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid branch ID",
            });
        }
        const data = await db.query('SELECT * FROM chi_nhanh WHERE ma_cn = ?', [chiNhanhID]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Branch not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Branch retrieved successfully",
            data: data[0],
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

const createChiNhanh = async (req, res) => {
    try {
        const { ten, tinh_thanh, quan, duong } = req.body;
        if (!ten || !tinh_thanh || !quan || !duong) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields",
            });
        }
        const query = `INSERT INTO chi_nhanh (ten, tinh_thanh, quan, duong) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(query, [ten, tinh_thanh, quan, duong]);

        res.status(201).send({
            success: true,
            message: "Branch created successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createChiNhanh API",
            error: err.message,
        });
    }
};

const updateChiNhanhByID = async (req, res) => {
    try {
        const chiNhanhID = req.params.id;
        const { ten, tinh_thanh, quan, duong } = req.body;

        if (!chiNhanhID || (!ten && !tinh_thanh && !quan && !duong)) {
            return res.status(400).send({
                success: false,
                message: "Missing branch ID or fields to update",
            });
        }

        const query = `UPDATE chi_nhanh SET ten = COALESCE(?, ten), tinh_thanh = COALESCE(?, tinh_thanh), quan = COALESCE(?, quan), duong = COALESCE(?, duong) WHERE ma_cn = ?`;
        const [result] = await db.query(query, [ten, tinh_thanh, quan, duong, chiNhanhID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Branch not found or no changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Branch updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in updateChiNhanhByID API",
            error: err.message,
        });
    }
};

const deleteChiNhanhByID = async (req, res) => {
    try {
        const chiNhanhID = req.params.id;
        if (!chiNhanhID) {
            return res.status(400).send({
                success: false,
                message: "Missing branch ID",
            });
        }

        const query = `DELETE FROM chi_nhanh WHERE ma_cn = ?`;
        const [result] = await db.query(query, [chiNhanhID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Branch not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Branch deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in deleteChiNhanhByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getChiNhanh,
    getChiNhanhByID,
    createChiNhanh,
    updateChiNhanhByID,
    deleteChiNhanhByID,
};
