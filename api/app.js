import express from 'express';
import cors from 'cors';
import fs from "fs"
import https from "https"

import { addProduct } from './controllers/addProduct.controller.js';
import { reqCatalog } from './controllers/reqCatalog.controller.js';
import { register } from './controllers/register.controller.js';
import { login } from './controllers/login.controller.js';
import { PrismaClient } from '@prisma/client';

import { verifyToken } from './middleware/auth.middleware.js';
import { guestSession } from './middleware/guestSession.middleware.js';
import cookieParser from 'cookie-parser';
import { userProducts } from './controllers/userProducts.controller.js';
import { addComment } from './controllers/addComment.controller.js';
import { reqComment } from './controllers/reqComment.controller.js';
import { reqBasket } from './controllers/reqBasket.controller.js';
import { addToBasket, removeFromBasket } from './controllers/changeBasket.controller.js';
import { searchUsers, searchProduct } from './controllers/search.controller.js';
import { reqUser } from './controllers/reqUser.controller.js';
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['https://localhost:5000', 'https://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

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

app.post('/addProduct', verifyToken, addProduct);
app.post('/addComment', verifyToken, addComment);

app.get('/createGuestSession', guestSession);
app.post('/addToBasket', addToBasket);
app.post('/removeFromBasket', removeFromBasket);
app.get('/reqBasket', reqBasket);

app.get('/reqComment', reqComment);
app.get('/catalog', reqCatalog);
app.get('/userProducts/:id', userProducts);
app.get('/reqUser', reqUser)

app.get('/productPage', async(req, res) => {
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
    console.log("Товар що приходить:", id, " Від кого:", req.user.id)
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
        console.log(err);
        res.status(500).json({ error: 'Не вдалось видалити товар' })
    }
})

app.post('/register', register);
app.post('/login', login);

app.post('/logout', (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });
    return res.status(200).json({ message: 'Ви вийшли з аккаунту!' });
});

https.createServer(httpOptions, app).listen(PORT, () => {
    console.log('Бекенд включився')
})