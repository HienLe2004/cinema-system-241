const db = require("../config/db");

// Enum values for validation
const validGioiHanDoTuoi = ['0', '13', '16', '18'];
const validNhan = ['P', 'K', 'T13', 'T16', 'T18', 'C'];

// Get all films
const getPhim = async (req, res) => {
    try {
        const data = await db.query('CALL GetAllFilms()');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No films found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All films retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhim API",
            error: err.message,
        });
    }
};

// Get a film by ID
const getPhimByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        if (!phimID) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid film ID",
            });
        }

        // Calling the stored procedure 'getFilmByID' and passing the phimID as parameter
        const query = 'CALL getFilmByID(?)';
        const data = await db.query(query, [phimID]);

        // Assuming the stored procedure returns the result as data[0]
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Film not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Film retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhimByID API",
            error: err.message,
        });
    }
};


// Create a new film
const createPhim = async (req, res) => {
    try {
        const { NSX, ThoiLuong, Poster, NgayKC, Ten, MoTa, Trailer, GioiHanDoTuoi, GiaGoc, Nhan } = req.body;

        // Validate ENUM fields
        if (!validGioiHanDoTuoi.includes(GioiHanDoTuoi)) {
            return res.status(400).send({
                success: false,
                message: "Invalid GioiHanDoTuoi value. Valid values are '0', '13', '16', '18'.",
            });
        }
        if (!validNhan.includes(Nhan)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Nhan value. Valid values are 'P', 'K', 'T13', 'T16', 'T18', 'C'.",
            });
        }

        if (!NSX || !ThoiLuong || !NgayKC || !Ten || !GioiHanDoTuoi || !Nhan) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields",
            });
        }

        const query = `
            INSERT INTO PHIM (NSX, ThoiLuong, Poster, NgayKC, Ten, MoTa, Trailer, GioiHanDoTuoi, GiaGoc, Nhan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [NSX, ThoiLuong, Poster, NgayKC, Ten, MoTa, Trailer, GioiHanDoTuoi, GiaGoc, Nhan]);

        res.status(201).send({
            success: true,
            message: "Film created successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createPhim API",
            error: err.message,
        });
    }
};

// Update a film by ID
const updatePhimByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        const { NSX, ThoiLuong, Poster, NgayKC, Ten, MoTa, Trailer, GioiHanDoTuoi, GiaGoc, Nhan } = req.body;

        if (!phimID || (!NSX && !ThoiLuong && !Ten && !GioiHanDoTuoi && !Nhan)) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID or fields to update",
            });
        }

        // Validate ENUM fields
        if (GioiHanDoTuoi && !validGioiHanDoTuoi.includes(GioiHanDoTuoi)) {
            return res.status(400).send({
                success: false,
                message: "Invalid GioiHanDoTuoi value. Valid values are '0', '13', '16', '18'.",
            });
        }
        if (Nhan && !validNhan.includes(Nhan)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Nhan value. Valid values are 'P', 'K', 'T13', 'T16', 'T18', 'C'.",
            });
        }

        const query = `
            UPDATE PHIM
            SET NSX = COALESCE(?, NSX),
                ThoiLuong = COALESCE(?, ThoiLuong),
                Poster = COALESCE(?, Poster),
                NgayKC = COALESCE(?, NgayKC),
                Ten = COALESCE(?, Ten),
                MoTa = COALESCE(?, MoTa),
                Trailer = COALESCE(?, Trailer),
                GioiHanDoTuoi = COALESCE(?, GioiHanDoTuoi),
                GiaGoc = COALESCE(?, GiaGoc),
                Nhan = COALESCE(?, Nhan)
            WHERE MaP = ?
        `;
        const [result] = await db.query(query, [NSX, ThoiLuong, Poster, NgayKC, Ten, MoTa, Trailer, GioiHanDoTuoi, GiaGoc, Nhan, phimID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Film not found or no changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Film updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in updatePhimByID API",
            error: err.message,
        });
    }
};

// Delete a film by ID
const deletePhimByID = async (req, res) => {
    try {
        const phimID = req.params.id;
        if (!phimID) {
            return res.status(400).send({
                success: false,
                message: "Missing film ID",
            });
        }

        // Xóa bản ghi với ID đã cho
        const queryDelete = `DELETE FROM PHIM WHERE MaP = ?`;
        const [result] = await db.query(queryDelete, [phimID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Film not found",
            });
        }

        const queryAlterAutoIncrement = `ALTER TABLE PHIM AUTO_INCREMENT = ${phimID}`;
        await db.query(queryAlterAutoIncrement); 

        res.status(200).send({
            success: true,
            message: "Film deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in deletePhimByID API",
            error: err.message,
        });
    }
};

module.exports = {
    getPhim,
    getPhimByID,
    createPhim,
    updatePhimByID,
    deletePhimByID,
};
