import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, DatePicker, InputNumber, Select } from 'antd';
import { getAllSuatChieu, getSuatChieuByMaP } from '../../api/suatchieu.api';
import { getAllPhim } from '../../api/phim.api';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CrudShowTime = () => {
  const [suatChieuList, setSuatChieuList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSuatChieu, setCurrentSuatChieu] = useState(null);
  const [form] = Form.useForm();
  
  // Fetch danh sách suất chiếu và phim
  const fetchSuatChieuList = async () => {
    try {
      const response = await getAllSuatChieu();
      setSuatChieuList(response.data.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách suất chiếu:', error);
    }
  };

  const fetchPhimList = async () => {
    try {
      const response = await getAllPhim();
      setPhimList(response.data.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error);
    }
  };

  useEffect(() => {
    fetchSuatChieuList();
    fetchPhimList();
  }, []);

  // Kiểm tra trùng suất chiếu
  const checkTrungSuatChieu = (phong, thoiGian, chiNhanh) => {
    return suatChieuList.some(item => 
      item.phong === phong && item.thoiGian === thoiGian && item.chiNhanh === chiNhanh
    );
  };

  // Hiển thị modal thêm hoặc sửa suất chiếu
  const showModal = (suatChieu = null) => {
    setCurrentSuatChieu(suatChieu);
    form.resetFields();
    if (suatChieu) {
      form.setFieldsValue(suatChieu);
    }
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentSuatChieu(null);
  };

  // Xử lý khi nhấn OK trong modal
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Kiểm tra trùng suất chiếu
      const isTrung = checkTrungSuatChieu(values.phong, values.thoiGian, values.chiNhanh);
      if (isTrung) {
        notification.error({
          message: 'Lỗi',
          description: 'Suất chiếu này đã tồn tại tại phòng này và khung giờ này!',
        });
        return;
      }

      if (currentSuatChieu) {
        // Cập nhật suất chiếu
        // API update (Giả sử API update được cung cấp sẵn)
      } else {
        // Thêm mới suất chiếu
        // API create (Giả sử API create được cung cấp sẵn)
      }
      
      notification.success({
        message: 'Thành công',
        description: currentSuatChieu ? 'Cập nhật suất chiếu thành công!' : 'Thêm suất chiếu thành công!',
      });
      
      setIsModalVisible(false);
      setCurrentSuatChieu(null);
      fetchSuatChieuList(); // Tải lại danh sách suất chiếu
    } catch (error) {
      console.error('Lỗi khi lưu suất chiếu:', error);
      notification.error({ message: 'Lỗi', description: 'Không thể lưu suất chiếu!' });
    }
  };

  // Xóa suất chiếu
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa suất chiếu này?');
    if (!confirmDelete) return;

    try {
      // API delete (Giả sử API delete được cung cấp sẵn)
      notification.success({ message: 'Thành công', description: 'Xóa suất chiếu thành công!' });
      fetchSuatChieuList(); // Tải lại danh sách suất chiếu
    } catch (error) {
      console.error('Lỗi khi xóa suất chiếu:', error);
      notification.error({ message: 'Lỗi', description: 'Không thể xóa suất chiếu!' });
    }
  };

  // Cấu hình các cột cho bảng suất chiếu
  const columns = [
    {
      title: 'Tên Phim',
      dataIndex: 'phimName',
      key: 'phimName',
    },
    {
      title: 'Phòng',
      dataIndex: 'phong',
      key: 'phong',
    },
    {
      title: 'Khung Giờ',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
    },
    {
      title: 'Chi Nhánh',
      dataIndex: 'chiNhanh',
      key: 'chiNhanh',
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
            onClick={() => handleDelete(record?.id)}
            danger
            className="hover:bg-red-600"
          />
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4 bg-green-600 hover:bg-green-700"
      >
        Thêm Suất Chiếu
      </Button>
      <Table 
        columns={columns} 
        dataSource={suatChieuList} 
        rowKey="id" 
        className="rounded-lg overflow-hidden shadow-lg"
      />

      <Modal
        title={currentSuatChieu ? 'Sửa Suất Chiếu' : 'Thêm Suất Chiếu'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentSuatChieu ? 'Cập nhật' : 'Thêm'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="phim"
            label="Phim"
            rules={[{ required: true, message: 'Vui lòng chọn phim!' }]}
          >
            <Select>
              {phimList.map(phim => (
                <Select.Option key={phim.id} value={phim.id}>{phim.Ten}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="phong"
            label="Phòng"
            rules={[{ required: true, message: 'Vui lòng nhập phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="thoiGian"
            label="Khung giờ"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item
            name="chiNhanh"
            label="Chi nhánh"
            rules={[{ required: true, message: 'Vui lòng nhập chi nhánh!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrudShowTime;
