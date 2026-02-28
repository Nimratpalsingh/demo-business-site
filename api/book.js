export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, phone, email, message } = req.body;

    console.log("New booking:", name, phone, email, message);

    return res.status(200).json({
      message: "Booking received successfully!"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
}
