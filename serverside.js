const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/transactionsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// Schema & Model
const transactionSchema = new mongoose.Schema({
  date: String,
  amount: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes

// POST: Create new transaction
app.post("/api/transactions", async (req, res) => {
  try {
    const { date, amount } = req.body;
    const newTransaction = new Transaction({ date, amount });
    await newTransaction.save();
    res.status(201).json({ message: "✅ Transaction saved!" });
  } catch (error) {
    console.error("❌ Error in POST /api/transactions:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET: Retrieve all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error in GET /api/transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
