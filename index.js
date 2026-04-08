import express from "express";

const app = express();
app.use(express.json());

let persons = [
  { id: 1, Name: "Alex Rivera", Number: "+1-555-010-2345" },
  { id: 2, Name: "Jordan Chen", Number: "+1-555-012-9876" },
  { id: 3, Name: "Sam Taylor", Number: "+1-555-015-4433" },
  { id: 4, Name: "Morgan Hayes", Number: "+1-555-019-1122" },
  { id: 5, Name: "Casey Jordan", Number: "+1-555-011-8899" },
  { id: 6, Name: "Riley Quinn", Number: "+1-555-014-7766" },
  { id: 7, Name: "Jamie Vance", Number: "+1-555-017-3344" },
  { id: 8, Name: "Taylor Reed", Number: "+1-555-013-5500" },
  { id: 9, Name: "Dakota Smith", Number: "+1-555-018-2211" },
  { id: 10, Name: "Skyler Moss", Number: "+1-555-016-9988" },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const person = persons.find((person) => person.id === Number(id));
  console.log(person);
  if (!person) {
    res.status(404).end();
    return;
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== Number(id));
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.Name || !body.Number) {
    res.status(400).send({
      message: "incomplete details",
    });
    return;
  }
  const person = {
    id: crypto.randomUUID(),
    Name: body.Name,
    Number: body.Number,
  };

  persons = [...persons, person];
  res.json(persons);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
