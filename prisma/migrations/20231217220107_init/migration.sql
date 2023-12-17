/*
  Warnings:

  - Added the required column `confirm_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirm_password" VARCHAR(255) NOT NULL;
