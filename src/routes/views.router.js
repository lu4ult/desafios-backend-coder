import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/profile', (req, res) => {

    //Cómo le paso el usuario logueado??
    // res.render('profile', user);
    res.render('profile');
});

router.get('/register-error', (req, res) => {
    res.render('register-error');
});

router.get('/error-login', (req, res) => {
    res.render('error-login');
})

export default router;