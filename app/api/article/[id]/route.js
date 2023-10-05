import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   - name: Cikk
 *     description: cikkekkel kapcsolatos műveletek
 *  */

/**
 * @swagger
 * /api/article/{article_id}:
 *   get:
 *     summary: Egy adott cikk lekérdezése ID alapján
 *     description: ID alapján visszaadja a lekérdezett cikket az adatbázisból
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     parameters:
 *      - in: path
 *        name: article_id
 *        schema:
 *          type: string
 *        required: true
 *        description: A kívánt cikk ID-je
 *     responses:
 *       401:
 *         description: Sikertelen lekérdezés
 *       200:
 *         description: Sikeres lekérdezés
 */

export async function GET(request) {
	try {
		const match = request.nextUrl.pathname.match(/\/article\/(.*)/);
		const id = match[1];
		const article = await prisma.articles.findUnique({
			where: {
				id: id,
			},
			include: {
				author: true,
			},
		});
		if (article) {
			return NextResponse.json(article);
		} else {
			return new NextResponse("A lekérdezés sikertelen");
		}
	} catch (error) {
		return new NextResponse("Hiba történt a lekérdezés során: " + error.message);
	}
}

/**
 * @swagger
 * /api/article/{article_id}:
 *   delete:
 *     summary: Egy adott cikk törlése ID alapján
 *     description: Törli a megadott ID-vel rendelkező cikket az adatbázisból
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     parameters:
 *      - in: path
 *        name: article_id
 *        schema:
 *          type: string
 *        required: true
 *        description: Numeric ID of the article to get
 *     responses:
 *       401:
 *         description: Sikertelen törlés
 *       200:
 *         description: Sikeres törlés
 */

export async function DELETE(request) {
	try {
		const match = request.nextUrl.pathname.match(/\/article\/(.*)/);
		const id = match[1];
		const remove = await prisma.articles.delete({
			where: {
				id: id,
			},
		});
		if (remove) {
			return new NextResponse("Sikeres törlés");
		} else {
			return new NextResponse("A törlés sikertelen");
		}
	} catch (error) {
		return new NextResponse("Hiba történt a törlés során: " + error.message);
	}
}

/**
 * @swagger
 * /api/article/{article_id}:
 *   put:
 *     summary: Egy adott cikk módosítása ID alapján
 *     description: Módosítja a megadott ID-vel rendelkező cikket az adatbázisban.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cikk
 *     parameters:
 *      - in: path
 *        name: article_id
 *        schema:
 *          type: string
 *        required: true
 *        description: Numeric ID of the article to get
 *     responses:
 *       401:
 *         description: Sikertelen módosítás
 *       200:
 *         description: Sikeres módosítás
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
 *               authorId:
 *                 type: string
 */

export async function PUT(request) {
	try {
		const match = request.nextUrl.pathname.match(/\/article\/(.*)/);
		const id = match[1];
		const data = await request.json();
		const update = await prisma.articles.update({
			where: {
				id: id,
			},
			data: data,
			include: {
				author: true,
			},
		});
		if (update) {
			return new NextResponse("Sikeres módosítás");
		} else {
			return new NextResponse("A módosítás sikertelen");
		}
	} catch (error) {
		return new NextResponse("Hiba történt a módosítás során: " + error.message);
	}
}
