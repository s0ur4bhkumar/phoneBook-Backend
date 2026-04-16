import express from "express";
import { prisma } from "./lib/prisma";
import services from "./services/script";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan("tiny"));
const errorHandler = (
  error: any,
  request: any,
  response: any,
  next: (err: any) => void,
) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformed id",
    });
  }
  next(error);
};

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
  res.json(contacts);
});

app.post("/api/contacts", async (req, res) => {
  const contact = req.body;
  await services.createContact(contact);
  res.json(contact);
});

app.delete("/api/contacts/:id", async (req, res) => {
  const id = req.params.id;
  await services.deleteContact(parseInt(id));
  return res.status(204);
});

app.get("/api/contacts/:id", async (req, res, next) => {
  const id = req.params.id;
  await services
    .getContact(parseInt(id))
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((Error) => next(Error));
});

app.put("/api/contacts", async (req, res, next) => {
  const body = req.body;
  await services.updateContact(body);
  const contacts = await services.getAll();
  res.json(contacts);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
