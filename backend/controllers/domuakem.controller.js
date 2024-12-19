const db = require("../config/db");

// Get all DO_MUA_KEM
const getAllDoMuaKem = async (req, res) => {
    try {
        const query = 'CALL GetAllDoMuaKem()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No DO_MUA_KEM found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All DO_MUA_KEM retrieved successfully",
            data: rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getAllDoMuaKem API",
            error: err.message,
        });
    }
};

module.exports = {
    getAllDoMuaKem,
};
