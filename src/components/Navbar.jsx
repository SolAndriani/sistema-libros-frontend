import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const isOverlay = ["/", "/login", "/register"].includes(location.pathname);
  const handleLogout = () => { logout(); navigate("/"); };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isOverlay) return null;

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 9999,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: scrolled ? "10px 48px" : "16px 48px",
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(26,15,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,151,58,0.25)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(18,10,5,0.5)" : "none",
    }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

        <button
          onClick={() => navigate("/books")}
          className="btn-primary"
          style={{
            fontSize: "12px", padding: "8px 22px",
            background: location.pathname === "/books"
              ? "linear-gradient(135deg, var(--dorado), var(--oro-viejo))"
              : undefined,
            color: location.pathname === "/books" ? "var(--mahogany)" : undefined,
            boxShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          Mis Libros
        </button>

        <button
          onClick={handleLogout}
          className="btn-danger"
          style={{
            fontSize: "12px", padding: "8px 22px",
            boxShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          Desconectar
        </button>

      </div>
    </nav>
  );
}