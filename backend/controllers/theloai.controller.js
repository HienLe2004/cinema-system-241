const db = require("../config/db");

// Get all genres
const getTheLoai = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM THE_LOAI');
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

// Get genres by film ID
const getTheLoaiByFilmID = async (req, res) => {
    try {
        const phimID = req.params.id;
        if (!phimID) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid film ID",
            });
        }
        const data = await db.query('SELECT * FROM THE_LOAI WHERE MaP = ?', [phimID]);
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No genres found for the specified film",
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
            message: "Error in getTheLoaiByFilmID API",
            error: err.message,
        });
    }
};

// Create a new genre for a film
const createTheLoai = async (req, res) => {
    try {
        const { MaP, TenTheLoai } = req.body;
        if (!MaP || !TenTheLoai) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaP, TenTheLoai)",
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

// Delete a genre by film ID
const deleteTheLoaiByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        const { TenTheLoai } = req.body;

        if (!phimID || !TenTheLoai) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or genre",
            });
        }

        const query = 'DELETE FROM THE_LOAI WHERE MaP = ? AND TenTheLoai = ?';
        const [result] = await db.query(query, [phimID, TenTheLoai]);

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
    getTheLoaiByFilmID,
    createTheLoai,
    deleteTheLoaiByID,
};
