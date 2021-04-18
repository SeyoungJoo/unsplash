### <span style="color:lightseagreen"> 기술스텍 </span>
HTML/CSS
React
JavaScript(ES6+)
Styled-components
Git

### <span style="color:lightseagreen"> 주요구현사항 </span>
모든 페이지의 레이아웃 구현
Query string을 이용해서 API를 가져오는 기능 구현
무한스크롤로 이미지를 받아오는 기능을 구현
Navbar와 반응형 토글 구현
Accordion 버튼 구현
Slider 구현 (자동넘김, 버튼넘김)


### <span style="color:lightseagreen"> 과정설명 & 결과화면 </span>

### unsplash API
1. unsplash 사이트에서 API를 가져온 후 image, user, likes 데이터를 fetch 해주었다.
2. Query string을 이용하여 검색어에 따른 이미지를 fetch하였다.
2. 무한스크롤 기능은 useEffect로 scroll에 eventListener을 더해 구현하였다.

#### 기본 메인화면
![](https://images.velog.io/images/syjoo/post/675b8e5d-aeeb-435a-8c8e-a68308d4b429/1.gif)

#### 검색어 입력시
![](https://images.velog.io/images/syjoo/post/30aa5375-903d-4ec3-8c83-19a8e233ae3e/3.gif)


**🔍 부딪혔던 문제와 해결사항 **
* 화면에 닿기 약간 전에 이미지를 더 로딩해주기 위해 화면 크기에서 2px을 빼주었다.
* loding component를 따로 만들어주어 고객이 스크롤을 내리면서 이미지가 fetch 되기를 기다리는 동안에 알수있게 해주었기 때문에 loading이 끝나고만 이미지를 fetch하기 위하여 ternary operator로 조건을 넣어주었다.
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

* 기본으로 로딩되는 디폴트 사진들이 있고, 검색어를 입력했을때 query에 따라 나와야하는 사진들이 있었기에 두가지의 조건을 따로 주.

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

**🔍 부딪혔던 문제와 해결사항 **
화면이 작아지면 토클버튼을 클릭했을때 navbar 리스트가 나오도록 설정하였는데 처음에는 이렇게 hard-coding을 했으나
```javascript
//navbar.js
 <div className=
   {`${showLinks ? "links-container show-container" : "links-container"}`}>
//css
.show-container {
    height: 10rem;
  }
```
이랬더니 화면이 좁아졌을때 나브바 토클버튼을 클릭하면 세로로 나오는 상황에서,  나브바 메뉴를 더 추가하면 컨테이너의 길이가 10rem이기때문에 그 밑은 잘려서 보이지 않는 문제가 생겼다. 그래서 useRef를 이용해서 다이나믹하게 바꿔주었다.
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

### accodion 버튼
![](https://images.velog.io/images/syjoo/post/31799cfd-4c34-4ace-88c9-b40c82d9102a/4.gif)

### 슬라이드
![](https://images.velog.io/images/syjoo/post/b8e5bcf0-ec01-4c31-af86-f688683e5e5f/5.gif)

우선 CSS로 세가지 article을 하나로 묶어 flexbox로 지정해놓고,
가운데슬라이드/왼쪽/오른쪽 슬라이드 3개로 배열해서 가운데에 있는것만 보이게 해주었다.

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

그 후 useState를 사용하여 index를 지정해주고
이 인덱스가 각각의 사람들의 index와 매치가 되면 slide의 position을 바꿔주는 코드를 작성했다. (그래서 let을 사용하여 position의 변수를 선언했다)
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
 그 후에 오른쪽 왼쪽으로 넘기는 버튼을 이용할때 왼쪽으로 넘기는 버튼을 클릭하면 index - 1 이되기때문에 제대로 넘어가지않는 문제가 발생하여 useEffect를 사용하여 조건을 넣어주었다.
 ```javascript
 const [people, setPeople] = useState(data)
 const [index, setIndex] = useState(0)

 useEffect(()=> {
   const lastIndex = people.length - 1;
   if(index < 0){
     setIndex(lastIndex);
   }
   if (index > lastIndex){
     setIndex(0);
 }, [index, people])

return (
    <button className='prev' onClick={()=> setIndex(index - 1)}>
       <FiChevronLeft/>
    </button>
    <button className='next' onClick={()=> setIndex(index + 1)}>
       <FiChevronRight/>
    </button>
)


```
