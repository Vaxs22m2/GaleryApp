import { useParams, Link } from 'react-router-dom'
import '../imgpage.css'
import img from '../../assets/OBJECTS.png'
import { useEffect, useState } from 'react'

const ImagePage = () => {
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImageById = async () => {
      try {
        const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: 'Client-ID CEDfPAHHf6Fdd9Gb6uFv4SAc72zBH5FWBc3KqJ9yVPc',
          },
        })

        const data = await res.json()

        if (data && data.id) {
          setImage(data)
        } else {
          setError('Изображение не найдено.')
        }
      } catch (err) {
        setError('Ошибка загрузки.')
      } finally {
        setLoading(false)
      }
    }

    fetchImageById()
  }, [id])

  const addToFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    if (!favs.find((fav) => fav.id === image.id)) {
      favs.push(image)
      localStorage.setItem('favorites', JSON.stringify(favs))
      alert('Добавлено в избранное!')
    } else {
      alert('Уже в избранном')
    }
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="image-page-container">
      <header>
        <img className='logo' src={img} alt="Logo" />
     <div className="favorites">
  <Link to="/"><i className="bi bi-search"></i> <span className="text">Поиск</span></Link>
  <Link to="/favorites"><i className="bi bi-heart"></i> <span className="text">Избранное</span></Link>
</div>

      </header>

      <div
        className="image-background"
        style={{ backgroundImage: `url(${image.urls.full})` }}
      >
        <div className="overlay">
          <div className='content'>
            <div className='user-inf'>
              <img
                src={image.user.profile_image.medium}
                alt={image.user.name}
                className="author-avatar"
              />
              <div className='inf'>
                <h3 className="author-name">{image.user.name}</h3>
                <p className="author-username">@{image.user.username}</p>
              </div>
            </div>

            <div className='butns'>
              <button className='favorite' type="button" onClick={addToFavorites}>
                <i className="bi bi-heart"></i>
              </button>
              <button className='download' type="button">
                <i className="bi bi-download"></i> Download
              </button>
            </div>
          </div>

          <div className="author-info">
            <div className="image-wrapper">
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className="main-image"
                style={{ width: '744px', display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
