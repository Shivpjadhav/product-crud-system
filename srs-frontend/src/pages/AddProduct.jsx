import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();
    const [form,setForm] = useState({

    title:"",
    price:"",
    description:"",
    image:null

});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/products", form);
            alert("Product Added");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="add-product-container">
            <Navbar />
            <div className="add-product-form-container">
                <h2>Add Product</h2>
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
    placeholder="Price"
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
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
