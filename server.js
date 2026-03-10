const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://dtd69629_db_user:dtd0987654321@cluster0.w1pvxha.mongodb.net/historial_app")
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error(err));

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

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  stops: { type: String, required: true },
  price: { type: String, required: true },
  icon: { type: String, default: 'fas fa-plane' },
  createdAt: { type: Date, default: Date.now }
});

const Flight = mongoose.model("Flight", flightSchema);

app.post("/flights", async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/flights/:id", async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/flights/:id", async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Vuelo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tickets", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
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

app.put("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("API del Historial de Vuelos Funcional");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Puerto ${PORT}`));

