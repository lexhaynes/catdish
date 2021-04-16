import WetFood from '@models/WetFood'
import FilterPage from '@layouts/FilterPage'
import { pickSchema } from '@utils/misc'
const FILTER_NAME = "exclude";


const Excludes = ({data}) => {

  return (
    <FilterPage 
      title="Exclude Ingredients" 
      filterName={FILTER_NAME}
      data={data}
    />
  )
}


//load data as prop server-side before page is rendered
export function getStaticProps() {
  
  //NOTE: this array of ingredients is not coming from the db. It's coming from the schema itself.
  const data = pickSchema(WetFood, ["_filter", "__v", "brand", "texture", "product_line", "flavor", "_id"])


  if (!data) return {
    props: {data: []}
  }


  return { 
    props: { data: data } 
  }
  
} 

export default Excludes