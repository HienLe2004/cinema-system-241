const db = require("../config/db");

// Get rating by Phim ID using stored procedure
const getKhachHangDanhGiaPhimByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid Phim ID",
            });
        }
        const data = await db.query('CALL GetKhachHangDanhGiaPhimByMaP(?)', [MaP]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No rating found for the specified Phim",
            });
        }
        res.status(200).send({
            success: true,
            message: "rating retrieved successfully",
            data: data[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in GetKhachHangDanhGiaPhimByMaP API",
            error: err.message,
        });
    }
};

// Create a new KH_DG_PHIM for a Phim
const createKhachHangDanhGiaPhim = async (req, res) => {
    try {
        const { MaP, MaKH, BinhLuan, DiemSo, Ngay } = req.body;
        if (!MaP || !TenTheLoai) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (MaP, MaKH, BinhLuan, DiemSo, Ngay)",
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

        const query = 'INSERT INTO KH_DG_PHIM (MaP, MaKH, BinhLuan, DiemSo, Ngay) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [MaP, MaKH, BinhLuan, DiemSo, Ngay]);

        res.status(201).send({
            success: true,
            message: "KH_DG_PHIM added successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createKhachHangDanhGiaPhimByMaP API",
            error: err.message,
        });
    }
};

// Delete a KH_DG_PHIM by Phim ID
const deleteKhachHangDanhGiaPhimByMaP = async (req, res) => {
    try {
        const MaP = req.params.id;
        const { MaKH } = req.body;

        if (!MaP || !MaKH) {
            return res.status(400).send({
                success: false,
                message: "Missing Phim ID or KH_DG_PHIM",
            });
        }

        const query = 'DELETE FROM KH_DG_PHIM WHERE MaP = ? AND MaKH = ?';
        const [result] = await db.query(query, [MaP, MaKH]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "KH_DG_PHIM not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "KH_DG_PHIM deleted successfully",
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
    getKhachHangDanhGiaPhimByMaP,
    createKhachHangDanhGiaPhim,
    deleteKhachHangDanhGiaPhimByMaP,
};
