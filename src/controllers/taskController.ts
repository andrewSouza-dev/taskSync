import { PrismaClient } from "@prisma/client";
import { Handler } from "express";

const prisma = new PrismaClient();

export class taskController {
    private prisma: PrismaClient;

    constructor ( prisma: PrismaClient ) {
        this.prisma = prisma
    };

    getAllTasks: Handler = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    showTask: Handler = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    
    createTask: Handler = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const { title } = req.body;

        const task = await prisma.task.create({
        data: { title, userId },
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
    }

    updateTask: Handler = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}
