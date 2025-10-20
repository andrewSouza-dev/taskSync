import { ErrorRequestHandler } from "express";
import  { HttpError } from "../errors/HttpError";
import { ZodError } from "zod";

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {
        res.status(error.status).json({message: error.message})
    }
    else if (error instanceof ZodError) {
        res.status(400).json({ errors: error.issues.map(e => ({
            path: e.path.join('.'),
            message: e.message
        }))
        })
    }
    else if (error instanceof Error) {
        res.status(500).json({ message: error.message })
    }
    else {
        res.status(500).json({ message: "Erro desconhecido no servidor"})
    }
}