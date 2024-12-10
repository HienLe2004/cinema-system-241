const db = require("../config/db");

// Get all directors
const getDaoDien = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM DAO_DIEN');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No directors found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All directors retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getDaoDien API",
            error: err.message,
        });
    }
};

// Get a director by film ID
const getDaoDienByFilmID = async (req, res) => {
    try {
        const phimID = req.params.id;
        if (!phimID) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid film ID",
            });
        }
        const data = await db.query('SELECT * FROM DAO_DIEN WHERE MaP = ?', [phimID]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Director not found for the specified film",
            });
        }
        res.status(200).send({
            success: true,
            message: "Director retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getDaoDienByFilmID API",
            error: err.message,
        });
    }
};

// Create a new director for a film
const createDaoDien = async (req, res) => {
    try {
        const { MaP, Ten } = req.body;
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

        const query = 'INSERT INTO DAO_DIEN (MaP, Ten) VALUES (?, ?)';
        const [result] = await db.query(query, [MaP, Ten]);

        res.status(201).send({
            success: true,
            message: "Director added successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createDaoDien API",
            error: err.message,
        });
    }
};

// Update a director's information by film ID
const updateDaoDienByID = async (req, res) => {
    try {
        const { MaP, Ten } = req.body;
        const phimID = req.params.id;

        if (!phimID || !MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or fields to update",
            });
        }

        // Check if the director exists
        const checkDirector = await db.query('SELECT * FROM DAO_DIEN WHERE MaP = ? AND MaDaoDien = ?', [phimID, MaP]);
        if (!checkDirector || checkDirector[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Director not found for the specified film",
            });
        }

        const query = 'UPDATE DAO_DIEN SET Ten = COALESCE(?, Ten) WHERE MaP = ? AND MaDaoDien = ?';
        const [result] = await db.query(query, [Ten, phimID, MaP]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "No changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Director updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in updateDaoDienByID API",
            error: err.message,
        });
    }
};

// Delete a director by film ID
const deleteDaoDienByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        const { MaP } = req.body;

        if (!phimID || !MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or director ID",
            });
        }

        const query = 'DELETE FROM DAO_DIEN WHERE MaP = ? AND MaDaoDien = ?';
        const [result] = await db.query(query, [phimID, MaP]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Director not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Director deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in deleteDaoDienByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getDaoDien,
    getDaoDienByFilmID,
    createDaoDien,
    updateDaoDienByID,
    deleteDaoDienByID,
};
