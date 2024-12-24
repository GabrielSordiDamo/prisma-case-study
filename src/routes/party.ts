import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/parties/:
 *   get:
 *     summary: Get all parties
 *     responses:
 *       200:
 *         description: List of parties
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const parties = await prisma.party.findMany();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/parties/{id}:
 *   get:
 *     summary: Get a party by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Party ID
 *     responses:
 *       200:
 *         description: A party
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const party = await prisma.party.findUnique({ where: { id } });
    if (!party) return res.status(404).json({ error: "Party not found" });
    res.json(party);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/parties:
 *   post:
 *     summary: Create a new party
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created party
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, ownerId } = req.body;

    const owner = ownerId
      ? await prisma.party.findUnique({ where: { id: ownerId } })
      : null;
    const path = owner ? `${owner.path}/${owner.id}` : "";

    const newParty = await prisma.party.create({
      data: { name, ownerId, path },
    });
    res.status(201).json(newParty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/parties/{id}:
 *   delete:
 *     summary: Delete a party by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Party ID
 *     responses:
 *       204:
 *         description: No content
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.party.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/parties/{id}/parents:
 *   get:
 *     summary: Get all parents of a given party
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Party ID
 *     responses:
 *       200:
 *         description: List of parent parties
 */
router.get("/:id/parents", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const party = await prisma.party.findUnique({ where: { id } });
    if (!party) return res.status(404).json({ error: "Party not found" });

    const parentIds = party.path.split("/").filter(Boolean);

    const parents = await prisma.party.findMany({
      where: { id: { in: parentIds } },
    });

    res.json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/parties/{id}/subsidiaries:
 *   get:
 *     summary: Get all subsidiaries of a given party
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Party ID
 *     responses:
 *       200:
 *         description: List of subsidiary parties
 */
router.get("/:id/subsidiaries", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subsidiaries = await prisma.party.findMany({
      where: {
        path: { contains: `/${id}` },
      },
    });

    res.json(subsidiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
