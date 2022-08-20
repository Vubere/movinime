import { useRef } from "react"


export default function Navbar() {
  const pages = useRef<HTMLDivElement>(null)
  return (
    <header>
      <div className="top">
        <div className="left">
          <span className="hamburger" onClick={()=>{
            if(pages.current!==null){
                pages.current.style.display =
                  pages.current.style.display === 'flex'?'none':'flex';
            }
          }}>
            <div></div>
            <div></div>
            <div></div>
          </span>
          <div className="logo">MoviNime</div>
        </div>
        <input type="text" name="search" id="search" placeholder="search" />
      </div>
      <div className="pages" ref={pages}>
        <div aria-label="h1" className="heading">MOVIE</div>
        <span className="span"></span>
        <div aria-label="h1"
          className="heading anime">ANIME</div>
      </div>
    </header>
  )
}