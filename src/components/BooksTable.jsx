import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function BooksTable() {
  const [books, setBooks]             = useState([]);
  const [totalBooks, setTotalBooks]   = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [addModalOpen, setAddModalOpen]       = useState(false);
  const [editModalOpen, setEditModalOpen]     = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook]       = useState(null);
  const [modalLoading, setModalLoading]       = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => { fetchBooks(); }, [currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true); setError('');
      const skip = currentPage * ITEMS_PER_PAGE;
      const [booksRes, countRes] = await Promise.all([
        booksAPI.getBooks(skip, ITEMS_PER_PAGE),
        booksAPI.countBooks(),
      ]);
      setBooks(booksRes.data);
      setTotalBooks(countRes.data.total);
    } catch (err) {
      setError('Error al cargar los libros: ' + err.message);
    } finally { setLoading(false); }
  };

  const handleAddBook = async (nombre, descripcion) => {
    try {
      setModalLoading(true);
      await booksAPI.createBook(nombre, descripcion);
      setAddModalOpen(false); setCurrentPage(0); await fetchBooks();
    } catch (err) {
      throw new Error(err.response?.data?.detail || 'Error al agregar.');
    } finally { setModalLoading(false); }
  };

  const handleEditBook = async (bookId, nombre, descripcion) => {
    try {
      setModalLoading(true);
      await booksAPI.updateBook(bookId, nombre, descripcion);
      setEditModalOpen(false); setSelectedBook(null); await fetchBooks();
    } catch (err) {
      throw new Error(err.response?.data?.detail || 'Error al actualizar.');
    } finally { setModalLoading(false); }
  };

  const handleDeleteBook = async () => {
    try {
      setModalLoading(true);
      await booksAPI.deleteBook(selectedBook.id);
      setDeleteModalOpen(false); setSelectedBook(null); await fetchBooks();
    } catch (err) {
      setError('Error al eliminar: ' + err.message);
    } finally { setModalLoading(false); }
  };

  const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
      {error && <div className="error-banner" style={{ marginBottom: '20px' }}>{error}</div>}

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '20px',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: '18px',
          color: '#FFF8EE',
          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          fontWeight: 500,
        }}>
          {loading
            ? 'Consultando el catálogo...'
            : `${totalBooks} ${totalBooks === 1 ? 'volumen registrado' : 'volúmenes registrados'}`}
        </p>
        <button className="btn-primary" onClick={() => setAddModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '11px 28px' }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>＋</span>
          Agregar Libro
        </button>
      </div>

      <div style={{
        borderRadius: 'var(--radio)',
        overflow: 'hidden',
        border: '1px solid rgba(200,151,58,0.35)',
        borderTop: '2px solid var(--dorado)',
        boxShadow: '0 8px 40px rgba(18,10,5,0.5)',
      }}>
        <table className="books-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Nombre</th>
              <th>Descripción</th>
              <th style={{ width: '180px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{
                  textAlign: 'center', padding: '56px',
                  fontStyle: 'italic', color: 'var(--caramel)',
                  background: 'rgba(250,246,238,0.92)',
                }}>
                  Consultando el catálogo...
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan="3" style={{
                  textAlign: 'center', padding: '70px 20px',
                  background: 'rgba(250,246,238,0.92)',
                }}>
                  <p style={{
                    fontFamily: "'IM Fell English', serif",
                    fontSize: '22px', color: 'var(--sienna)', marginBottom: '10px',
                  }}>
                    El estante está vacío
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic', fontSize: '17px', color: 'var(--caramel)',
                  }}>
                    Agregá tu primer libro para comenzar la colección.
                  </p>
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.nombre}</td>
                  <td style={{
                    fontStyle: book.descripcion ? 'normal' : 'italic',
                    color: book.descripcion ? 'var(--mahogany)' : 'var(--caramel)',
                    fontWeight: 300,
                  }}>
                    {book.descripcion || 'Sin descripción'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="btn-secondary"
                        style={{ padding: '6px 16px', fontSize: '12px', letterSpacing: '1.5px' }}
                        onClick={() => { setSelectedBook(book); setEditModalOpen(true); }}>
                        Editar
                      </button>
                      <button className="btn-danger"
                        style={{ padding: '6px 16px', fontSize: '12px', letterSpacing: '1.5px' }}
                        onClick={() => { setSelectedBook(book); setDeleteModalOpen(true); }}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{
          marginTop: '28px', display: 'flex',
          justifyContent: 'center', gap: '8px', flexWrap: 'wrap',
        }}>
          <button className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}>
            ← Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i}
              className={`pagination-btn${currentPage === i ? ' active' : ''}`}
              onClick={() => setCurrentPage(i)}>
              {i + 1}
            </button>
          ))}
          <button className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}>
            Siguiente →
          </button>
        </div>
      )}

      <AddBookModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddBook} isLoading={modalLoading} />
      <EditBookModal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setSelectedBook(null); }} onUpdate={handleEditBook} book={selectedBook} isLoading={modalLoading} />
      <DeleteConfirmationModal isOpen={deleteModalOpen} onClose={() => { setDeleteModalOpen(false); setSelectedBook(null); }} onConfirm={handleDeleteBook} bookName={selectedBook?.nombre} isLoading={modalLoading} />
    </div>
  );
}