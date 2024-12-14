const db = require("../config/db");

// Get all genres using stored procedure
const getTheLoai = async (req, res) => {
    try {
        const data = await db.query('CALL GetAllTheLoai()');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No genres found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All genres retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getTheLoai API",
            error: err.message,
        });
    }
};

// Get genres by Phim ID using stored procedure
const getTheLoaiByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid Phim ID",
            });
        }
        const data = await db.query('CALL GetTheLoaiByMaP(?)', [MaP]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No genres found for the specified Phim",
            });
        }
        res.status(200).send({
            success: true,
            message: "Genres retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getTheLoaiByMaP API",
            error: err.message,
        });
    }
};

// Create a new genre for a Phim
const createTheLoai = async (req, res) => {
    try {
        const { MaP, TenTheLoai } = req.body;
        if (!MaP || !TenTheLoai) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaP, TenTheLoai)",
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

        const query = 'INSERT INTO THE_LOAI (MaP, TenTheLoai) VALUES (?, ?)';
        const [result] = await db.query(query, [MaP, TenTheLoai]);

        res.status(201).send({
            success: true,
            message: "Genre added successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createTheLoai API",
            error: err.message,
        });
    }
};

// Delete a genre by Phim ID
const deleteTheLoaiByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        const { TenTheLoai } = req.body;

        if (!MaP || !TenTheLoai) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or genre",
            });
        }

        const query = 'DELETE FROM THE_LOAI WHERE MaP = ? AND TenTheLoai = ?';
        const [result] = await db.query(query, [MaP, TenTheLoai]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Genre not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Genre deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in deleteTheLoaiByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getTheLoai,
    getTheLoaiByMaP,
    createTheLoai,
    deleteTheLoaiByMaP,
};
