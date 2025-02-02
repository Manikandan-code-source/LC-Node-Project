const express = require('express');
const ConnectDB = require('./Database/Database');
const CustomerRouter = require('./Router/customerRoute');
const AdminRouter = require('./Router/AdminRoutes');
const ProductRouter = require('./Router/productRoute');
const CartRouter = require('./Router/cartRoute')
const AdminAuthRouter = require("./Router/AdminAuthRouter")
const ContactRouter = require("./Router/contactUsRouter")
const cors = require('cors')
const TokenVerifier = require("./Middleware/TokenVerifierMiddleware")

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/user/", CustomerRouter);
app.use("/api/admin/", TokenVerifier, AdminRouter);
app.use("/api/product/", ProductRouter);
app.use("/api/cart/", CartRouter);
app.use("/api/protected", TokenVerifier, AdminAuthRouter)
app.use("/api/contact/",ContactRouter)


require('dotenv').config();

ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port `, process.env.PORT);
    })
})
