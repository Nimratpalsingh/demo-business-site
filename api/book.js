export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";

      req.on("data", chunk => {
        data += chunk;
      });

      req.on("end", () => {
        resolve(JSON.parse(data));
      });

      req.on("error", err => {
        reject(err);
      });
    });

    const { name, phone, email, message } = body;

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
