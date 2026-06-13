const User = require("../models/User");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

exports.register =
    async (req, res) => {

        try {

            const {
    name,
    email,
    mobile,
    password
} = req.body;

const user = await User.create({
    name,
    email,
    mobile,
    password:hashedPassword
});

            const userExists =
                await User.findOne({
                    email
                });

            if (userExists) {

                return res
                    .status(400)
                    .json({
                        message:
                            "User already exists"
                    });
            }

            const hashed =
                await bcrypt.hash(
                    password,
                    10
                );

            const user =
                await User.create({
                    name,
                    email,
                    password:
                        hashed
                });

            res.status(201)
                .json(user);

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message
                });
        }
    };

exports.login =
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const user =
                await User.findOne({
                    email
                });

            if (!user) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid Credentials"
                    });
            }

            const match =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!match) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid Credentials"
                    });
            }

            const token =
                jwt.sign(
                    {
                        id:
                            user._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:
                            "7d"
                    }
                );

            res.json({
                token,
                user:{
    id:user._id,
    name:user.name,
    email:user.email,
    mobile:user.mobile
}
            });

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message
                });
        }
    };
