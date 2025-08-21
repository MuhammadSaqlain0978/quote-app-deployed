// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json()); // To handle JSON body

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
// db.once("open", () => {
//   console.log("✅ Connected to MongoDB");
// });

// // Quote Schema
// const quoteSchema = new mongoose.Schema({
//   author: String,
//   text: String,
// });

// const Quote = mongoose.model("Quote", quoteSchema);

// // Seed initial quotes if empty
// const seedQuotes = async () => {
//   const count = await Quote.countDocuments();
//   if (count === 0) {
//     await Quote.insertMany([
//       { author: "Albert Einstein", text: "Life is like riding a bicycle. To keep your balance, you must keep moving." },
//       { author: "Oscar Wilde", text: "Be yourself; everyone else is already taken." },
//       { author: "Mark Twain", text: "The secret of getting ahead is getting started." },
//     ]);
//     console.log("Seeded initial quotes");
//   }
// // };
// seedQuotes();

// // Routes

// app.get("/api/", (req, res) => {
//   res.json({ message: "API is working" });
// });

// // Get all quotes
// app.get("/api/quotes", async (req, res) => {
//   const quotes = await Quote.find();
//   res.json(quotes);
// });

// // Get a random quote
// app.get("/api/quotes/random", async (req, res) => {
//   const count = await Quote.countDocuments();
//   const randomIndex = Math.floor(Math.random() * count);
//   const randomQuote = await Quote.findOne().skip(randomIndex);
//   res.json(randomQuote);
// });

// app.listen(PORT, () => {
//   console.log(`✅ Quotes API running on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.set('strict routing', false);
const PORT = 5000;

app.use(cors());
app.use(express.json()); // To handle JSON body

// Quote Schema
const quoteSchema = new mongoose.Schema({
  author: String,
  text: String,
});

const Quote = mongoose.model("Quote", quoteSchema);

// Seed initial quotes if empty
const seedQuotes = async () => {
  const count = await Quote.countDocuments();
  if (count === 0) {
    await Quote.insertMany([
      { author: "Albert Einstein", text: "Life is like riding a bicycle. To keep your balance, you must keep moving." },
      { author: "Oscar Wilde", text: "Be yourself; everyone else is already taken." },
      { author: "Mark Twain", text: "The secret of getting ahead is getting started." },
    ]);
    console.log("🌱 Seeded initial quotes");
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedQuotes();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// Routes
app.get("/api/", (req, res) => {
  res.json({ message: "API is working" });
});

// Get all quotes
app.get("/api/quotes", async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

// Get a random quote
app.get("/api/quotes/random", async (req, res) => {
  const count = await Quote.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const randomQuote = await Quote.findOne().skip(randomIndex);
  res.json(randomQuote);
});

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`✅ Quotes API running on http://localhost:${PORT}`);
});
