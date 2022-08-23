import { useAppSelector } from "../../../app/hooks"
import { memo } from "react"
import { StateT } from "../../../Type"
import { searchResult } from "./searchSlice"
import SearchModal from "./SearchModal"
import Poster from "../../body/features/Poster"


const body = document.querySelector('body') as HTMLBodyElement

type SearchResultPropType = {
  searchModalOpen: boolean;
  setSearchModalOpen: (arg: boolean) => void;
}
export default memo(
  function SearchResultPage({ searchModalOpen, setSearchModalOpen }: SearchResultPropType) {
    const datas = useAppSelector(state => searchResult(state.searchResult))
    let arr = [] as StateT[]
    for (let key in datas) {
      arr.push(datas[key] as StateT)
    }
    return (
      <>
        {
          searchModalOpen && (
            <SearchModal>
              <div className="searchListPageContainer">
                <div className="close" onClick={() => {
                  setSearchModalOpen(false)
                  body.style.overflow = 'auto'
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