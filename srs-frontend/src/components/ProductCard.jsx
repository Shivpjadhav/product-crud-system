import API from "../services/api";
import { useNavigate } from "react-router-dom";
import './ProductCard.css';
function ProductCard({ product, refresh }) {
    const navigate = useNavigate();
    const likeProduct = async () => {
        await API.post(`/products/like/${product._id}`);
        refresh();
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="button-group">
                <button onClick={likeProduct}>
                    ❤️ Like
                </button>
                <button onClick={() => navigate(`/edit-product/${product._id}`)}>
                    ✏️ Edit
                </button>
            </div>
        </div>
    );
}
export default ProductCard;
