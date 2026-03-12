import React, { useState } from 'react';

export default function AddBookModal({ isOpen, onClose, onAdd, isLoading }) {
  const [nombre, setNombre]           = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError]             = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (!nombre.trim())      { setError('El título del libro es requerido.'); return; }
    if (!descripcion.trim()) { setError('La descripción es requerida.'); return; }
    try { await onAdd(nombre, descripcion); setNombre(''); setDescripcion(''); }
    catch (err) { setError(err.message || 'Error al agregar el libro.'); }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '11px', letterSpacing: '3px', color: 'var(--caramel)', textTransform: 'uppercase', marginBottom: '8px' }}>
          ✦ &nbsp; Nuevo registro &nbsp; ✦
        </p>
        <h2 className="modal-title">Agregar Libro</h2>
        <div style={{ height: '1px', background: 'linear-gradient(to right, var(--dorado), transparent)', marginBottom: '24px' }} />
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label className="field-label">Nombre</label>
            <input type="text" className="field-input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del libro" disabled={isLoading} />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label className="field-label">Descripción</label>
            <textarea className="field-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del libro..." disabled={isLoading} rows={3} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" disabled={isLoading} style={{ flex: 1 }}>
              {isLoading ? 'Agregando...' : 'Agregar'}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isLoading} style={{ flex: 1 }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}