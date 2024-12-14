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

        if (!suatChieuData || suatChieuData.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Suat Chieu not found for the provided MaP",
            });
        }

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
};
