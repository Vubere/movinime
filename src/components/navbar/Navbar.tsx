import { useRef } from "react"
import Watchlist from "./Watchlist";


export default function Navbar() {
  const pages = useRef<HTMLDivElement>(null)
  return (
    <header>
      <div className="top">
        <div className="left">
          <span className="hamburger" onClick={(e) => {
            e.preventDefault()
            if (pages.current !== null) {
              pages.current.style.display =
                pages.current.style.display === 'flex' ? 'none' : 'flex';
            }
          }}>
            <div></div>
            <div></div>
            <div></div>
          </span>
          <div className="logo">MoviNime</div>
        </div>
        <form action="" className="search">
          <input type="text" name="search" id="search" placeholder="search" />
          <button className="searchbtn"></button>
        </form>
      </div>
      <div className="pages" ref={pages}>
        <div aria-label="h1" className="heading" onBlur={()=>{
          
        }}>MOVIE</div>
        <span className="span"></span>
        <div aria-label="h1"
          className="heading anime">ANIME</div>
      </div>
      <Watchlist/>
    </header>
  )
}