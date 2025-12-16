// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, data.Now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage });

// app.use("/uploads", express.static("uploads"))

// app.post("/addProduct", upload.single('image'), async(req, res) => {
//     const [name, price, description] = req.body
//     const imageUrl = `/uploads/${req.file.filename}`;

//     const newProduct = new Product({
//         name,
//         price,
//         description,
//         imageUrl,
//     })
//     await newProduct.save()
//     req.json({ message: "Product added successfully!" })
// })

// app.get('/', async(req, res) => {
//     const products = await Product.find();
//     res.json(products)
// })