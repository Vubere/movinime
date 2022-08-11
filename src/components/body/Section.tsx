
interface PropType{
  Title: string;
  className: string;
}

export default function Section({Title, className}:PropType){
  return(
    <div className={className}>
      <h2>{Title}</h2>
    </div>
  )
}