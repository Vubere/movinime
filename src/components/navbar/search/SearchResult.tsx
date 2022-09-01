import { useAppSelector} from "../../../app/hooks"

import { memo} from "react"
import { StateT } from "../../../Type"
import { searchResult } from "./searchSlice"

import Poster from "../../body/features/Poster"


export default memo(
  function SearchResultPage({modalOpen, setModalOpen}:any) {
    const datas = useAppSelector(state => searchResult(state.searchResult))
  
  
    let arr = [] as StateT[]
    for (let key in datas) {
      arr.push(datas[key] as StateT)
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
                {arr.map((data) => (
                  <div className="searchPosterContainer" key={data.id}>
                    <div>
                      <Poster {...data} />
                      <h4>{data.title}</h4>
                    </div>
                  </div>
                )
                )}
              </div>
            </>)
        }
      </>
    )
  })