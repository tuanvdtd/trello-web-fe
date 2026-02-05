# 📋 TaskFlow - Project Management System

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Project%20Management-blue?style=for-the-badge)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-5.10-DC382D?style=flat&logo=redis)](https://redis.io/)

**Một hệ thống quản lý dự án hiện đại, mạnh mẽ với giao diện trực quan giống Trello**

[Demo](#) • [Tính năng](#-tính-năng-nổi-bật) • [Cài đặt](#-cài-đặt) • [Tài liệu](#-tài-liệu-api)

</div>

---

## 📖 Giới thiệu

**TaskFlow** là một ứng dụng quản lý dự án full-stack được xây dựng theo mô hình Kanban board, giúp các nhóm làm việc tổ chức công việc hiệu quả, theo dõi tiến độ và cộng tác real-time. Hệ thống được thiết kế với kiến trúc microservices, tích hợp nhiều công nghệ tiên tiến và tối ưu cho hiệu suất cao.
<img width="1919" height="908" alt="Screenshot 2026-01-13 000312" src="https://github.com/user-attachments/assets/b31ee778-63ac-4d0d-86fb-7372afbc9f65" />
<img width="1919" height="913" alt="Screenshot 2026-01-13 000508" src="https://github.com/user-attachments/assets/ac197c36-18c3-4c3c-8c98-746bd2883d4a" />
<img width="1919" height="909" alt="Screenshot 2026-01-13 000618" src="https://github.com/user-attachments/assets/b70ba1a8-63c2-40d5-bff8-81a11c7f37f2" />
<img width="1919" height="912" alt="Screenshot 2026-01-13 000733" src="https://github.com/user-attachments/assets/79941f96-edaf-4a48-93e4-a6abf5082b34" />
<img width="1919" height="906" alt="Screenshot 2026-01-13 001117" src="https://github.com/user-attachments/assets/c09b9182-ca2f-45e7-a3fc-7f74ea5a5145" />
<img width="1919" height="904" alt="Screenshot 2026-01-13 001226" src="https://github.com/user-attachments/assets/86eef9cd-cfdb-476c-ac12-0b9156ddde65" />
<img width="1906" height="907" alt="Screenshot 2026-01-13 001548" src="https://github.com/user-attachments/assets/bf263ac3-d2d3-4509-a471-a097b5a32e9a" />



## ✨ Tính năng nổi bật

### 🎯 Quản lý Board & Task
- **Kanban Board động** - Kéo thả cards giữa các columns với animation mượt mà
- **Quản lý nhiều board** - Tạo, chỉnh sửa, xóa boards không giới hạn (có plan Premium)
- **Tùy chỉnh giao diện** - Background tùy chỉnh (màu sắc, hình ảnh từ Unsplash/upload)
- **Templates** - Thư viện templates có sẵn cho các loại dự án phổ biến
- **Recent Boards** - Truy cập nhanh các boards đã xem gần đây

### 👥 Cộng tác & Quyền hạn
- **Mời thành viên** - Chia sẻ board với team qua email invitation
- **Real-time collaboration** - Cập nhật thay đổi ngay lập tức cho tất cả thành viên
- **Role-Based Access Control (RBAC)** - Phân quyền chi tiết (Admin, Owner, Member)
- **Admin Dashboard** - Quản trị hệ thống toàn diện

### 💬 Tương tác & Nội dung
- **Comments** - Thảo luận trực tiếp trên cards
- **Markdown Editor** - Soạn thảo nội dung phong phú với @uiw/react-md-editor
- **File Attachments** - Upload và quản lý tệp đính kèm (Cloudinary)
- **Activity Tracking** - Lịch sử hoạt động chi tiết

### 🔐 Bảo mật & Xác thực
- **Multi-provider Authentication**:
  - Email/Password với JWT
  - Google OAuth (Auth0)
  - 2FA (Two-Factor Authentication) với OTP
- **Session Management** - Quản lý phiên đăng nhập đa thiết bị
- **Token Refresh** - Tự động làm mới token với Redis caching
- **Email Verification** - Xác thực tài khoản qua email

### 💳 Thanh toán & Subscription
- **Tích hợp VNPay** - Thanh toán trực tuyến
- **Premium Plans** - Các gói đăng ký với giới hạn board khác nhau
- **Subscription Management** - Tự động xử lý hết hạn subscription (cron jobs)

### 🎨 Trải nghiệm người dùng
- **Dark/Light Mode** - Chế độ giao diện linh hoạt
- **Responsive Design** - Tối ưu cho mọi thiết bị
- **Drag & Drop** - Powered by @dnd-kit
- **Animations** - Chuyển động mượt mà với Framer Motion
- **Calendar View** - Xem tasks dạng lịch với react-big-calendar
- **Charts & Analytics** - Biểu đồ thống kê với Recharts
- **Onboarding Tour** - Hướng dẫn sử dụng với Driver.js

## 🛠️ Công nghệ sử dụng

### Frontend
```
⚛️  React 19.1.0              - UI Framework
🎨  Material-UI (MUI) 7.3.6    - Component Library
🎭  Tailwind CSS 4.1.13        - Utility-first CSS
🗂️  Redux Toolkit 2.0.1        - State Management
🔄  React Query 5.90.16        - Server State Management
🖱️  @dnd-kit                   - Drag and Drop
🎬  Framer Motion 12.23.22    - Animations
🚦  React Router 6.21.3        - Routing
📝  React Hook Form 7.49.3    - Form Management
🌐  Axios 1.5.1                - HTTP Client
🔌  Socket.io-client 4.7.4    - WebSocket Client
```

### Backend
```
Node.js 18.x              - Runtime Environment
Express 4.18.2            - Web Framework
MongoDB 6.0               - NoSQL Database
Redis 5.10                - Caching & Session Store
Socket.io 4.7.4           - Real-time Communication
JWT (jsonwebtoken 9.0.2) - Authentication
bcryptjs 2.4.3            - Password Hashing
Resend + Brevo            - Email Services
Cloudinary 2.7.0          - File Storage
Joi 17.13.3               - Schema Validation
VNPay SDK 2.4.4           - Payment Gateway
otplib 12.0.1             - 2FA/OTP Generation
node-cron 4.2.1           - Scheduled Jobs
```

### DevOps & Tools
```
📦  Vite 7.0.0                - Build Tool
🔧  Babel 7.22.10             - Transpiler
🔍  ESLint 9.29.0             - Code Linting
🐳  Docker-ready              - Containerization
☁️  Vercel                    - Frontend Deployment
```

## 🏗️ Kiến trúc hệ thống

```
TaskFlow/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── apis/            # API clients
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store & slices
│   │   ├── layouts/         # Layout components
│   │   ├── customHooks/     # Custom React hooks
│   │   ├── utils/           # Utilities & helpers
│   │   └── config/          # Configuration files
│   └── package.json
│
└── backend/                  # Node.js API Server
    ├── src/
    │   ├── server.js        # Entry point
    │   ├── config/          # DB, Redis, CORS config
    │   ├── controllers/     # Request handlers
    │   ├── services/        # Business logic
    │   ├── models/          # MongoDB schemas
    │   ├── routes/          # API routes (v1, v2)
    │   ├── middlewares/     # Auth, validation, error handling
    │   ├── validations/     # Joi schemas
    │   ├── sockets/         # Socket.io handlers
    │   ├── jobs/            # Cron jobs
    │   ├── providers/       # External services
    │   └── utils/           # Utilities & helpers
    └── package.json
```

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- MongoDB >= 6.0
- Redis >= 5.x
- npm hoặc yarn

### 1️⃣ Clone repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2️⃣ Cài đặt Backend
```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Cấu hình các biến môi trường trong .env:
# - MONGODB_URI
# - REDIS_URL
# - JWT_SECRET
# - CLOUDINARY_* (API keys)
# - EMAIL_* (Resend/Brevo API keys)
# - VNPAY_* (VNPay credentials)
# - etc.

# Chạy development server
npm run dev
```

### 3️⃣ Cài đặt Frontend
```bash
cd frontend
npm install

# Tạo file .env
cp .env.example .env
# Cấu hình:
# - VITE_API_ROOT
# - VITE_AUTH0_* (Auth0 credentials)

# Chạy development server
npm run dev
```

### 4️⃣ Truy cập ứng dụng
- Frontend: http://localhost:5173
- Backend API: http://localhost:8017

## 📚 Tài liệu API

### Authentication Endpoints
```
POST   /v1/users/register          - Đăng ký tài khoản
POST   /v1/users/verify            - Xác thực email
POST   /v1/users/login             - Đăng nhập
POST   /v1/users/logout            - Đăng xuất
POST   /v1/users/refresh_token     - Làm mới token
POST   /v1/users/2fa/enable        - Bật 2FA
POST   /v1/users/2fa/verify        - Xác thực 2FA
```

### Board Management
```
GET    /v1/boards                  - Lấy danh sách boards
POST   /v1/boards                  - Tạo board mới
GET    /v1/boards/:id              - Lấy chi tiết board
PUT    /v1/boards/:id              - Cập nhật board
DELETE /v1/boards/:id              - Xóa board
POST   /v1/boards/:id/members      - Mời thành viên
```

### Column & Card Management
```
POST   /v1/columns                 - Tạo column
PUT    /v1/columns/:id             - Cập nhật column
DELETE /v1/columns/:id             - Xóa column

POST   /v1/cards                   - Tạo card
PUT    /v1/cards/:id               - Cập nhật card
DELETE /v1/cards/:id               - Xóa card
POST   /v1/cards/:id/comments      - Thêm comment
POST   /v1/cards/:id/attachments   - Upload attachment
```

### Payment
```
POST   /v1/payment/create          - Tạo đơn hàng VNPay
GET    /v1/payment/vnpay_return    - Callback VNPay
```

### Admin
```
GET    /v1/admin/users             - Quản lý users
GET    /v1/admin/analytics         - Thống kê hệ thống
PUT    /v1/admin/settings          - Cấu hình hệ thống
```

## 🔌 WebSocket Events

### Real-time Updates
```javascript
// Board updates
socket.on('boardUpdate', (data) => { ... })

// Card updates
socket.on('cardUpdate', (data) => { ... })

// Invite notifications
socket.on('inviteReceived', (data) => { ... })
```

## 🎯 Roadmap

- [ ] **Notifications** - Push notifications
- [ ] **Time Tracking** - Tích hợp theo dõi thời gian
- [ ] **Reporting** - Báo cáo chi tiết hơn
- [ ] **Integrations** - Slack, Google Calendar, GitHub
- [ ] **AI Features** - Gợi ý task, auto-assignment
- [ ] **Advanced Permissions** - Custom roles
- [ ] **Webhooks** - API webhooks cho tích hợp

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request


## 👨‍💻 Tác giả

**Do Tat Tuan**
- GitHub: [@tuanvdtd](https://github.com/tuanvdtd)

## 🙏 Lời cảm ơn

- [Trello](https://trello.com) - Cảm hứng cho giao diện
- [Material-UI](https://mui.com) - Component library tuyệt vời
- [MongoDB](https://www.mongodb.com) - Database linh hoạt
- Tất cả contributors và open-source community

---

<div align="center">

**⭐ Nếu bạn thấy dự án hữu ích, hãy cho một star nhé! ⭐**

</div>

