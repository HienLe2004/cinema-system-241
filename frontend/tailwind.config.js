/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // Brown
      brown: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#4c0519',
      },
      // Lime
      Lime: {
        50: '#f7fee7',
        100: '#f8fafc',
        200: '#d9f99d', // Extra lighter shade
        300: '#84cc16', // Main lime green
        400: '#65a30d', // Darker lime green
      },
      // Gray
      gray: {
        100: '#f3f4f6', // Nhẹ hơn cho background
        200: '#e5e7eb', // Màu nhạt cho border
        300: '#d1d5db', // Ghế trống
        500: '#6b7280', // Nền xám, các chi tiết nhạt
        600: '#4b5563', // Văn bản xám trung bình
        700: '#374151', // Darker gray for footer or background
        800: '#1f2937', // Nền xám đậm
        900: '#111827',
        950: '#030712', // Darker gray for more subtle elements
      },
      // Red
      red: {
        500: '#ef4444', // Ghế đã đặt
        600: '#dc2626', // Đỏ trung bình
        700: '#b91c1c', // Đỏ đậm cho các cảnh báo
        800: '#9b1c1c', // Darker red for urgent messages
      },
      // Blue
      blue: {
        300: '#93c5fd', // Hover ghế trống
        500: '#3b82f6', // Ghế đang chọn
        600: '#2563eb', // Medium blue for buttons
        700: '#1d4ed8', // Màu xanh đậm cho các nút chính
        800: '#1e40af', // Darker blue for actions or highlights
      },
      // Yellow
      yellow: {
        200: '#fde047',
        400: '#facc15', // Ghế VIP
        600: '#eab308', // Màu vàng đậm cho chú ý
        800: '#b45309', // Darker yellow for alerts or important elements
      },
      // Pink
      pink: {
        400: '#fb7185', // Ghế đôi
        500: '#f43f5e', // Pink cho các nhấn nhá
        600: '#f472b6', // Hồng đậm cho thông báo hay các nút
        700: '#db2777', // Darker pink for attention-grabbing elements
      },
      // Green
      green: {
        400: '#34d399', // Màu xanh lá cho thông báo thành công
        500: '#22c55e', // Màu xanh cho các thành công khác
        600: '#10b981', // Màu xanh lá đậm cho thông báo chính
        700: '#059669', // Darker green for actions or confirmations
        800: '#047857', // Darker green for primary success states
      },
      // Purple
      purple: {
        400: '#a78bfa', // Tím nhạt cho các phần background hoặc chi tiết
        500: '#8b5cf6', // Tím trung bình
        600: '#7c3aed', // Tím đậm cho các nút chính hoặc các lựa chọn nổi bật
        700: '#6b21a8', // Darker purple for text or more prominent elements
      },
      // Orange
      orange: {
        400: '#fb923c', // Màu cam cho cảnh báo nhẹ
        500: '#f97316', // Cam trung bình
        600: '#ea580c', // Cam đậm cho các thông báo quan trọng
        800: '#c2410c', // Darker orange for higher urgency
      },
      // Teal
      teal: {
        400: '#4fd1c5', // Teal for secondary actions
        500: '#14b8a6', // Teal trung bình
        600: '#0d9488', // Darker teal for emphasis
      },
      // Indigo
      indigo: {
        400: '#6366f1', // Indigo for links and highlights
        500: '#4f46e5', // Indigo cho hành động chính
        600: '#4338ca', // Darker indigo for deep contrasts
      },
      // Cyan
      cyan: {
        400: '#22d3ee', // Cyan for fresh details or borders
        600: '#06b6d4', // Cyan for prominent actions
      },
    },
  },
  plugins: [],
};
