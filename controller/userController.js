const User = require('../models/user');
const bcrypt = require('bcrypt');

const securePassword = async (pass) => {
    try{
        const passwordHash = await bcrypt.hash(pass, 10);

        return passwordHash;
    }
    catch(error){
        console.log(error.message);
    }
}

const loadRegister = async (req, res) => {
    try{
        res.render('join');
    }
    catch(error){
        console.log(error.message);
    }
}

const insertUser = async (req, res) => {
    try{
        const email = req.body.email;
        const userData1 = await User.findOne({email: email});

        if(userData1){
            return res.render('join', {message2: "Email already exists"});
        }

        const spassword = await securePassword(req.body.pass);
        const userData = new User({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            pass: spassword,
            fees: req.body.fees,
            plans: req.body.plans
        });
        const data = await userData.save();

        if(data){
            res.render('login', {message: "Your registration has been successfully complete."});
        }
        else{
            res.render('join', {message: "Your registration has been failed"});
        }
    }
    catch(error){
        console.log(error.message);
    }
}

const loginLoad = async (req, res) => {
    try{
        res.render('login');
    }
    catch(error){
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try{
        const email = req.body.email;
        const pass = req.body.pass;
        const userData = await User.findOne({email: email});

        if(userData){
            const passMatch = await bcrypt.compare(pass, userData.pass);
            if(passMatch){
                req.session.user_id = userData._id;
                res.redirect("/view");
            }
            else{
                res.render('login', {message1: "Email and password are incorrect"});
            }
        }
        else{
            res.render('login', {message1: "Email and password are incorrect"});
        }
    }
    catch(error){
        console.log(error.message);
    }
}

const loadView = async (req, res) => {
    try{
        const userData = await User.findById({_id:req.session.user_id});

        if(!userData){
            res.redirect('/login');
            return;
        }
        
        const planCosts = {
            'basic plan': 2250,
            'standard plan': 4500,
            'premium plan': 6750
        };
        let planCost = planCosts[userData.plans.toLowerCase()] || 0;
        
        const fees = parseFloat(userData.fees);
        const totalCost = fees + planCost;
        userData.planCost = planCost;
        userData.totalCost = totalCost;
        await userData.save();
        res.render('view', { user: userData});
    }
    catch(error){
        console.log(error.message);
    }
}

const userLogout = async (req, res) => {
    try{
        req.session.destroy();
        res.redirect('/');
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadView,
    userLogout
}