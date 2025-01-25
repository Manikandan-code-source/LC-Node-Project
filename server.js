const express = require('express');
const ConnectDB = require('./Database/Database');
const UserRouter = require('./Router/userRoute');
const AdminRouter = require('./Router/AdminRoutes');
const ProductRouter = require('./Router/productRoute');
const CartRouter = require('./Router/cartRoute')
const AuthMiddleware = require('./Middleware/AdminAuthMiddleware');

const app = express();
app.use(express.json());
app.use("/api/user/", UserRouter);
app.use("/api/admin/", AuthMiddleware, AdminRouter);
app.use("/api/product/", AuthMiddleware, ProductRouter);
app.use("/api/cart/",CartRouter);

require('dotenv').config();

ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port `, process.env.PORT);
    })
})
