const db = require("../config/db");

// Get all PhimCoHTC
const getPhimCoHTC = async (req, res) => {
    try {
        const query = 'CALL GetAllPhimCoHTC()';
        const [rows, fields] = await db.query(query); // Destructure to get both rows and fields

        // Check if rows contain data
        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Phim Co HTC found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Phim Co HTC retrieved successfully",
            data: rows,  // Return only the data rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhimCoHTC API",
            error: err.message,
        });
    }
};


// Get PhimCoHTC by MaP
const getPhimCoHTCByMaP = async (req, res) => {
    try {
        const { MaP } = req.params;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaP parameter",
            });
        }

        // Call the updated stored procedure that joins PHIM, HINH_THUC_CHIEU, NGON_NGU, and CONG_NGHE_CHIEU
        const query = 'CALL GetPhimCoHTCByMaP(?)';
        const [rows] = await db.query(query, [MaP]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Phim Co HTC not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Phim Co HTC retrieved successfully",
            data: rows,  // The rows will include film, HTC, language, and technology type names
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhimCoHTCByID API",
            error: err.message,
        });
    }
};


module.exports = {
    getPhimCoHTC,
    getPhimCoHTCByMaP,
};
