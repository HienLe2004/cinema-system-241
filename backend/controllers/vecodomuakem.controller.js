const db = require("../config/db");

// Get VE_CO_DO_MUA_KEM by MaV
const getVeCoDoMuaKemByMaV = async (req, res) => {
    try {
        const maV = req.params.maV;
        if (!maV) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaV",
            });
        }

        const query = 'CALL GetVeCoDoMuaKemByMaV(?)';
        const [rows] = await db.query(query, [maV]);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No VE_CO_DO_MUA_KEM found for the provided MaV",
            });
        }

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
    getVeCoDoMuaKemByMaV,
};
