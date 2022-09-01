import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { openSearchModal } from "../../../modals/modalManager"
import { memo } from "react"
import { StateT } from "../../../Type"
import { searchResult } from "./searchSlice"
import SearchModal from "../../../modals/SearchModal"
import Poster from "../../body/features/Poster"


export default memo(
  function SearchResultPage() {
    const datas = useAppSelector(state => searchResult(state.searchResult))
    const modalOpen = useAppSelector(state => state.modalStates.searchModal)
    const dispatch = useAppDispatch()
    let arr = [] as StateT[]
    for (let key in datas) {
      arr.push(datas[key] as StateT)
    }
    return (
      <>
        {
          modalOpen && (
            <SearchModal>
              <div className="searchListPageContainer">
                <div className="close" onClick={() => {
                  dispatch(openSearchModal(false))
                }}>x</div>
                {arr.map((data: StateT) => (
                  <div className="searchPosterContainer" key={data.id}>
                    <div>
                      <Poster {...data} />
                      <h4>{data.title}</h4>
                    </div>
                  </div>
                )
                )}
              </div>
            </SearchModal>)
        }
      </>
    )
  })