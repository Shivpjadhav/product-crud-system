exports.likeProduct =
    async (req, res) => {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        const userId =
            req.user.id;

        const alreadyLiked =
            product.likes.includes(
                userId
            );

        if (alreadyLiked) {

            product.likes =
                product.likes.filter(
                    id =>
                        id.toString() !==
                        userId
                );

        } else {

            product.likes.push(
                userId
            );

        }

        await product.save();

        res.json({
            message:
                alreadyLiked
                    ? "Product Unliked"
                    : "Product Liked"
        });

    };
exports.getProducts =
    async (req, res) => {

        const products =
            await Product.find();

        const updatedProducts =
            products.map(product => ({

                ...product.toObject(),

                isLiked:
                    product.likes.some(
                        id =>
                            id.toString() ===
                            req.user.id
                    )

            }));

        res.json(
            updatedProducts
        );

    };
