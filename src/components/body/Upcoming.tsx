import Section from "./features/Section";
import { FC } from "react"
import data from "./FakeData";


const Upcoming: FC = () => {
  return <Section Title="Top Upcoming" className="section section4" datas={data} />;
};

export default Upcoming