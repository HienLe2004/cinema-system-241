const db = require("../config/db");

// Get all NUOC
const getAllNuoc = async (req, res) => {
    try {
        const query = 'CALL GetAllNuoc()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No NUOC found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All NUOC retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllNuoc API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllNuoc,
};
