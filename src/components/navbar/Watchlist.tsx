import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { memo, useEffect, useState } from "react"
import { StateT } from "../../app/Type"
import { addItem, addLsKeys, removeItem, selectEntities, complete } from "./watchlistslice"



const ListItem = ({
  details,
  id,
  watched
}: { details: StateT, id: number, watched: boolean }) => {
  const dispatch = useAppDispatch()

  const { title,
    overview,
    original_language,
    release_date,
    status,
    poster_path,
    vote_average,
    typeOfData } = details

  let url = typeOfData === 'movie' ? `https://image.tmdb.org/t/p/w300${poster_path}` :
    poster_path;



  return (
    <div className={`listItemContainer ${watched ? 'watched' : ''}`}>
      {watched?<div className='watchedPopup'>WATCHED</div>:''}
      <div className="watchListMovieDetails">
        <div className="img" >
          <img alt={`${title} movie poster`} src={url} />
        </div>
        <div className="movieDetails">
          <ul className="movieDetailsList">
            <li className="title">
              {title}</li>
            <li className="detailOverview">{overview}</li>
            <li className="releaseStatus">status:<br />{status ? status : 'N/A'}</li>
            <li className="releaseDate">Release Date:<br />{release_date ? release_date : 'N/A'}</li>
            <li className="lang">Language:<br />{original_language ? original_language : 'N/A'} </li>
            <li className="rating">rating:<br />{vote_average ? `${Math.round(vote_average * 10)}%` : 'N/A'} </li>
          </ul>
        </div>
      </div>
      <div className="completion">
        <span className="remove" style={{
          border: '1px solid #fff7',
          borderRadius: '3px',
          padding: '2px',
          margin: '5px'
        }} onClick={() => {
          dispatch(removeItem(id))
        }}>remove</span>
        <span className="complete" style={{
          border: '1px solid #fff7',
          borderRadius: '3px',
          padding: '2px',
          margin: '5px'
        }} onClick={() => {
          dispatch(complete({ details, watched: !watched, id: id}))
        }}>complete</span>
      </div>
    </div>
  )
}



export default memo(function Watchlist() {
  const datas = useAppSelector(state => selectEntities(state.watchlist))
  const dispatch = useAppDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  let arr: any[] = []

  useEffect(() => {
    if (localStorage.getItem('keys')) {
      let keys = JSON.parse(localStorage.getItem('keys') as string)
      let temp
      for (let key in keys) {
        temp = JSON.parse(localStorage.getItem(`${keys[key]}`) as string)
        arr.push(temp)
        dispatch(addLsKeys(temp.id))
        dispatch(addItem(temp))
      }
    }
  }, [dispatch])

  for (let key in datas) {
    arr.push(datas[key] as any)
  }
  return (
    <>
      <div className="watchList">
        <div className="icon" onClick={() => {
          setModalOpen(true)
        }
        }>Watch List({arr.length})</div>
      </div>
      {
        modalOpen && (
          <>
            <div className="watchListPageContainer">
              <div className="close" onClick={() => {
                setModalOpen(false)
              }}>x</div>
              {arr.length === 0 ?
                <div className="empty">
                  Nothing here...
                </div>
                : arr.map((data) => <ListItem
                  key={data.id} {...data} />
                )}
            </div>
          </>)
      }
    </>
  )
})