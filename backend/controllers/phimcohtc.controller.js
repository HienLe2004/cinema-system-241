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
const getPhimCoHTCByPhimID = async (req, res) => {
    try {
        const { MaP } = req.params;
        if (!MaP) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaP parameter",
            });
        }

        // Call the stored procedure that only takes MaP
        const query = 'CALL GetPhimCoHTCByFilmID(?)';
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
            data: rows,
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
    getPhimCoHTCByPhimID,
};
