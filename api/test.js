import { MongoClient } from "mongodb";

const uri = "mongodb+srv://DeTomasso:QimXgQHPjvzOGJNF@cluster0.fa76dyk.mongodb.net/myDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("✅ Підключено до MongoDB!");

        const db = client.db("myDatabase"); // Змінюй на свою назву БД
        const collection = db.collection("products");

        const newProduct = { name: "Test Product" };
        const result = await collection.insertOne(newProduct);

        console.log("✅ Додано продукт:", result.insertedId);
    } catch (err) {
        console.error("❌ Помилка підключення:", err);
    } finally {
        await client.close();
    }
}

run();