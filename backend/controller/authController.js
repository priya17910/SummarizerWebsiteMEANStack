const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/authModel');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({email});
        if (user)
        {
            return res.status(400).json({
                message: "User Already Exist",
                success: false
            });
        }
        user = new User ({
            username: username,
            email: email,
            password: password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateJwtToken(user.id);
        res.status (201).json ({
            success: true,
            token: token,
            message: "User registered successfully"
        });
    }
    catch (error) {
        res.status (500).json ({
            message: "Server error! New user registration failed",
            success: false
        });
    }
};

exports.login = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status (400).json ({
                message: "Invalid credentials",
                success: false
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        console.log("isMatched", isMatched);
        if (!isMatched)
        {
            return res.status (400).json ({
                message: "Invalid credentials",
                success: false
            });
        }
        const token = generateJwtToken (user.id);
        console.log(token);
        res.status (200).json ({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    }
    catch (error)
    {
        return res.status (500).json ({
            success: false,
            message: "Internal Server Error, Login unsuccessful"
        });
    }
};

function generateJwtToken (userID) {
    const payload = {
        user: {
            id: userID
        }
    };
    return jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 });
}

exports.getUserDetailsFronUserId = async (req, res) => {
    try
    {
        console.log("In user id controller");
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};