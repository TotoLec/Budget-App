const router = require("express").Router();
const User = require("../model/User");
const userModel = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

//Register
router.post('/register', async (req,res) => {
    //Validate data with Joi
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //checking if the user is already in DB
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email already exist");

    //Hash passwords
    const salt = 10; //Complexity
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    // Create a new User
    const user = new userModel({
        name: req.body.name,
        email: req.body.email ,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send({user: user._id});
        
        // Create ans assign token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    }catch(err){
        res.status(400).send(err);
    }
});

//Login 
router.post('/login', async (req,res) => {
    //Validate data with Joi
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is in DB
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email doesn't exist");

    //Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Password");

    // Create ans assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

router.get('/getUser', verify,(req, res) => {
    let userId = req.user

    User.findById(userId._id)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Erreur interne du serveur");
        });
})


module.exports = router;