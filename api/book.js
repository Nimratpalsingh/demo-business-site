import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await client.connect();

    const db = client.db("bookingDB");
    const collection = db.collection("appointments");

    const { name, phone, email, message } = req.body;

    await collection.insertOne({
      name,
      phone,
      email,
      message,
      createdAt: new Date()
    });

    return res.status(200).json({
      message: "Booking saved successfully!"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error occurred"
    });
  }
}
