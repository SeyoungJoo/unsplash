import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(()=>{
    const linksHeight = linksRef.current.getBoundingClientRect().height
    if(showLinks){
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  },[showLinks])

  return (
    <NavContainer>
      <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to ='/'>
            <img src={logo} alt="logo"/>
          </Link>
          <button className='nav-toggle' onClick={()=> {
            setShowLinks(!showLinks)
          }}>
            <FaBars/>
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
           {links.map((link)=> {
             const {id, url, text} = link
             return (
             <li key={id}>
               <Link to={url}>{text}</Link>
             </li>)
           })}
          </ul>
        </div>
      </div>
      </nav>
    </NavContainer>
  )
}


const NavContainer = styled.nav`
:root {
  --transition: all 0.3s linear;
}
  nav {
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .nav-toggle {
    font-size: 1.5rem;
    color: hsl(205, 78%, 60%);
    background: transparent;
    border-color: transparent;
    transition:  var(--transition);
    cursor: pointer;
  }
  .nav-toggle:hover {
    color: hsl(205, 86%, 17%);
    transform: rotate(90deg);
  }
  .logo {
    height: 40px;
  }
  .links a {
    color: hsl(209, 34%, 30%);
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing:  0.1rem;
    display: block;
    padding: 0.5rem 1rem;
    transition: var(--transition);
  }
  .links a:hover {
    background: hsl(205, 86%, 81%);
    color:  hsl(205, 78%, 60%);
    padding-left: 1.5rem;
  }
  .links-container {
    height: 0;
    overflow: hidden;
    transition: var(--transition);
  }
  .show-container {
    height: 10rem;
  }
  @media screen and (min-width: 800px) {
    .nav-center {
      max-width: 1170px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
    }
    .nav-header {
      padding: 0;
    }
    .nav-toggle {
      display: none;
    }
    .links-container {
      height: auto !important;
    }
    .links {
      display: flex;
    }
    .links a {
      padding: 0;
      margin: 0 0.5rem;
    }
    .links a:hover {
      padding: 0;
      background: transparent;
    }
  }
`


export default Navbar