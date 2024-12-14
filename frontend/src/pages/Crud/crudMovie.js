import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, notification, Upload, DatePicker, InputNumber } from 'antd';
import { getAllPhim, createPhim, updatePhimByID, deletePhimByID } from '../../api/phim.api';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const CrudPhim = () => {
  const [phimList, setPhimList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPhim, setCurrentPhim] = useState(null);
  const [form] = Form.useForm();
  const [posterFile, setPosterFile] = useState([]);

  // Hàm tải danh sách phim từ API
  const fetchPhimList = async () => {
    try {
      const response = await getAllPhim();
      const phimData = Array.isArray(response?.data?.data?.[0]) ? response?.data?.data?.[0] : [];
      setPhimList(phimData); // Cập nhật danh sách phim
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error);
    }
  };

  // Gọi hàm tải danh sách phim khi component được mount
  useEffect(() => {
    fetchPhimList(); // Chỉ gọi một lần khi component mount
  }, []);

  // Hiển thị modal để thêm hoặc chỉnh sửa phim
  const showModal = (phim = null) => {
    setCurrentPhim(phim);
    form.resetFields();
    setPosterFile([]);
    if (phim) {
      form.setFieldsValue(phim);
    }
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPhim(null);
    setPosterFile([]);
  };

  // Xử lý khi nhấn nút OK trong modal
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      if (posterFile.length > 0) {
        formData.append('poster', posterFile[0].originFileObj); // Thêm file poster
      }

      if (currentPhim) {
        await updatePhimByID(currentPhim.id, formData);
        notification.success({ message: 'Thành công', description: 'Cập nhật phim thành công!' });
      } else {
        const createData = {
          NSX: values?.daoDien, 
          ThoiLuong: values?.thoiGian, 
          Poster: values?.poster, 
          NgayKC: values?.ngayKhoiChieu?.format(), 
          Ten: values?.title, 
          MoTa: values?.moTa, 
          Trailer: values?.trailer, 
          GioiHanDoTuoi: values?.gioiHanDoTuoi?.toString(), 
          GiaGoc: values?.giaGoc, 
          Nhan: values?.nhan
        }
        await createPhim(createData);
        notification.success({ message: 'Thành công', description: 'Thêm phim thành công!' });
      }

      setIsModalVisible(false);
      setCurrentPhim(null);
      fetchPhimList(); // Tải lại danh sách phim
    } catch (error) {
      console.error('Lỗi khi lưu phim:', error);
      notification.error({ message: 'Lỗi', description: 'Không thể lưu phim!' });
    }
  };

  // Xóa phim
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa phim này?');
    if (!confirmDelete) return;

    try {
      await deletePhimByID(id);
      notification.success({ message: 'Thành công', description: 'Xóa phim thành công!' });
      fetchPhimList(); // Tải lại danh sách phim
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
      notification.error({ message: 'Lỗi', description: 'Không thể xóa phim!' });
    }
  };

  // Xử lý thay đổi file tải lên
  const handleUploadChange = ({ fileList }) => {
    setPosterFile(fileList);
  };

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'Tên Phim',
      dataIndex: 'Ten',
      key: 'Ten',
    },
    {
      title: 'Nhãn',
      dataIndex: 'Nhan',
      key: 'Nhan',
    },
    {
      title: 'Thời gian',
      dataIndex: 'ThoiLuong',
      key: 'ThoiLuong',
    },
    {
      title: 'Thể loại',
      dataIndex: 'theLoai',
      key: 'theLoai',
    },
    {
      title: 'Mô tả',
      dataIndex: 'MoTa',
      key: 'MoTa',
    },
    {
      title: 'Đạo diễn',
      dataIndex: 'daoDien',
      key: 'daoDien',
    },
    {
      title: 'Diễn viên',
      dataIndex: 'dienVien',
      key: 'dienVien',
    },
    {
      title: 'Poster',
      dataIndex: 'poster',
      key: 'poster',
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
      key: 'ngayKhoiChieu',
    },
    {
      title: 'Giới hạn độ tuổi',
      dataIndex: 'gioiHanDoTuoi',
      key: 'gioiHanDoTuoi',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'giaGoc',
      key: 'giaGoc',
    },
    {
      title: 'Trailer',
      dataIndex: 'trailer',
      key: 'trailer',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Xem Trailer</a>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
            className="text-blue-500 hover:text-blue-700"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record?.MaP)}
            danger
            className="hover:bg-red-600"
          />
        </span>
      ),
    },
  ];

  // Giao diện người dùng
  return (
    <div className="container mx-auto p-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4 bg-green-600 hover:bg-green-700"
      >
        Thêm Phim
      </Button>
      <Table 
        columns={columns} 
        dataSource={phimList} 
        rowKey="id" 
        className="rounded-lg overflow-hidden shadow-lg"
      />

      <Modal
        title={currentPhim ? 'Sửa Phim' : 'Thêm Phim'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentPhim ? 'Cập nhật' : 'Thêm'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tên Phim"
            rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="nhan"
            label="Nhãn"
            rules={[
              { required: true, message: 'Vui lòng nhập nhãn!' },
              {validator: (_, value) => {
                if (value && !['P', 'K', 'T13', 'T16', 'T18', 'C'].includes(value?.toString())) {
                  return Promise.reject("Nhãn phải thuộc 'P', 'K', 'T13', 'T16', 'T18', 'C'")
                }
                return Promise.resolve()
              }}
            ]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="thoiGian"
            label="Thời gian"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian phim!' }]}
          >
            <Input type="number" className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="theLoai"
            label="Thể loại"
            rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="daoDien"
            label="Đạo diễn"
            rules={[{ required: true, message: 'Vui lòng nhập đạo diễn!' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="dienVien"
            label="Diễn viên"
            rules={[{ required: true, message: 'Vui lòng nhập diễn viên!' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Poster"
            name='poster'
            rules={[{ required: true, message: 'Vui lòng nhập poster' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Ngày khởi chiếu"
            name='ngayKhoiChieu'
            rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
          >
            <DatePicker className="w-full border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Giới hạn độ tuổi"
            name='gioiHanDoTuoi'
            rules={[
              {required: true, message: 'Vui lòng nhập giá trị'},
              {validator: (_, value) => {
                if (value && !['0', '13', '16', '18'].includes(value?.toString())) {
                  return Promise.reject("Tuổi phải thuộc '0', '13', '16', '18'")
                }
                return Promise.resolve()
              }}
            ]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Giá gốc"
            name='giaGoc'
            rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}
          >
            <InputNumber className="w-full border border-gray-300 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="trailer"
            label="Trailer"
            rules={[{ required: true, message: 'Vui lòng nhập link trailer!' }]}
          >
            <Input className="border border-gray-300 rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrudPhim;