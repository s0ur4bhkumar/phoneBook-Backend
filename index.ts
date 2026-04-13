import express from "express";
import { prisma } from "./lib/prisma";
import services from "./services/script";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const contacts = await prisma.contacts.count();
  res.json(
    contacts === 0
      ? "no contacts have been added yet"
      : "some users have been added to the datase",
  );
});

app.get("/api/contacts", async (req, res) => {
  const contacts = await services.getAll();
  console.log(contacts);
  res.json(contacts);
});

app.post("/api/contacts", async (req, res) => {
  const contact = req.body;
  await services.createContact(contact);
  console.log(contact);
  res.json(contact);
});

app.delete("/api/contacts/:id", async (req, res) => {
  const id = req.params.id;
  await services.deleteContact(parseInt(id));
  return res.status(204);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
