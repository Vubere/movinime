import MoviePoster from "./features/Poster"
import data from "./FakeData"
import { FC } from "react"

const Jumbotron:FC = () => {
  return (
    <div className="jumbotron">
      <MoviePoster {...data[0]}/>
    </div>
  )
}

export default Jumbotron