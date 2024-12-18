const db = require("../config/db");
// Login
const getTaiKhoan = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields (username, password)",
            });
        }

        // Check if the user exists
        const checkTaiKhoan = await db.query('SELECT * FROM TAI_KHOAN NATURAL JOIN KH_CO_DK WHERE TenTK = ? AND MatKhau = ?', [username, password]);
        if (!checkTaiKhoan || checkTaiKhoan[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "TAI_KHOAN not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "TAI_KHOAN retrieved successfully",
            data: checkTaiKhoan[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getTaiKhoan API",
            error: err.message,
        });
    }
};

module.exports = {
    getTaiKhoan
};
