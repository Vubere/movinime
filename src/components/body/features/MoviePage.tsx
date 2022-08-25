import { memo } from "react"
import { useAppDispatch} from "../../../app/hooks"
import { openMoviePageModal } from "../../../modals/modalManager"
import SimilarMovies from "./SimilarMovies"
import { addItem } from "../../navbar/watchlistslice"




export default memo(function MoviePage({ movieData }: any) {
  const dispatch = useAppDispatch()

  const {
    title,
    overview,
    original_language,
    release_date,
    status,
    poster_path,
    id,
    popularity,
    width
  } = movieData
  
  return (
    <>
      <div className="moviePage">
        <div className="container">
          <div className="close" onClick={() => {
            dispatch(openMoviePageModal(false))
          }}>x</div>
          <div className="movieDetails">
            <div className="img" >
              <img alt={`${title} movie poster`} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
              <div className="addToWL" style={{
                cursor: 'pointer'
              }}
               onClick={() => {
                console.log('h')
                dispatch(addItem({
                  title,
                  id,
                  overview,
                  original_language,
                  release_date,
                  status,
                  poster_path,
                  popularity,
                  width
                }))
              }}>
                add to watch list
              </div>
            </div>
            <div className="details">
              <ul className="detailsList">
                <li className="title">title:<br />{title}</li>
                <li className="overview">overview:<br />{overview}</li>
                <li className="releaseStatus">status:<br />{status ? status : 'N/A'}</li>
                <li className="releaseDate">Release Date:<br />{release_date}</li>
                <li className="lang">Language:<br />{original_language ? original_language : 'N/A'} </li>
              </ul>
            </div>
            <div className="movieCast"></div>
          </div>
          <SimilarMovies title={title} movieId={id} />
        </div>
      </div>
    </>
  )
})