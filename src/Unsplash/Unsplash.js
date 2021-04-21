import React, { useState, useEffect, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function Unsplash() {
  const [loadNextPage, setLoadNextPage] = useState(false);
  const [loadNewQuery, setLoadNewQuery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const apiResponses = useMemo(() => { return {} }, [])

  const fetchImages = async() => {
    if(loading) {
      return
    }

    setLoading(true)

    let url
    let newPage = page
    if(loadNextPage) {
      newPage = page + 1
    }
    else if(loadNewQuery) {
      newPage = 1
    }

    setPage(newPage)
    const urlPage = `&page=${newPage}`

    console.debug(`fetchImages page:${newPage}, query:${query}`)
    
    if(query){
      const urlQuery = `&query=${query}`
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}` 
    }
    else{
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      let newPhotos = apiResponses[url];
      if(!newPhotos) {
        const response = await fetch(url)
        const data = await response.json()
        newPhotos = query ? data.results : data
        apiResponses[url] = newPhotos
      }
      
      setLoadNextPage(false);
      setLoadNewQuery(false);
      setLastQuery(query);

      setPhotos((oldPhotos) => {
        const needAppend = newPage > 1         
        if(needAppend) {
          return [...oldPhotos, ...newPhotos]
        } else {
          return newPhotos
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setLoadNextPage(false);
      setLoadNewQuery(false);
      console.error(error)
    } 
  }

  //페이지 value가 바뀔때마다 fetchImage를 re-trigger 하기위한 useEffect
  useEffect(() => {
    if(loadNextPage || loadNewQuery || Object.keys(apiResponses).length == 0) {
      fetchImages()
    }
  },[loadNextPage, loadNewQuery]);


  // infinite-scroll을 위한 useEffect
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >= 
        document.body.scrollHeight - 2
      ) {
        if(!loadNextPage) {
          setLoadNextPage(true)
        }
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(lastQuery === query) {
      return
    }
    setLoadNewQuery(true)    
  }

  return (
    <main>
      <section className='search'>
        <form className="search-form">
          <input
            type="text"
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e)=> setQuery(e.target.value)}/>
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
      </section>
    </main>
  )
}

export default Unsplash
