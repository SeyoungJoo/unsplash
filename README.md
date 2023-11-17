
### Go to the Website 👉 https://unsplash-zeta.vercel.app

### Go to the Website 👉 https://unsplash-zeta.vercel.app

### <span style="color:lightseagreen"> Technical Stack </span>
HTML/CSS
React
JavaScript(ES6+)
Styled-components
Git

### <span style="color:lightseagreen"> Key implementations </span>
Layout for all page
Fetching API with query string when user search
Infinite Scrolling
Navbar and responsive toggle
Accordion button
Slider (auto slider, button slider)


### <span style="color:lightseagreen"> process & result </span>

### unsplash API
1. Fetched image, user, likes from unsplash API
2. Fetched images by search keyword from user
2. Implemented infinite scroll by adding eventListener on scroll with useEffect

#### Main Screen
![](https://images.velog.io/images/syjoo/post/675b8e5d-aeeb-435a-8c8e-a68308d4b429/1.gif)

#### When entering the search keyword
![](https://images.velog.io/images/syjoo/post/30aa5375-903d-4ec3-8c83-19a8e233ae3e/3.gif)


**🔍 Problem and Solution 1 **
* Subtracted -2px from the screen size to load images furthur before a scroll touching the bottom of screen
* Added loding component so that user can aware of when images loading while they scrolling
```javascript

  useEffect(() => {
    const event = window.addEventListener('scroll', ()=> {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        console.log('it worked!')
      }
    })
  }, [])
```

<br/>
<br/>

* Set two condition separately for default photos and photos with a search keyword 

``` javascript

  const fetchImages = async() => {
    setLoading(true)
    let url
    const urlPage = `&page${page}`
    const urlQuery = `&query=${query}`
    
    if(query){
     url = `${searchUrl}${clientID}${urlPage}${urlQuery}` 
    }
    else{
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query){
         return [...oldPhotos, ...data.results]
        } else {
         return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } 
  }
```



### Navbar
![](https://images.velog.io/images/syjoo/post/3577ca3e-f72c-471d-b2ca-e922ecd3efcb/2.gif)
![](https://images.velog.io/images/syjoo/post/365f42ea-76af-4a12-b935-3c6385c6b31d/ezgif.com-gif-maker.gif)

**🔍 Problem and Solution 2 **
Initially I hard-coded navbar toggle button on small screen BUT
```javascript
//navbar.js
 <div className=
   {`${showLinks ? "links-container show-container" : "links-container"}`}>
//css
.show-container {
    height: 10rem;
  }
```
there's a problem that when I added navbar menu then container length got longer and bottom part was cut off.
so I updated dynamically with useRef
```javascript
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(()=>{
    const linksHeight = linksRef.current.getBoundingClientRect().height
    if(showLinks){
      linkesContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  },[showLinks])
```

### accodion Button
![](https://images.velog.io/images/syjoo/post/31799cfd-4c34-4ace-88c9-b40c82d9102a/4.gif)

### Slider
![](https://images.velog.io/images/syjoo/post/b8e5bcf0-ec01-4c31-af86-f688683e5e5f/5.gif)

First of all, I tied 3 article as one with flexbox.
and arranged as middle/left/right slides and show the one in the middle.

```css
.section-center {
  height: 450px;
  max-width: 800px;
  position: relative;
  display: flex;
  overflow: hidden;
}
article {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: var(--transition);
}
article.activeSlide {
  opacity: 1;
  transform: translateX(0);
}
article.lastSlide {
  transform: translateX(-100%);
}
article.nextSlide {
  transform: translateX(100%);
}
```
After that specify the index to each the slide with UseState, 
and when the index matches each person's index, make slide's positon change (the reason I declared the position variable)

```javascript
 const [index, setIndex] = useState(0)
 
 {people.map((person, personIndex)=> {
      const {id, image, name, title, quote} = person;
      let position = 'nextSlide'
      if (personIndex === index) {
         position = 'activeSlide'
      }
      if(personIndex === index - 1 || 
        (index === 0 && personIndex === people.length - 1)) {
        position = 'lastSlide'
      }
      
    return (
      <article className={position} key={id}>
         <img src={image} alt={name} className='person-img'/>
         <h4>{name}</h4>
         <p className='title'>{title}</p>
         <p className="text">{quote}</p>
         <FaQuoteRight className='icon' />
      </article>
    )
}
 
 ```
 
