const db = require("../config/db");

// Get Ghe Da Dat Cua SC by MaSC, MaPC, and MaCN
const GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN = async (req, res) => {
    try {
        // Lấy MaSC, MaPC và MaCN từ request parameters
        const { maSC, maPC, maCN } = req.params;

        // Kiểm tra input hợp lệ
        if (!maSC || !maPC || !maCN) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaSC, MaPC, or MaCN",
            });
        }

        // Gọi procedure MySQL
        const query = "CALL GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN(?, ?, ?)";
        const [rows] = await db.query(query, [maSC, maPC, maCN]);

        // Dữ liệu thực tế nằm trong rows[0] do MySQL trả về
        const gheDaDatData = rows[0];

        // Kiểm tra nếu không có dữ liệu
        if (!gheDaDatData || gheDaDatData.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Ghe Da Dat Cua SC found for the provided MaSC, MaPC, and MaCN",
            });
        }

        // Trả kết quả thành công
        res.status(200).send({
            success: true,
            message: "Ghe Da Dat Cua SC retrieved successfully",
            data: gheDaDatData, // Trả về dữ liệu ghế đã đặt
        });
    } catch (err) {
        console.error("Error in GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN: ", err);
        res.status(500).send({
            success: false,
            message: "Error in GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN API",
            error: err.message,
        });
    }
};

module.exports = {
    GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN,
};
