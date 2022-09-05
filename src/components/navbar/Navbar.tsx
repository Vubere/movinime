import { useRef, useState } from "react"
import { useAppDispatch, useAppSelector, } from "../../app/hooks";
//import { selectById, selectEntities } from "./searchSlice";
import { fetchSearch, fetchSearchedMovie } from "./search/searchSlice";

import SearchResult from "./search/SearchResult";
import Watchlist from "./Watchlist";
import { toggleState } from "../../appSlice";


export default function Navbar() {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state=>state.appState)
  const [inputText, setInputText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const pages = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

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
            appState.page==='movie'?
            dispatch(fetchSearchedMovie({page: 1, search:inputText})):
            dispatch(fetchSearch(inputText))
            setModalOpen(true)
            setInputText('')
          }}></button>
        </form>
      </div>
      <div className="pages" ref={pages} onBlur={() => {
        if (pages.current !== null)
          pages.current.style.display = 'none'
      }}>
        <div aria-label="h1" className="heading" 
        onClick={()=>{
          dispatch(toggleState('movie'))
        }}>MOVIE</div>
        <span className="span"></span>
        <div aria-label="h1"
          className="heading anime"
          onClick={()=>{
            dispatch(toggleState('anime'))
          }}>ANIME</div>
      </div>
      <Watchlist/>
      <SearchResult modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </header>
  )
}