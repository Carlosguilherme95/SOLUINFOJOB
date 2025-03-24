import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../service/userService";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers["x-access-token"];

  if (!token || Array.isArray(token)) {
    res.status(404).json({ error: "Token não fornecido ou inválido" });
    return;
  }

  try {
    if (typeof token === "string") {
      const decoded = jwt.verify(token, SECRET);
      (req as any).user = decoded;
      return next();
    } else {
      res.status(400).json({ error: "Token inválido" });
      return;
    }
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }
}
