import { memo} from "react"
import { useAppDispatch, useAppSelector} from "../../../app/hooks"
import SimilarMovies from "./SimilarMovies"
import { addItem } from "../../navbar/watchlistslice"
import { StateT } from "../../../Type"
import { back, moviePage, reset } from "./popupPageSlice"





export default memo(function MoviePage({ setInnerModalCheck }: any) {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.appState.page)
  const moviePageDataArray = useAppSelector(state=>state.pageState.moviePage.history)

  //const [set. setSet] = useState({})
  const {
    title,
    overview,
    original_language,
    release_date,
    status,
    poster_path,
    id,
    popularity,
    vote_average
  }:StateT = moviePageDataArray[moviePageDataArray.length-1]

  let url = appState === 'movie' ? `https://image.tmdb.org/t/p/w300${poster_path}` :
    poster_path;
  
  return (
    <>
      <div className="moviePage">
        <div className="container">
          <div className="back" onClick={()=>{
            if(moviePageDataArray.length===1){              
              dispatch(moviePage({open:false}))
            }
            dispatch(back())
          }}>{'<<'}</div>
          <div className="close" onClick={() => {
            dispatch(moviePage({open:false}))
            dispatch(reset())
          }}>x</div>
          <div className="movieDetails">
            <div className="img" >
              <div className="addToWL" 
               onClick={() => {
                dispatch(addItem({
                  title,
                  id,
                  overview,
                  original_language,
                  release_date,
                  status,
                  poster_path,
                  popularity,
                  vote_average
                }))
              }}>
                +
              </div>
              <img alt={ `${title} poster`} src={url}/>
            </div>
            <div className="details">
              <ul className="detailsList">
                <li className="title">{title}</li>
                <li className="overview">{overview}</li>
                <li className="releaseStatus">status:<br />{status ? status : 'N/A'}</li>
                <li className="releaseDate">Release Date:<br />{release_date}</li>
                <li className="lang">Language:<br />{original_language ? original_language : 'N/A'} </li>
                <li className="rating">rating:<br />{vote_average ? `${Math.round(vote_average*10)}%` : 'N/A'} </li>
              </ul>
            </div>
            <div className="movieCast"></div>
          <SimilarMovies title={title} movieId={id} />
          </div>
        </div>
      </div>
    </>
  )
})