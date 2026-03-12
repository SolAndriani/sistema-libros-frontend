import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', animation: 'fadeInUp 1s ease both' }}>
        <div style={{
          fontFamily: "'IM Fell English', serif",
          fontSize: '13px', letterSpacing: '5px',
          color: 'var(--oro-viejo)', marginBottom: '20px', textTransform: 'uppercase',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>
          ✦ &nbsp; Bibliotheca Privata &nbsp; ✦
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--oro-viejo))' }} />
          <span style={{ color: 'var(--oro-viejo)', fontSize: '16px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>❧</span>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, var(--oro-viejo))' }} />
        </div>
        <h1 style={{
          fontFamily: "'IM Fell English', serif",
          fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400,
          color: '#FFF8EE', lineHeight: 1.15,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          marginBottom: '8px',
        }}>
          Sistema de Gestión
        </h1>
        <h2 style={{
          fontFamily: "'IM Fell English', serif",
          fontStyle: 'italic', fontSize: 'clamp(22px, 4vw, 44px)',
          fontWeight: 400, color: 'var(--oro-viejo)',
          marginBottom: '32px', letterSpacing: '2px',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}>
          de Libros
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginBottom: '36px' }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--oro-viejo))' }} />
          <span style={{ color: 'var(--oro-viejo)', fontSize: '16px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>❧</span>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, var(--oro-viejo))' }} />
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 2.2vw, 20px)',
          color: 'rgba(242,234,216,0.82)', lineHeight: 1.8,
          marginBottom: '48px', fontStyle: 'italic',
          textShadow: '0 1px 8px rgba(0,0,0,0.7)',
        }}>
          Organizá, catalogá y preservá tu colección personal<br />
          con el cuidado que cada volumen merece.
        </p>
        <button className="btn-primary"
          onClick={() => navigate(isAuthenticated ? '/books' : '/login')}
          style={{ fontSize: '13px', padding: '14px 40px', letterSpacing: '3px', boxShadow: '0 8px 32px rgba(92,51,23,0.5)' }}>
          {isAuthenticated ? 'Ingresar a mi biblioteca' : 'Acceder'}
        </button>
        <p style={{
          marginTop: '28px', fontFamily: "'Cormorant SC', serif",
          fontSize: '11px', letterSpacing: '2px',
          color: 'rgba(200,151,58,0.55)', textTransform: 'uppercase',
        }}>
          Est. MMXXV
        </p>
      </div>
    </div>
  );
}