import { PaginationType } from "@/utils/types";

export const DEFAULT_PAGINATION: PaginationType = {
  total: 0,
  limit: 10,
  offset: 0,
};

export const CATEGORIES = [
  {
    value: 1,
    name: "Hội thảo & Hội nghị",
  },
  {
    value: 2,
    name: "Giải trí & Nghệ thuật",
  },
  {
    value: 3,
    name: "Thể thao & Sức khỏe",
  },
  {
    value: 4,
    name: "Giáo dục & Đào tạo",
  },
  {
    value: 5,
    name: "Công nghệ & Khởi nghiệp",
  },
  {
    value: 6,
    name: "Kinh doanh & Kết nối",
  },
  {
    value: 7,
    name: "Xã hội & Tình nguyện",
  },
  {
    value: 8,
    name: "Sự kiện văn hóa",
  },
  {
    value: 9,
    name: "Sự kiện gia đình & Trẻ em",
  },
  {
    value: 10,
    name: "Sự kiện trực tuyến",
  },
  {
    value: 11,
    name: "Sự kiện khác",
  },
];

export const SORT_VALUE = [
  {
    label: "Giảm dần",
    value: "1",
  },
  {
    label: "Tăng dần",
    value: "0",
  },
];
