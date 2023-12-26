import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    let userID = req.session?.passport?.user ? req.session.passport.user : null;

    //Si ya está logueado, lo mandamos al perfil
    if (userID) {
        res.redirect('/views/profile');
    }

    else {
        res.render('login');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/profile', (req, res) => {
    console.log(req.user)
    const user = req.user.toObject();           //Porque sino handlebars no recibe el objeto, convierte de objeto mongoose a objeto plano
    res.render("profile", { user });
});

router.get('/register-error', (req, res) => {
    res.render('register-error');
});

router.get('/error-login', (req, res) => {
    res.render('error-login');
})

export default router;