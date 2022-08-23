import { useRef, useState } from "react"
import { useAppDispatch } from "../../app/hooks";
//import { selectById, selectEntities } from "./searchSlice";
import { fetchSearchedMovie } from "./search/searchSlice";
import SearchResult from "./search/SearchResult";
import Watchlist from "./Watchlist";

const body = document.querySelector('body') as HTMLBodyElement

export default function Navbar() {
  const dispatch = useAppDispatch()
  const [inputText, setInputText] = useState('')
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
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
        <form action="" className="search" onSubmit={(e)=>e.preventDefault()}>
          <input ref={inputRef} type="text" value={inputText}
          onChange={()=>{
            if(inputRef.current){
              setInputText(inputRef.current.value)
            }
            }} name="search" id="search" placeholder="search" />
          <button className="searchbtn" onClick={(e)=>{
            e.preventDefault()
            dispatch(fetchSearchedMovie({page: 1, search:inputText}))
            setSearchModalOpen(true)
            setInputText('')
            body.style.overflow = "hidden"
          }}></button>
        </form>
      </div>
      <div className="pages" ref={pages}>
        <div aria-label="h1" className="heading" onBlur={()=>{
          if(pages.current!==null)
             pages.current.style.display = 'none'
        }}>MOVIE</div>
        <span className="span"></span>
        <div aria-label="h1"
          className="heading anime">ANIME</div>
      </div>
      <Watchlist/>
      <SearchResult searchModalOpen={searchModalOpen} setSearchModalOpen={setSearchModalOpen}/>
    </header>
  )
}