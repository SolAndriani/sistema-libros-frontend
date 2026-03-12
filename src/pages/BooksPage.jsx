import React from 'react';
import BooksTable from '../components/BooksTable';

export default function BooksPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '110px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: "'IM Fell English', serif", fontSize: '13px',
            letterSpacing: '4px', color: '#FFD980',
            textTransform: 'uppercase', marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}>
            ✦ &nbsp; Catálogo Personal &nbsp; ✦
          </p>
          <h1 style={{
            fontFamily: "'IM Fell English', serif",
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400,
            color: '#FFF8EE', lineHeight: 1.15, marginBottom: '16px',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}>
            Mi Biblioteca
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--dorado))' }} />
            <span style={{ color: '#FFD980', fontSize: '18px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>❧</span>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, var(--dorado))' }} />
          </div>
        </div>
        <BooksTable />
      </div>
    </div>
  );
}