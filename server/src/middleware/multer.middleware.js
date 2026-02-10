import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/products');
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName)
    }
});

export const upload = multer({ storage });

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(process.cwd(), '../uploads/users'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `user_${Date.now()}${ext}`)
    }
})

export const uploadUserAvatar = multer({ storage: userStorage })

const blogStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(process.cwd(), '../uploads/posts'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `blog_${Date.now()}${ext}`)
    }
})

export const uploadBlogImages = multer({ storage: blogStorage })