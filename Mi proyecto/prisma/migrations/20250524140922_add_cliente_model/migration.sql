/*
  Warnings:

  - Added the required column `clienteId` to the `Equipo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "clienteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_nit_key" ON "Cliente"("nit");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
