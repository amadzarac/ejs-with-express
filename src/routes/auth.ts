import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

const users: { email: string; password: string }[] = [];

//register page
router.get('/register', (req: Request, res: Response) => {
  res.render('register');
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //hash pw
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a user object and store it in memory
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    //redirect to login page after successful registration
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//login page
router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = users.find((u) => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      //session variable to indicate the user is logged in
      req.session.isLoggedIn = true;

      //redirect to the home page after successful login
      res.redirect('/');
    } else {
      res.redirect('/auth/login'); //redirect back to login if fails
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
