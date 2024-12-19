const db = require("../config/db");

// Get all BAP
const getAllBap = async (req, res) => {
    try {
        const query = 'CALL GetAllBap()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No BAP found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All BAP retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllBap API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllBap,
};
