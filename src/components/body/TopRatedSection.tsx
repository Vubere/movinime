import Section from "./features/Section";
import { FC } from "react"
import data from "./FakeData";

const TopRatedSection:FC = () => {
  return (
    <Section Title='Top Rated' className="section section3" datas={data} />
  )
}

export default TopRatedSection