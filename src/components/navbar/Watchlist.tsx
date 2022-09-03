import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { memo, useState} from "react"
import { StateT } from "../../Type"
import { removeItem, selectEntities } from "./watchlistslice"



const ListItem = ({
  title,
  id,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
  vote_average
}: StateT) => {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.appState.page)

  let url = appState === 'movie' ? `https://image.tmdb.org/t/p/w300${poster_path}` :
    poster_path;



  return (
    <div className="listItemContainer">
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
            <li className="releaseDate">Release Date:<br />{release_date}</li>
            <li className="lang">Language:<br />{original_language ? original_language : 'N/A'} </li>
            <li className="rating">rating:<br />{vote_average ? `${Math.round(vote_average * 10)}%` : 'N/A'} </li>
          </ul>
        </div>
      </div>
      <div className="completion">
        <span className="remove" onClick={() => {
          dispatch(removeItem(id))
        }}>remove</span>
        <span className="complete" onClick={() => {
          dispatch(removeItem(id))
        }}>watched</span>
      </div>
    </div>
  )
}



export default memo(function Watchlist() {
  const datas = useAppSelector(state => selectEntities(state.watchlist))
 // const dispatch = useAppDispatch()
  const [modalOpen, setModalOpen] = useState(false)


  let arr = [] as StateT[]
  for (let key in datas) {
    arr.push(datas[key] as StateT)
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
              {arr.length===0?
              <div className="empty">
                Nothing here...
              </div>
              :arr.map((data: StateT) => <ListItem
                key={data.id} {...data} />
              )}
            </div>
          </>)
      }
    </>
  )
})