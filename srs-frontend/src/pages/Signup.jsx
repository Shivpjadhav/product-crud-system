import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import './Register.css';
function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
});
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const checkPasswordStrength = (password) => {
        if (password.length === 0) return "";
        if (password.length < 6) return "weak";
        if (password.length < 10) return "medium";
        return "strong";
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setForm({ ...form, password: newPassword });
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await API.post("/auth/register", form);
            alert("Registered Successfully");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    const getStrengthText = () => {
        switch(passwordStrength) {
            case "weak": return "Weak password";
            case "medium": return "Medium password";
            case "strong": return "Strong password";
            default: return "";
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p className="signup-subtitle">Join us today</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                            type="text"
                            className="signup-input"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input
                            type="email"
                            className="signup-input"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                className="signup-input"
                                placeholder="Password"
                                value={form.password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        {passwordStrength && (
                            <div className={`password-strength ${passwordStrength}`}>
                                {getStrengthText()}
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={`signup-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account' : 'Sign Up'}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign In
                        </Link>
                    </p>
                </div>
                
                <div className="terms-text">
                    By signing up, you agree to our{" "}
                    <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
