import express from 'express';
import cors from 'cors';
import fs from "fs"
import https from "https"
import path from 'path';

// Regular Controllers
import { addProduct } from './controllers/addProduct.controller.js';
import { reqCatalog, reqMostSaleProducts } from './controllers/reqCatalog.controller.js';
import { register } from './controllers/register.controller.js';
import { login } from './controllers/login.controller.js';
import { PrismaClient } from '@prisma/client';

// Regular Controllers
import { verifyToken } from './middleware/auth.middleware.js';
import { banGuard } from './middleware/banGuard.middleware.js';
import { guestSession } from './middleware/guestSession.middleware.js';
import { upload, uploadUserAvatar, uploadBlogImages } from './middleware/multer.middleware.js';

import cookieParser from 'cookie-parser';
import { userProducts } from './controllers/userProducts.controller.js';
import { addComment, addReply } from './controllers/addComment.controller.js';
import { addReport } from './controllers/addReport.controller.js';
import { reqComment } from './controllers/reqComment.controller.js';
import { reqBasket } from './controllers/reqBasket.controller.js';
import { addToBasket, removeFromBasket } from './controllers/changeBasket.controller.js';
import { searchUsers, searchProduct } from './controllers/search.controller.js';
import { reqUser } from './controllers/reqUser.controller.js';
import { addGeneralComment, reqGeneralComments } from './controllers/generalComments.controller.js';
import { reqBlogPosts, reqBlogPost, addBlogPost } from './controllers/blog.controller.js';
import { createOrder, reqOrder, reqOrders, reqOrdersByUser, updateStatusOrder, deleteOrder } from './controllers/order.controller.js';
import bcryptjs from 'bcryptjs';
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(cors({
    origin: [`${process.env.CLIENT_URL}`, `${process.env.SERVER_URL}`],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(
    path.resolve(process.cwd(), '../uploads')
))

const httpOptions = {
    key: fs.readFileSync('../client/localhost-key.pem'),
    cert: fs.readFileSync('../client/localhost.pem'),
}

app.get("/user-data", verifyToken, async(req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id }
    });
    res.json(user);
})

app.post('/addProduct', verifyToken, loadUser, banGuard, upload.single('image'), addProduct);

// app.get('/reqReply', reqReply);

app.get('/reqBlogPosts', reqBlogPosts);
app.get('/reqBlogPost', reqBlogPost);

app.get('/reqGeneralComments', reqGeneralComments)
app.post('/addGeneralComment', verifyToken, banGuard, addGeneralComment)

app.post('/addComment', verifyToken, loadUser, banGuard, addComment);
app.post('/addReply', verifyToken, loadUser, banGuard, addReply);
app.post('/addReport', verifyToken, loadUser, banGuard, addReport);

app.get('/createGuestSession', guestSession);
app.post('/addToBasket', addToBasket);
app.post('/removeFromBasket', removeFromBasket);
app.get('/reqBasket', reqBasket);

app.post('/createOrder', createOrder)
app.post('/updateStatusOrder', updateStatusOrder)
app.get('/reqOrder', reqOrder)
app.get('/reqOrdersByUser', reqOrdersByUser)
app.post('/deleteFromOrder', deleteOrder)

app.get('/reqComment', reqComment);
app.get('/catalog', reqCatalog);
app.get('/reqMostSaleProduts', reqMostSaleProducts)
app.get('/userProducts/:id', userProducts);
app.get('/reqUser', reqUser)

app.get('/productPage/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id: id } });

        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ error: 'Не вдалось дістати дані продукту' })
    }
})

app.get('/search/user', searchUsers)
app.get('/search/product', searchProduct)

app.get('')

app.delete('/deleteProduct/:id', verifyToken, async(req, res) => {
    const { id } = req.params;

    try {
        const deleted = await prisma.product.delete({
            where: {
                id: id,
                userId: req.user.id
            }
        });

        if (deleted.count === 0) {
            return res.status(404).json({ message: "Товар не знайдено" })
        }

        res.status(200).json({ message: "Товар успішно видалено" })
    } catch (err) {
        res.status(500).json({ error: 'Не вдалось видалити товар' })
    }
})

app.post('/register', register);
app.post('/login', login);

// Змінення імені 
app.put("/user/changeUsername", verifyToken, async(req, res) => {
    try {
        const { username } = req.body;
        const userId = req.user.id

        const updateUsername = await prisma.user.update({
            where: { id: userId },
            data: { name: username }
        })

        res.status(200).json({ message: "Ім'я користувача змінено!" })
    } catch (err) {
        res.status(500).json({ error: "Невдалося змінити ім'я користувача" })
    }
})

// Змінення паролю
app.put("/user/changePassword", verifyToken, async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        const matchPassword = await bcryptjs.compare(oldPassword, user.password)

        if (!matchPassword) {
            return res.status(400).json({ error: "Введено невірний поточний пароль" });
        }

        const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedNewPassword }
        })

        res.status(200).json({ message: "Пароль успішно змінено" })
    } catch (err) {
        res.status(500).json({ error: "Невдалося змінити пароль користувача" })
    }
})

app.put("/user/changeAvatar", verifyToken, uploadUserAvatar.single('image'), async(req, res) => {
    try {
        const imageName = req.file ? req.file.filename : null;
        const userId = req.user.id

        await prisma.user.update({
            where: { id: userId },
            data: { avatar: imageName }
        })

        res.status(200).json({ message: "Аватар змінено!" })
    } catch (err) {
        res.status(500).json({ error: "Невдалося змінити аватар!" })
    }
})

app.post('/logout', (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });
    return res.status(200).json({ message: 'Ви вийшли з аккаунту!' });
});

// Контролер, що робить користувача адміном
// app.get('/meAsAdmin', verifyToken, async(req, res) => {
//     const user = req.user;
//     try {
//         await prisma.user.update({
//             where: { id: user.id },
//             data: { role: 'ADMIN' }
//         })
//         res.status(200).json({ message: "Успішно змілось" })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: "Памілка" })
//     }
// })

// Admin Controllers
// import {} from './middleware/checkAdmin.middleware.js';
import { searchUserById, banUser, unbanUser } from './adminControllers/adminUser.controller.js';
import { searchProductById, changeStatus, updateProduct } from './adminControllers/adminProduct.controller.js';
import { searchCommentById, deleteComment } from './adminControllers/adminComment.controller.js';
import { getReports } from './adminControllers/getReports.controller.js';
import { loadUser } from './middleware/loadUser.middleware.js';
import { requireAdmin } from './middleware/checkAdmin.middleware.js';

app.get("/admin/user", searchUserById)
app.post("/admin/banUser", banUser)
app.post("/admin/unbanUser", unbanUser)

app.get("/admin/product", searchProductById)
app.post("/admin/productStatus", changeStatus)

app.put("/updateProduct", verifyToken, loadUser, banGuard, upload.single('newImage'), updateProduct)

app.get("/admin/comment", searchCommentById)
app.post("/admin/deleteComment", deleteComment)

app.get("/admin/getReports", verifyToken, getReports)

app.get('/reqOrders', reqOrders)

app.post('/addBlogPost', verifyToken, loadUser, uploadBlogImages.single('image'), addBlogPost);

// app.get("/admin/checkServ", (req,res)=>res.send("OK"));


https.createServer(httpOptions, app).listen(PORT, () => {
    console.log('Бекенд включився')
})