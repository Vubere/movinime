export default async function fetchMovie(setState?:(res:object)=>void) {
  const api = await fetch('https://api.themoviedb.org/3/movie/550?api_key=e94220f94f8d82077bb28ea0824fd429')
  const res = await api.json()
  /* if(typeof setState){
    setState(res)
  } */
  console.log(res)
}
fetchMovie()