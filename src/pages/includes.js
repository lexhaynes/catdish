import WetFood from '@models/WetFood'
import TabPage from '@layouts/TabPage'
import { pickSchema } from '@utils/misc'

 const Includes = ({data}) => {

  return (
    <TabPage 
        title="Include Ingredients" 
        tabName="include"
        data={data}
    />
  )
}

//load data as prop server-side before page is rendered
export function getStaticProps() {

  //NOTE: this array of ingredients is not coming from the db. It's coming from the schema itself.
  const data = pickSchema(WetFood, ["_filter", "__v", "brand", "texture", "product_line", "flavor"])

  if (!data) return {
    props: {data: []}
  }


  return { 
    props: { data: data } 
  }
} 

export default Includes