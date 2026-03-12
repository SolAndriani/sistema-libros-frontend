import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import biblioteca from "../assets/biblioteca.jpg";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLocalError("");
    if (!email.trim()) { setLocalError("El correo es requerido."); return; }
    if (!validateEmail(email)) { setLocalError("Ingresá un correo válido."); return; }
    if (!password.trim()) { setLocalError("La contraseña es requerida."); return; }
    const success = await login(email, password);
    if (success) navigate("/books");
  };

  return (
    <div style={{ backgroundImage: `url(${biblioteca})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(18,10,5,0.6) 0%, rgba(30,16,8,0.82) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, background: "var(--crema)", borderRadius: "var(--radio)", boxShadow: "var(--sombra-profunda), 0 0 0 1px rgba(200,151,58,0.2)", padding: "48px 44px", width: "100%", maxWidth: "420px", animation: "scaleIn 0.3s ease both", borderTop: "3px solid var(--dorado)" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "13px", letterSpacing: "4px", color: "var(--caramel)", textTransform: "uppercase", marginBottom: "14px" }}>
            ✦ &nbsp; Acceso Privado &nbsp; ✦
          </div>
          <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: "32px", fontWeight: 400, color: "var(--mahogany)", marginBottom: "8px" }}>Bienvenido</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", color: "var(--caramel)" }}>Ingresá a tu biblioteca personal</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <div style={{ height: "1px", width: "50px", background: "linear-gradient(to right, transparent, var(--humo))" }} />
            <span style={{ color: "var(--oro-viejo)", fontSize: "12px" }}>❧</span>
            <div style={{ height: "1px", width: "50px", background: "linear-gradient(to left, transparent, var(--humo))" }} />
          </div>
        </div>
        {(localError || error) && <div className="error-banner">{localError || error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label className="field-label">Correo electrónico</label>
            <input type="email" className="field-input" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div style={{ marginBottom: "32px" }}>
            <label className="field-label">Contraseña</label>
            <input type="password" className="field-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", fontSize: "13px", padding: "13px", letterSpacing: "3px" }}>
            {loading ? "Verificando..." : "Ingresar al sistema"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "24px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", color: "var(--caramel)" }}>
          ¿No tenés cuenta?{" "}
          <Link to="/register" style={{ color: "var(--sienna)", fontStyle: "normal", fontWeight: 600, textDecoration: "underline" }}>Registrate aquí</Link>
        </p>
      </div>
    </div>
  );
}