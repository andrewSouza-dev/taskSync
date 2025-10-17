import { loginService } from "../services/authService";

export class loginController {
    constructor (private readonly authService: authService)
    async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
    };
} 