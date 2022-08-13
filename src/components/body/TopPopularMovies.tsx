import Section from "./features/Section";
import { FC } from "react"
import data from "./FakeData";

const TopPopular:FC = () => {
  return (
    <Section Title='Top Popular' className="section section1" datas={data}/>
  )
}
export default TopPopular