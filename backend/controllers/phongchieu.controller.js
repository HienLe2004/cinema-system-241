const db = require("../config/db");

// Get all PhongChieu
const getPhongChieu = async (req, res) => {
    try {
        const query = 'CALL GetAllPhongChieu()';
        const [rows] = await db.query(query);

        if (!rows || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Phong Chieu found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All Phong Chieu retrieved successfully",
            data: rows,  // Return the rows directly
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhongChieu API",
            error: err.message,
        });
    }
};

// Get PhongChieu by MaCN
const getPhongChieuByMaCN = async (req, res) => {
    try {
        const maCN = req.params.id;
        if (!maCN) {
            return res.status(400).send({
                success: false,
                message: "Missing or invalid MaCN",
            });
        }

        const query = 'CALL GetPhongChieuByMaCN(?)';
        const [rows] = await db.query(query, [maCN]);

        // Extract the actual rows from the first element in the array
        const phongChieuData = rows[0]; 

        if (!phongChieuData || phongChieuData.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Phong Chieu not found for the provided MaCN",
            });
        }

        res.status(200).send({
            success: true,
            message: "Phong Chieu retrieved successfully",
            data: phongChieuData, // Send the extracted data
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in getPhongChieuByMaCN API",
            error: err.message,
        });
    }
};



module.exports = {
    getPhongChieu,
    getPhongChieuByMaCN,
};
