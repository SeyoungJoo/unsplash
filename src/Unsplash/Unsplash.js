import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function Unsplash() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);  

  const fetchImages = async() => {
    setLoading(true)
    const urlPage = `&page${page}`
    let url = `${mainUrl}${clientID}${urlPage}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data]
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } 
  }

  useEffect(() => {
    fetchImages()
  },[page]) //re-fetchImage when page's value changed

  useEffect(() => {
    const event = window.addEventListener('scroll', ()=> {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage)=>{
          return oldPage + 1
        })
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <section className='search'>
        <form className="search-from">
          <input type="text" placeholder='search' className='form-input' />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
      <div className='photos-center'>
        {photos.map((photo)=> {
         return <Photo key={photo.id} {...photo}/>
        })}
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
      {/* if loading is true, display <h2> */}
      </section>
    </main>
  )
}

export default Unsplash
