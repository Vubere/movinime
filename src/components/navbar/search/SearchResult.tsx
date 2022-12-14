import { useAppSelector } from "../../../app/hooks"

import { lazy, memo, Suspense } from "react"


const Poster = lazy(() => import("../../body/features/Poster"
))


export default memo(
  function SearchResultPage({ modalOpen, setModalOpen }: any) {
    const datas = useAppSelector(state => state.searchResult)
    const appState = useAppSelector(state => state.appState.page)


    let arr: any = []
    for (let key in datas.result) {
      arr.push(datas.result[key])
    }
    return (
      <>
        {
          modalOpen && (
            <>
              <div className="searchListPageContainer">
                <div className="close" onClick={() => {
                  setModalOpen(false)
                }}>x</div>
                {(datas.statusAnime !== 'fulfilled' || datas.statusMovie !== 'fulfilled') &&
                  <Suspense fallback='loading...'>

                    {appState === 'movie' ? arr.map((data: any) => {

                      let details = {
                        ...data,
                        typeOfData: appState
                      }

                      return (<div className="searchPosterContainer" key={data.id}>
                        <div>
                          <Poster {...details} />
                          <h4>{data.title}</h4>
                        </div>
                      </div>)
                    }) :
                      arr.map((data: any) => (
                        <div className="searchPosterContainer" key={data.mal_id}>
                          <div>
                            {<Poster key={data.mal_id}
                              title={data.title}
                              poster_path={data.images.jpg.image_url}
                              overview={data.synopsis}
                              status={data.status}
                              id={data.mal_id}
                              original_language={['ja']}
                              release_date={data.year}
                              episodeLength={data.episodes}
                              popularity={data.popularity}
                              vote_average={data.score}
                              typeOfData={appState}
                            />}
                            <h4>{data.title}</h4>
                          </div>
                        </div>
                      ))}
                  </Suspense>
                }
              </div>
            </>)
        }
      </>
    )
  })