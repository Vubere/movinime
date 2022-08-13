import Section from "./features/Section";
import {FC} from "react"
import data from "./FakeData";


const TopNewlyReleasedSection:FC = () => {
  return <Section Title="Top Newly Released" className="section section2" datas={data} />;
};

export default TopNewlyReleasedSection