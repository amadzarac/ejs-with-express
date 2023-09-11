import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  //check if the user is logged in
  const isLoggedIn = req.session.isLoggedIn || false;

  res.render('home', { isLoggedIn });
});

export default router;
