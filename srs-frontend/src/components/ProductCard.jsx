import { useState } from "react";
import API from "../services/api";
import "./ProductCard.css";

function ProductCard({ product, refresh }) {

    const [liked, setLiked] =
        useState(product.isLiked);

    const handleLike = async () => {

        try {

            await API.post(
                `/products/${product._id}/like`
            );

            setLiked(!liked);

            refresh();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="product-card">

            <img
                src={product.image}
                alt={product.title}
            />

            <h3>{product.title}</h3>

            <button
                onClick={handleLike}
                className={
                    liked
                        ? "liked-btn"
                        : "like-btn"
                }
            >
                ❤️ Like
            </button>

        </div>

    );
}

export default ProductCard;
