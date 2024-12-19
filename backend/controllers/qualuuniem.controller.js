const db = require("../config/db");

// Get all QUA_LUU_NIEM
const getAllQuaLuuNiem = async (req, res) => {
    try {
        const query = 'CALL GetAllQuaLuuNiem()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No QUA_LUU_NIEM found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All QUA_LUU_NIEM retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllQuaLuuNiem API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllQuaLuuNiem,
};
