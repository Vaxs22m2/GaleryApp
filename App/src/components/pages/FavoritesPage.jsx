import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import img from '../../assets/OBJECTS.png'
import '../FavoritesPage.css'

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(favs)
  }, [])

  if (favorites.length === 0) return (
    <div style={{ padding: '20px' }}>

      <h2>Избранное пусто</h2>
    </div>
  )

  return (
    <div>
      <header>
        <img className='logo' src={img} alt="Logo" />
           <div className="favorites">
  <Link to="/"><i className="bi bi-search"></i> <span className="text">Поиск</span></Link>
  <Link to="/favorites"><i className="bi bi-heart"></i> <span className="text">Избранное</span></Link>
</div>
      </header>

      <h2 style={{ textAlign: 'center' }}>Избранное</h2>

      
      <div className="image-results">
        {favorites.map((img) => (
          <Link key={img.id} to={`/image/${img.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

            <div className="image-card">
              <img
                src={img.urls.small}
                alt={img.alt_description || 'Favorite'}
              />
              <p style={{ padding: '10px', margin: 0, color: '#333', fontWeight: 'bold' }}>
                {img.user.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
