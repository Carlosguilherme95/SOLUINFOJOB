import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../service/userService";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers["authorization"]?.split(" ")[1] as string;

  if (!token) {
    res.status(401).json({ error: "Token não fornecido ou inválido" });
  }

  try {
    if (typeof token !== "string") {
      res.status(400).json({ error: "Token inválido" });
    }

    const decoded = jwt.verify(token, SECRET);

    (req as any).user = decoded;

    return next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
