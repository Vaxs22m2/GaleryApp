
import './App.css'
import img from './assets/OBJECTS.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchImages = async (searchTerm, limit = null) => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&per_page=${limit || 30}&query=${searchTerm}`,
        {
          headers: {
            Authorization: 'Client-ID CEDfPAHHf6Fdd9Gb6uFv4SAc72zBH5FWBc3KqJ9yVPc',
          },
        }
      )
      const data = await response.json()

      if (data.results && data.results.length > 0) {
        setImages(limit ? data.results.slice(0, limit) : data.results)
        setError('')
      } else {
        setImages([])
        setError('Изображение не найдено!')
      }
    } catch (err) {
      console.error('Ошибка загрузки:', err)
      setError('Ошибка при загрузке данных')
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages('mona lisa', 8)
  }, [])

  const handleSearch = () => {
    if (!query.trim()) return
    fetchImages(query)
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src={img} alt="Logo" />
        </div>
        <div className="favorites">
      <Link to="/favorites"><i className="bi bi-heart"></i> Избранное</Link>
        </div>
      </header>

      <div className="search-Mainsection">
        <div className="search-section">
          <div className="search-container">
            <input
              type="search"
              placeholder="Поиск"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <i className="bi bi-search" onClick={handleSearch} style={{ cursor: 'pointer' }}></i>
          </div>
        </div>
      </div>

      <div className="image-results">
        {loading && <p>Загрузка...</p>}

        {!loading && error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {!loading && !error && images.length > 0 && (
          images.map((img) => (
            <div key={img.id} className="image-card">
              <Link to={`/image/${img.id}`}>
                <img src={img.urls.small} alt={img.alt_description || 'Изображение'} />
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
