import React, { useState, useEffect } from 'react';

export default function EditBookModal({ isOpen, onClose, onUpdate, book, isLoading }) {
  const [nombre, setNombre]           = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError]             = useState('');

  useEffect(() => {
    if (book) { setNombre(book.nombre || ''); setDescripcion(book.descripcion || ''); setError(''); }
  }, [book, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (!nombre.trim())      { setError('El título es requerido.'); return; }
    if (!descripcion.trim()) { setError('La descripción es requerida.'); return; }
    try { await onUpdate(book.id, nombre, descripcion); onClose(); }
    catch (err) { setError(err.message || 'Error al actualizar.'); }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '11px', letterSpacing: '3px', color: 'var(--caramel)', textTransform: 'uppercase', marginBottom: '8px' }}>
          ✦ &nbsp; Modificar registro &nbsp; ✦
        </p>
        <h2 className="modal-title">Editar Volumen</h2>
        <div style={{ height: '1px', background: 'linear-gradient(to right, var(--dorado), transparent)', marginBottom: '24px' }} />
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label className="field-label">Título de la obra</label>
            <input type="text" className="field-input" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={isLoading} />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label className="field-label">Descripción</label>
            <textarea className="field-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={isLoading} rows={3} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" disabled={isLoading} style={{ flex: 1 }}>
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
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