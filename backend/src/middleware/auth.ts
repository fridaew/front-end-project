
import { RequestHandler } from "express";

export const requiresAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next(); // Continue to the next middleware or route
  } else {
    res.status(401).json({ message: "User not authenticated" }); // Send a 401 Unauthorized response
  }
};
