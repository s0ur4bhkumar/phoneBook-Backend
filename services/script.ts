import { prisma } from "../lib/prisma";

type Contact = {
  name: string;
  contact: string;
};

async function main() {
  const user = await prisma.contacts.createMany({
    data: [
      { name: "Alice Johnson", contact: "555-0101" },
      { name: "Bob Smith", contact: "555-0102" },
      { name: "Charlie Davis", contact: "555-0103" },
      { name: "Diana Prince", contact: "555-0104" },
      { name: "Edward Norton", contact: "555-0105" },
      { name: "Fiona Gallagher", contact: "555-0106" },
      { name: "George Miller", contact: "555-0107" },
      { name: "Hannah Abbott", contact: "555-0108" },
      { name: "Ian Wright", contact: "555-0109" },
    ],
  });
  console.log(user);
}

async function createContact(contactObject: Contact) {
  await prisma.contacts.create({
    data: contactObject,
  });
  return;
}

async function deleteContact(id: number) {
  await prisma.contacts.delete({
    where: { id: id },
  });
  return;
}

async function getAll() {
  const contacts = await prisma.contacts.findMany();
  console.log(contacts);
  return contacts;
}

export default { createContact, deleteContact, getAll };
