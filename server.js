const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
console.log("PAYSTACK KEY:", PAYSTACK_SECRET_KEY);
app.post("/pay", async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log("PAYSTACK ERROR:", error.response?.data || error.message);

    res.status(500).json({
      status: false,
      message: error.response?.data || error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});