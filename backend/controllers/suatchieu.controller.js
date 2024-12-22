const db = require("../config/db");

// Get all SuatChieu
const getAllSuatChieu = async (req, res) => {
    try {
        const query = 'CALL GetAllSuatChieu()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Suat Chieu found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Suat Chieu retrieved successfully",
            data: rows,  // Return the rows directly
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllSuatChieu API",
            error: err.message,
        });
    }
};

// Tạo thêm một suất chiếu mới
const createSuatChieu = async (req, res) => {
    try {
        const { MaSC, MaPC, MaCN, MaP } = req.body;
        if (!MaSC || !MaPC || !MaCN || !MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaSC, MaPC, MaCN, MaP)",
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

        const query = 'INSERT INTO SUAT_CHIEU (MaPC, MaCN, Ngay, Gio, Thu, MaP, MaHTC) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [MaPC, MaCN, Ngay, Gio, Thu, MaP, MaHTC]);

        res.status(201).send({
            success: true,
            message: "SuatChieu added successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createSuatChieu API",
            error: err.message,
        });
    }
};

// Cập nhật suất chiếu theo
const updateSuatChieu = async (req, res) => {
    try {
        const { MaSC, MaPC, MaCN } = req.body;
        const MaP = req.params.id;

        if (!MaP || !MaSC || !MaCN) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or fields to update",
            });
        }

        // Check if the actor exists
        const checkActor = await db.query('SELECT * FROM SUAT_CHIEU WHERE MaP = ? AND MaSC = ?', [MaP, MaSC]);
        if (!checkActor || checkActor[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Actor not found for the specified Phim",
            });
        }

        const query = 'UPDATE SUAT_CHIEU SET Ngay = COALESCE(?, Ngay), Gio = COALESCE(?, Gio), Thu = COALESCE(?, Thu), MaHTC = COALESCE(?, MaHTC) WHERE MaP = ? AND MaSC = ? AND MaCN = ?';
        const [result] = await db.query(query, [Ngay, Gio, Thu, MaHTC, MaP, MaSC, MaCN]);

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
            message: "Error in updateSuatChieu API",
            error: err.message,
        });
    }
};

// Xóa suất chiếu
const deleteSuatChieu = async (req, res) => {
    try {
        const { MaSC } = req.body;

        if (!MaSC || !MaSC) {
            return res.status(400).send({
                success: false,
                message: "Missing SuatChieu ID",
            });
        }

        const query = 'DELETE FROM SUAT_CHIEU WHERE MaSC = ?';
        const [result] = await db.query(query, [MaSC]);

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

// Get SuatChieu by MaP (Phim ID)
const getSuatChieuByMaP = async (req, res) => {
    try {
        const maP = req.params.id;
        if (!maP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaP",
            });
        }

        const query = 'CALL GetSuatChieuByMaP(?)';
        const [rows] = await db.query(query, [maP]);

        // Extract the actual rows from the first element in the array
        const suatChieuData = rows[0];

        // if (!suatChieuData || suatChieuData.length === 0) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "Suat Chieu not found for the provided MaP",
        //     });
        // }

        res.status(200).send({
            success: true,
            message: "Suat Chieu retrieved successfully",
            data: suatChieuData, // Send the extracted data
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getSuatChieuByMaP API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllSuatChieu,
    getSuatChieuByMaP,
    createSuatChieu,
    updateSuatChieu,
};
