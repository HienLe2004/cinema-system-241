const db = require("../config/db");

// Get all directors using stored procedure
const getDaoDien = async (req, res) => {
    try {
        const data = await db.query('CALL GetAllDaoDien()');
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

// Get a director by Phim ID using stored procedure
const getDaoDienByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid Phim ID",
            });
        }
        const data = await db.query('CALL GetDaoDienByMaP(?)', [MaP]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Director not found for the specified Phim",
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
            message: "Error in getDaoDienByMaP API",
            error: err.message,
        });
    }
};


// Create a new director for a Phim
const createDaoDien = async (req, res) => {
    try {
        const { MaP, Ten } = req.body;
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

// Update a director's information by Phim ID
const updateDaoDienByMaP = async (req, res) => {
    try {
        const { id, Ten } = req.body;
        const MaP = req.params.id;

        if (!id || !MaP || !Ten) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or fields to update",
            });
        }

        // Check if the director exists
        const checkDirector = await db.query('SELECT * FROM DAO_DIEN WHERE MaP = ? AND MaDaoDien = ?', [MaP, id]);
        if (!checkDirector || checkDirector[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Director not found for the specified Phim",
            });
        }

        const query = 'UPDATE DAO_DIEN SET Ten = COALESCE(?, Ten) WHERE MaP = ? AND MaDaoDien = ?';
        const [result] = await db.query(query, [Ten, MaP, id]);

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

// Delete a director by Phim ID
const deleteDaoDienByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        const { id } = req.body;

        if (!MaP || !MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or director ID",
            });
        }

        const query = 'DELETE FROM DAO_DIEN WHERE MaP = ? AND MaDaoDien = ?';
        const [result] = await db.query(query, [MaP, id]);

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
    getDaoDienByMaP,
    createDaoDien,
    updateDaoDienByMaP,
    deleteDaoDienByMaP,
};
