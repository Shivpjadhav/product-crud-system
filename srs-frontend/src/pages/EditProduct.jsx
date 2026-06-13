import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import './EditProduct.css';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        price=''
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);
            setForm(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/products/${id}`, form);
            alert("Product Updated");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="edit-product-container">
            <Navbar />
            <div className="edit-product-form-container">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value
                            })
                        }
                    />
                    <input
    type="number"
    value={form.price}
    onChange={(e)=>
        setForm({
            ...form,
            price:e.target.value
        })
    }
/>
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                image: e.target.value
                            })
                        }
                    />
                    <button type="submit">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
