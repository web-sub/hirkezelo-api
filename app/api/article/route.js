import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/article:
 *   get:
 *     summary: Összes cikk lekérdezése
 *     description: Visszaadja az összes cikket az adatbázisból
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     responses:
 *       401:
 *         description: Sikertelen lekérdezés
 *       200:
 *         description: Sikeres lekérdezés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   Title:
 *                     type: string
 *                   image:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   content:
 *                     type: string
 *                   userId:
 *                     type: string
 */

export async function GET() {
	const articles = await prisma.articles.findMany({
		include: {
			author: true,
		},
	});
	return NextResponse.json(articles.length > 0 ? articles : "Nem található poszt");
}

/**
 * @swagger
 * /api/article:
 *   post:
 *     summary: Cikk feltöltése az adatbázisba
 *     description: Az adatbázisba feltölti a megadott cikket
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     responses:
 *       401:
 *         description: Sikertelen feltöltés
 *       200:
 *         description: Sikeres feltöltés
 *     requestBody:
 *       description: JSON request body for creating a post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 */

export async function POST(request) {
	const data = await request.json();

	const userId = request.headers.get("userId");
	data.author = {
		connect: {
			id: userId,
		},
	};

	try {
		const create = await prisma.articles.create({ data: data });
		if (create) {
			return new NextResponse("Sikeres feltöltés");
		} else {
			return new NextResponse("A feltöltés sikertelen");
		}
	} catch (error) {
		// Handle the error here, you can log it or return an appropriate response
		return new NextResponse("Hiba történt a feltöltés során: " + error.message);
	}
}

/**
 * @swagger
 * /api/article:
 *   delete:
 *     summary: Összes cikk törlése
 *     description: Törli az összes adatbázisban lévő cikket
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     responses:
 *       401:
 *         description: Sikertelen törlés
 *       200:
 *         description: Sikeres Törlés
 */

export async function DELETE(request) {
	try {
		const remove = await prisma.articles.deleteMany();
		if (remove) {
			return new NextResponse("Sikeres törlés");
		} else {
			return new NextResponse("A törlés sikertelen");
		}
	} catch (error) {
		return new NextResponse("Hiba történt a törlés során: " + error.message);
	}
}
