const db = require("../config/db");

// Get all PCChieuCNC
const getAllPCChieuCNC = async (req, res) => {
    try {
        const query = 'CALL GetAllPCChieuCNC()';
        const [result] = await db.query(query);

        // Check if result contains data (the first element of the result is the data rows)
        if (!result || result.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No PC Chieu CNC found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All PC Chieu CNC retrieved successfully",
            data: result, // Only return the rows from the first result set
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllPCChieuCNC API",
            error: err.message,
        });
    }
};

// Get PCChieuCNC by MaPC and MaCN
const getPCChieuCNCByMaPCAndMaCN = async (req, res) => {
    try {
        const { MaPC, MaCN } = req.params;

        // Validate input parameters
        if (!MaPC || !MaCN) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaPC or MaCN parameter",
            });
        }

        // Call the stored procedure GetPCChieuCNCByMaPCAndMaCN with MaPC and MaCN
        const query = 'CALL GetPCChieuCNCByMaPCAndMaCN(?, ?)';
        const [result] = await db.query(query, [MaPC, MaCN]);

        // Check if result contains data
        if (!result || result.length === 0) {
            return res.status(404).send({
                success: false,
                message: "PC Chieu CNC not found for the given MaPC and MaCN",
            });
        }

        res.status(200).send({
            success: true,
            message: "PC Chieu CNC retrieved successfully",
            data: result, // The result includes MaPC, ViTri, ChiNhanh, CongNghe
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPCChieuCNCByMaPCAndMaCN API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllPCChieuCNC,
    getPCChieuCNCByMaPCAndMaCN,
};
