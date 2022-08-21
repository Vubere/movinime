import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useState } from "react"
import { StateT } from "../../Type"
import { removeItem, selectEntities } from "./watchlistslice"
import { Modal } from "../body/features/MoviePage"


const body = document.querySelector('body') as HTMLBodyElement

const ListItem = ({
  title,
  id,
  overview,
  original_language,
  release_date,
  status,
  poster_path,
}: StateT) => {
  const dispatch = useAppDispatch()

  return (
    <div className="listItemContainer">
      <div className="watchListMovieDetails">
        <div className="img" >
          <img alt={`${title} movie poster`} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
        </div>
        <div className="movieDetails">
          <ul className="movieDetailsList">
            <li className="detailOverview">overview:<br />{overview}</li>
            <li className="releaseStatus">status:<br />{status}</li>
            <li className="releaseDate">Release Date:<br />{release_date}</li>
            <li className="genres">{original_language}</li>
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



export default function Watchlist() {
  const datas = useAppSelector(state => selectEntities(state.watchlist))
  const [modalOpen, setModalOpen] = useState(false)


  let arr = [] as StateT[]
  for (let key in datas) {
    arr.push(datas[key] as StateT)
  }

  console.log(datas)
  return (
    <>
      <div className="watchList">
        <div className="icon" onClick={() => {
          setModalOpen(true)
          body.style.overflow = 'hidden'
        }
        }>Watch List({arr.length})</div>
      </div>
      {
        modalOpen && (
          <Modal>
            <div className="watchListPageContainer">
              <div className="close" onClick={() => {
                setModalOpen(false)
                body.style.overflow = 'auto'
              }}>x</div>
              {arr.map((data: StateT) => <ListItem
                key={data.id} {...data} />
              )}
            </div>
          </Modal>)
      }
    </>
  )
}