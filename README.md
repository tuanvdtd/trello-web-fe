# Trello Web

Frontend của ứng dụng web giống Trello, xây dựng bằng React và Vite.

## 🚀 Demo

- Client: https://trello-web-beige.vercel.app  
- Server/Backend: https://trello-api-express.onrender.com  


## 🛠️ Công nghệ sử dụng

### Frontend — [trello-web-fe](https://github.com/tuanvdtd/trello-web-fe)
- **React** — xây dựng giao diện component-based  
- **Vite** — bundler / dev server, hỗ trợ HMR  
- **React Router** — định tuyến phía client  
- **Axios** — gọi API backend  
- **JavaScript (ES6+)** — ngôn ngữ chính   
- **Triển khai**: Vercel (static hosting)  

### Backend — [trello_api_express](https://github.com/tuanvdtd/trello_api_express)
- **Node.js + Express** — xây dựng RESTful API  
- **CORS** — middleware bảo mật & logging  
- **Dotenv** — quản lý biến môi trường  
- **BcryptJS** — mã hóa mật khẩu  
- **JSON Web Token (JWT)** — xác thực & phân quyền  
- **MongoDB** — cơ sở dữ liệu
- **Brevo/Resend** — gửi email verify
- **Triển khai**: Render 

---

## ⚙️ Cài đặt & chạy

1. Clone repo:

    ```bash
    git clone https://github.com/tuanvdtd/trello-web-fe.git
    cd trello-web-fe
    ```

2. Cài dependencies:

    ```bash
    yarn install
    # hoặc
    npm install
    ```

3. Chạy dev server:

    ```bash
    yarn dev
    # hoặc
    npm run dev
    ```