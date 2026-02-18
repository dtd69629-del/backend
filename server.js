const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://dtd69629_db_user:dtd0987654321@cluster0.w1pvxha.mongodb.net/historial_app"
)
.then(() => console.log("MongoDB conectado correctamente"))
.catch(err => console.error("Error MongoDB:", err));

const ticketSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  passengerName: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seat: { type: String, required: true },
  class: { type: String, required: true },
  price: { type: String, required: true },
  flightNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

app.post("/tickets", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json({ message: "Ticket guardado", ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tickets/:uid", async (req, res) => {
  try {
    const tickets = await Ticket.find({ uid: req.params.uid }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
