const Product = require("../models/Product");
const User = require("../models/User");


// Get All Products
exports.getProducts = async (req, res) => {

    try {

        const products =
            await Product.find()
                .populate(
                    "createdBy",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Add Product
exports.addProduct = async (req, res) => {

    try {

        const {
    title,
    price,
    description
} = req.body;

const product =
await Product.create({

    title,
    price,
    description,
    image:imageUrl,
    createdBy:req.user.id

});

        const product =
            await Product.create({

                title,
                description,
                image,

                createdBy:
                    req.user.id

            });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Update Product
exports.updateProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404)
                .json({
                    message:
                        "Product not found"
                });

        }

        product.title =
            req.body.title;

        product.description =
            req.body.description;

        product.image =
            req.body.image;

        await product.save();

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};


// Like Product
exports.likeProduct = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.user.id
            );

        const productId =
            req.params.id;

        if (
            user.likedProducts.includes(
                productId
            )
        ) {

            user.likedProducts =
                user.likedProducts.filter(
                    id =>
                        id.toString() !==
                        productId
                );

        } else {

            user.likedProducts.push(
                productId
            );

        }

        await user.save();

        res.json({
            message:
                "Like Updated"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};


// Get Liked Products
exports.getLikedProducts =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                )
                    .populate(
                        "likedProducts"
                    );

            res.json(
                user.likedProducts
            );

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message
                });

        }

    };
    exports.getSingleProduct =
    async (req, res) => {

        try {

            const product =
                await Product.findById(
                    req.params.id
                );

            res.json(product);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };
const products = await Product.find();

const updatedProducts = products.map(product => ({
    ...product.toObject(),
    isLiked: product.likes.includes(req.user.id)
}));

res.json(updatedProducts);
