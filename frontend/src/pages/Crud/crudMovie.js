import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  notification,
  DatePicker,
  InputNumber,
  Space,
  Tooltip,
} from "antd";
import {
  getAllPhim,
  createPhim,
  updatePhimByID,
  deletePhimByID,
} from "../../api/phim.api";
import {
  getDaoDienByPhimID,
  createDaoDien,
  updateDaoDienByPhimID,
} from "../../api/daodien.api";
import {
  getDienVienByPhimID,
  createDienVien,
  updateDienVienByPhimID,
} from "../../api/dienvien.api";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";

const CrudPhim = () => {
  const [phimList, setPhimList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPhim, setCurrentPhim] = useState(null);
  const [form] = Form.useForm();
  const [posterFile, setPosterFile] = useState([]);
  const [dienVienList, setDienVienList] = useState([{ name: "", role: "" }]);
  const [modalAction, setModalAction] = useState("");

  const fetchPhimList = async () => {
    try {
      const phimResponse = await getAllPhim();
      const phimData = Array.isArray(phimResponse?.data?.data?.[0])
        ? phimResponse.data.data[0]
        : [];

      // const enrichedPhimData = await Promise.all(phimData.map(async phim => {
      //   const daoDienResponse = await getDaoDienByPhimID(phim.MaP);
      //   const dienVienResponse = await getDienVienByPhimID(phim.MaP);

      //   const daoDien = daoDienResponse?.data?.data?.[0];
      //   const dienVienList = dienVienResponse?.data?.data || [];

      //   return {
      //     ...phim,
      //     daoDien: daoDien ? daoDien.Ten : 'Chưa có thông tin',
      //     dienVien: dienVienList.length > 0 ? dienVienList.map(dv => `${dv.Ten} (${dv.VaiDien})`).join(', ') : 'Chưa có thông tin',
      //   };
      // }));

      setPhimList(phimData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
    }
  };

  useEffect(() => {
    fetchPhimList();
  }, []);

  const showModal = async (type, phim = null) => {
    setCurrentPhim(phim);
    form.resetFields();
    setPosterFile([]);
    setDienVienList([{ name: "", role: "" }]);
    if (phim) {
      form.setFieldsValue({
        title: phim?.Ten || "",
        nhan: phim?.Nhan || "",
        thoiGian: phim?.ThoiLuong || "",
        moTa: phim?.MoTa || "",
        daoDien: "",
        poster: phim?.Poster || "",
        ngayKhoiChieu: phim?.NgayKC ? moment(phim?.NgayKC) : "",
        gioiHanDoTuoi: phim?.GioiHanDoTuoi || "",
        giaGoc: phim?.GiaGoc || "",
        trailer: phim?.Trailer || "",
      });
      const dienVien = await getDienVienByPhimID(phim.MaP);
      const daoDien = await getDaoDienByPhimID(phim.MaP);
      const dienVienData = dienVien?.data?.data || [];
      setDienVienList(
        dienVienData.map((dv) => ({ name: dv.Ten, role: dv.VaiDien, id: dv.MaDienVien }))
      );
      if (daoDien?.data?.data?.[0]?.[0]?.Ten) {
        form.setFieldValue("daoDien", daoDien?.data?.data?.[0]?.[0]?.Ten);
        form.setFieldValue("daoDienId", daoDien?.data?.data?.[0]?.[0]?.MaDaoDien);
      }
    }
    setModalAction(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPhim(null);
    setPosterFile([]);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(true);

      if (currentPhim) {
        const updateData = {
          NSX: values?.title,
          ThoiLuong: values?.thoiGian,
          Poster: values?.poster,
          NgayKC: values?.ngayKhoiChieu?.format(),
          Ten: values?.title,
          MoTa: values?.moTa,
          Trailer: values?.trailer,
          GioiHanDoTuoi: values?.gioiHanDoTuoi?.toString(),
          GiaGoc: values?.giaGoc,
          Nhan: values?.nhan,
        };
        await updatePhimByID(currentPhim.MaP, updateData);
        
        if (values.daoDien) {
          const daoDienData = {
            id: form.getFieldValue('daoDienId'),
            Ten: values.daoDien,
          };
          await updateDaoDienByPhimID(currentPhim.MaP, daoDienData);
        }
        await Promise.all(
          dienVienList.map((dv) => {
            const dienVienData = {
              id: dv.id,
              Ten: dv.name,
              VaiDien: dv.role,
            };
            return updateDienVienByPhimID(currentPhim.MaP, dienVienData);
          })
        );

        notification.success({
          message: "Thành công",
          description: "Cập nhật phim thành công!",
        });
      } else {
        const createData = {
          NSX: values?.title,
          ThoiLuong: values?.thoiGian,
          Poster: values?.poster,
          NgayKC: values?.ngayKhoiChieu?.format(),
          Ten: values?.title,
          MoTa: values?.moTa,
          Trailer: values?.trailer,
          GioiHanDoTuoi: values?.gioiHanDoTuoi?.toString(),
          GiaGoc: values?.giaGoc,
          Nhan: values?.nhan,
        };
        const response = await createPhim(createData);

        const phimID = response.data.id;

        if (values.daoDien) {
          const daoDienData = {
            MaP: phimID,
            Ten: values.daoDien,
          };
          await createDaoDien(daoDienData);
        }

        await Promise.all(
          dienVienList.map((dv) => {
            if (dv.name) {
              const dienVienData = {
                MaP: phimID,
                Ten: dv.name,
                VaiDien: dv.role,
              };
              return createDienVien(dienVienData);
            }
          })
        );

        notification.success({
          message: "Thành công",
          description: "Thêm phim thành công!",
        });
      }

      setIsModalVisible(false);
      setCurrentPhim(null);
      fetchPhimList();
    } catch (error) {
      console.error("Lỗi khi lưu phim:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể lưu phim!",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (!confirmDelete) return;

    try {
      await deletePhimByID(id);
      notification.success({
        message: "Thành công",
        description: "Xóa phim thành công!",
      });
      fetchPhimList();
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể xóa phim!",
      });
    }
  };
  const handleAddDienVien = () => {
    setDienVienList([...dienVienList, { name: "", role: "" }]);
  };

  const handleDienVienChange = (index, field, value) => {
    const newDienVienList = [...dienVienList];
    newDienVienList[index][field] = value;
    setDienVienList(newDienVienList);
  };

  // const handleDescriptionToggle = (moTa) => {
  //   setSelectedDescription(moTa);
  //   setDescriptionVisible(true);
  // };

  const columns = [
    {
      title: "Tên Phim",
      dataIndex: "Ten",
      key: "Ten",
    },
    {
      title: "Nhãn",
      dataIndex: "Nhan",
      key: "Nhan",
    },
    {
      title: "Thời gian",
      dataIndex: "ThoiLuong",
      key: "ThoiLuong",
    },
    {
      title: "Poster",
      dataIndex: "Poster",
      key: "Poster",
      render: (_, record) =>
        record?.Poster ? (
          <img src={record?.Poster} alt="Poster" style={{ width: 100 }} />
        ) : null,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "NgayKC",
      key: "NgayKC",
      render: (_, record) =>
        record?.NgayKC ? (
          <div>{moment(record?.NgayKC).format("DD-MM-YYYY")}</div>
        ) : null,
    },
    {
      title: "Giới hạn độ tuổi",
      dataIndex: "GioiHanDoTuoi",
      key: "GioiHanDoTuoi",
    },
    {
      title: "Giá gốc",
      dataIndex: "GiaGoc",
      key: "GiaGoc",
      render: (_, record) =>
        record.GiaGoc ? (
          <div>{new Intl.NumberFormat().format(record.GiaGoc)}đ</div>
        ) : null,
    },
    {
      title: "Trailer",
      dataIndex: "Trailer",
      key: "Trailer",
      render: (_, record) => (
        <a
          href={record?.Trailer}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Xem Trailer
        </a>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <span>
          <Tooltip title="Xem">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showModal("VIEW", record)}
              style={{ marginRight: 8 }}
              className="text-blue-500 hover:text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal("UPDATE", record)}
              style={{ marginRight: 8 }}
              className="text-blue-500 hover:text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record?.MaP)}
              danger
              className="hover:bg-red-600"
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal("CREATE")}
        className="mb-4 bg-green-600 hover:bg-green-700"
      >
        Thêm Phim
      </Button>
      <Table
        columns={columns}
        dataSource={phimList}
        rowKey="MaP"
        className="rounded-lg overflow-hidden shadow-lg"
        scroll={{ x: "auto" }}
      />
      {isModalVisible ? (
        <Modal
          title={
            modalAction === "VIEW"
              ? "Xem chi tiết phim"
              : modalAction === "UPDATE"
              ? "Sửa Phim"
              : "Thêm Phim"
          }
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={currentPhim ? "Cập nhật" : "Thêm"}
          okButtonProps={{hidden: modalAction === "VIEW"}}
          cancelButtonProps={{hidden: modalAction === "VIEW"}}
        >
          <Form form={form} layout="vertical" disabled={modalAction === "VIEW"}>
            <Form.Item
              name="title"
              label="Tên Phim"
              rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              name="nhan"
              label="Nhãn"
              rules={[
                { required: true, message: "Vui lòng nhập nhãn!" },
                {
                  validator: (_, value) => {
                    if (
                      value &&
                      !["P", "K", "T13", "T16", "T18", "C"].includes(
                        value?.toString()
                      )
                    ) {
                      return Promise.reject(
                        "Nhãn phải thuộc 'P', 'K', 'T13', 'T16', 'T18', 'C'"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              name="thoiGian"
              label="Thời gian"
              rules={[
                { required: true, message: "Vui lòng nhập thời gian phim!" },
              ]}
            >
              <Input
                type="number"
                className="border border-gray-300 rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="moTa"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea className="border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              name="daoDien"
              label="Đạo diễn"
              rules={[{ required: true, message: "Vui lòng nhập đạo diễn!" }]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>

            <div>
              <h4>Diễn viên</h4>
              {dienVienList.map((dv, index) => (
                <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                  <Input
                    placeholder="Tên diễn viên"
                    value={dv.name}
                    onChange={(e) =>
                      handleDienVienChange(index, "name", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg"
                  />
                  <Input
                    placeholder="Vai diễn"
                    value={dv.role}
                    onChange={(e) =>
                      handleDienVienChange(index, "role", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg"
                  />
                </Space>
              ))}
              <Button onClick={handleAddDienVien} type="dashed">
                Thêm Diễn Viên
              </Button>
            </div>

            <Form.Item
              label="Poster"
              name="poster"
              rules={[{ required: true, message: "Vui lòng nhập poster" }]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              label="Ngày khởi chiếu"
              name="ngayKhoiChieu"
              rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
            >
              <DatePicker className="w-full border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              label="Giới hạn độ tuổi"
              name="gioiHanDoTuoi"
              rules={[
                { required: true, message: "Vui lòng nhập giá trị" },
                {
                  validator: (_, value) => {
                    if (
                      value &&
                      !["0", "13", "16", "18"].includes(value?.toString())
                    ) {
                      return Promise.reject(
                        "Tuổi phải thuộc '0', '13', '16', '18'"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              label="Giá gốc"
              name="giaGoc"
              rules={[{ required: true, message: "Vui lòng nhập giá gốc" }]}
            >
              <InputNumber className="w-full border border-gray-300 rounded-lg" />
            </Form.Item>
            <Form.Item
              name="trailer"
              label="Trailer"
              rules={[
                { required: true, message: "Vui lòng nhập link trailer!" },
              ]}
            >
              <Input className="border border-gray-300 rounded-lg" />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CrudPhim;
