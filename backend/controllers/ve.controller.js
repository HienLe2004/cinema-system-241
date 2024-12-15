const db = require("../config/db");

// Create a new VE
const createVe = async (req, res) => {
    console.log(req.body)
    try {
        const { PhuongThucThanhToan, TrangThaiThanhToan, GiaVe, MaHD, MaKH, MaSC, MaPC, MaCN, MaNV, DanhSachGhe } = req.body;
        if (!PhuongThucThanhToan || !TrangThaiThanhToan || !GiaVe || !MaSC || !MaPC || !MaCN || !DanhSachGhe) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields",
            });
        }

        // Cập nhật câu lệnh gọi với số lượng tham số đúng (10 IN và 1 OUT)
        const query = `
            CALL CreateVe(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @veID)
        `;
        
        // Thực hiện câu lệnh SQL để chèn vé
        await db.query(query, [PhuongThucThanhToan, TrangThaiThanhToan, GiaVe, MaHD, MaKH, MaSC, MaPC, MaCN, MaNV, JSON.stringify(DanhSachGhe)]);

        // Lấy giá trị veID từ biến OUT
        const [result] = await db.query("SELECT @veID AS veID");

        res.status(201).send({
            success: true,
            message: "Ve created successfully",
            id: result[0].veID,  // Trả về ID từ stored procedure
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in createVe API",
            error: err.message,
        });
    }
};
module.exports = {
    createVe,
};
