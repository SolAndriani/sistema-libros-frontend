import React from 'react';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, bookName, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>

        <h2 className="modal-title" style={{ color: '#6B1A1A' }}>
          Eliminar volumen
        </h2>

        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, #C44, transparent)',
            marginBottom: '24px'
          }}
        />

        <p
          style={{
            fontFamily: "'IM Fell English', serif",
            fontStyle: 'italic',
            fontSize: '19px',
            color: 'var(--sienna)',
            marginBottom: '24px'
          }}
        >
          "{bookName}"
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
            style={{ flex: 1 }}
          >
            {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
          </button>

          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={isLoading}
            style={{ flex: 1 }}
          >
            Conservar
          </button>
        </div>

      </div>
    </div>
  );
}