const db = require("../config/db");

// Get all actors
const getDienVien = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM DIEN_VIEN');
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

// Get actors by film ID
const getDienVienByFilmID = async (req, res) => {
    try {
        const phimID = req.params.id;
        if (!phimID) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid film ID",
            });
        }
        const data = await db.query('SELECT * FROM DIEN_VIEN WHERE MaP = ?', [phimID]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No actors found for the specified film",
            });
        }
        res.status(200).send({
            success: true,
            message: "Actors retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getDienVienByFilmID API",
            error: err.message,
        });
    }
};

// Create a new actor for a film
const createDienVien = async (req, res) => {
    try {
        const { MaP, VaiDien, Ten } = req.body;
        if (!MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaP, Ten)",
            });
        }

        // Check if the film exists
        const checkFilm = await db.query('SELECT * FROM PHIM WHERE MaP = ?', [MaP]);
        if (!checkFilm || checkFilm[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Film not found",
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

// Update an actor's information by film ID
const updateDienVienByID = async (req, res) => {
    try {
        const { MaP, VaiDien, Ten } = req.body;
        const phimID = req.params.id;

        if (!phimID || !MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or fields to update",
            });
        }

        // Check if the actor exists
        const checkActor = await db.query('SELECT * FROM DIEN_VIEN WHERE MaP = ? AND MaDienVien = ?', [phimID, MaP]);
        if (!checkActor || checkActor[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Actor not found for the specified film",
            });
        }

        const query = 'UPDATE DIEN_VIEN SET VaiDien = COALESCE(?, VaiDien), Ten = COALESCE(?, Ten) WHERE MaP = ? AND MaDienVien = ?';
        const [result] = await db.query(query, [VaiDien, Ten, phimID, MaP]);

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

// Delete an actor by film ID
const deleteDienVienByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        const { MaP } = req.body;

        if (!phimID || !MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or actor ID",
            });
        }

        const query = 'DELETE FROM DIEN_VIEN WHERE MaP = ? AND MaDienVien = ?';
        const [result] = await db.query(query, [phimID, MaP]);

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
    getDienVienByFilmID,
    createDienVien,
    updateDienVienByID,
    deleteDienVienByID,
};
