const db = require("../config/db");

// Create VE_CO_DO_MUA_KEM
const createVeCoDoMuaKem = async (req, res) => {
    try {
        const { maV, maSP, soLuong } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!maV || !maSP || !soLuong) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid input data. Required: maV, maSP, soLuong.",
            });
        }

        // Gọi procedure CreateVeCoDoMuaKem
        const query = 'CALL CreateVeCoDoMuaKem(?, ?, ?)';
        await db.query(query, [maV, maSP, soLuong]);

        // Trả về phản hồi thành công
        res.status(201).send({
            success: true,
            message: "VE_CO_DO_MUA_KEM created successfully",
        });
    } catch (err) {
        console.error(err);

        // Kiểm tra nếu lỗi là từ procedure
        if (err.sqlState === '45000') {
            return res.status(400).send({
                success: false,
                message: err.sqlMessage, // Lấy thông báo lỗi từ procedure
            });
        }

        // Trả về lỗi server
        res.status(500).send({
            success: false,
            message: "Error in createVeCoDoMuaKem API",
            error: err.message,
        });
    }
};

// Get VE_CO_DO_MUA_KEM by MaV
const getVeCoDoMuaKemByMaV = async (req, res) => {
    try {
        const maV = req.params.maV;

        // Kiểm tra dữ liệu đầu vào
        if (!maV) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaV",
            });
        }

        // Gọi procedure GetVeCoDoMuaKemByMaV
        const query = 'CALL GetVeCoDoMuaKemByMaV(?)';
        const [rows] = await db.query(query, [maV]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No VE_CO_DO_MUA_KEM found for the provided MaV",
            });
        }

        // Trả về phản hồi thành công
        res.status(200).send({
            success: true,
            message: "VE_CO_DO_MUA_KEM retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getVeCoDoMuaKemByMaV API",
            error: err.message,
        });
    }
};

module.exports = {
    createVeCoDoMuaKem,
    getVeCoDoMuaKemByMaV,
};
