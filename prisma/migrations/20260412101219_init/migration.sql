/*
  Warnings:

  - You are about to drop the `Persons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Persons";

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_contact_key" ON "Contacts"("contact");
