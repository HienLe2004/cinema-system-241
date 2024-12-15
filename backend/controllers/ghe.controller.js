const db = require("../config/db");

// Get Ghe by MaPC and MaCN
const getGheByMaPCAndMaCN = async (req, res) => {
    try {
        // Lấy MaPC và MaCN từ request parameters
        const { maPC, maCN } = req.params;

        // Kiểm tra input hợp lệ
        if (!maPC || !maCN) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaPC or MaCN",
            });
        }

        // Gọi procedure MySQL
        const query = "CALL GetGheByMaPCAndMaCN(?, ?)";
        const [rows] = await db.query(query, [maPC, maCN]);

        // Dữ liệu thực tế nằm trong rows[0] do MySQL trả về
        const gheData = rows[0];

        // Kiểm tra nếu không có dữ liệu
        if (!gheData || gheData.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Ghe found for the provided MaPC and MaCN",
            });
        }

        // Trả kết quả thành công
        res.status(200).send({
            success: true,
            message: "Ghe retrieved successfully",
            data: gheData, // Trả về dữ liệu ghế
        });
    } catch (err) {
        console.error("Error in getGheByMaPCAndMaCN: ", err);
        res.status(500).send({
            success: false,
            message: "Error in getGheByMaPCAndMaCN API",
            error: err.message,
        });
    }
};
module.exports = {
    getGheByMaPCAndMaCN,
};
