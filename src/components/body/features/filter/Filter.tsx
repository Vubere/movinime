import { FC } from "react"

const Filter: FC = () => {
  return (
    <>
      <div className="filter">
        <label htmlFor ='filter'>
          filter:
        </label>
          <select name="filter">
            <option>popular</option>
            <option>rating</option>
            <option>release date</option>
            <option>genre</option>
          </select>
      </div>
    </>
  )
}

export default Filter