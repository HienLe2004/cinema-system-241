const db = require("../config/db");

// Get all actors
const getDienVien = async (req, res) => {
    try {
        const data = await db.query('CALL GetAllDienVien()');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No actors found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All actors retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getDienVien API",
            error: err.message,
        });
    }
};


// Get actors by Phim ID
const getDienVienByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid Phim ID",
            });
        }

        // Call the stored procedure to get actors by Phim ID
        const [rows] = await db.query('CALL GetDienVienByMaP(?)', [MaP]);

        // Check if any actors are found
        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No actors found for the specified Phim",
            });
        }

        res.status(200).send({
            success: true,
            message: "Actors retrieved successfully",
            data: rows[0], // The result of the stored procedure will be in the first element of the array
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getDienVienByMaP API",
            error: err.message,
        });
    }
};


// Create a new actor for a Phim
const createDienVien = async (req, res) => {
    try {
        const { MaP, VaiDien, Ten } = req.body;
        if (!MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaP, Ten)",
            });
        }

        // Check if the Phim exists
        const checkPhim = await db.query('SELECT * FROM PHIM WHERE MaP = ?', [MaP]);
        if (!checkPhim || checkPhim[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Phim not found",
            });
        }

        const query = 'INSERT INTO DIEN_VIEN (MaP, VaiDien, Ten) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [MaP, VaiDien, Ten]);

        res.status(201).send({
            success: true,
            message: "Actor added successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createDienVien API",
            error: err.message,
        });
    }
};

// Update an actor's information by Phim ID
const updateDienVienByMaP = async (req, res) => {
    try {
        const { id, VaiDien, Ten } = req.body;
        const MaP = req.params.id;

        if (!MaP || !MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or fields to update",
            });
        }

        // Check if the actor exists
        const checkActor = await db.query('SELECT * FROM DIEN_VIEN WHERE MaP = ? AND MaDienVien = ?', [MaP, MaP]);
        if (!checkActor || checkActor[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Actor not found for the specified Phim",
            });
        }

        const query = 'UPDATE DIEN_VIEN SET VaiDien = COALESCE(?, VaiDien), Ten = COALESCE(?, Ten) WHERE MaP = ? AND MaDienVien = ?';
        const [result] = await db.query(query, [VaiDien, Ten, MaP, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "No changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Actor updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in updateDienVienByID API",
            error: err.message,
        });
    }
};

// Delete an actor by Phim ID
const deleteDienVienByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        const { id } = req.body;

        if (!MaP || !MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or actor ID",
            });
        }

        const query = 'DELETE FROM DIEN_VIEN WHERE MaP = ? AND MaDienVien = ?';
        const [result] = await db.query(query, [MaP, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Actor not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Actor deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in deleteDienVienByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getDienVien,
    getDienVienByMaP,
    createDienVien,
    updateDienVienByMaP,
    deleteDienVienByMaP,
};
