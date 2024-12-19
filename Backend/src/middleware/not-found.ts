import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(404).send("Route Doesnot Exist");
};

export default notFound;