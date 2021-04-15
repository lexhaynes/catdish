import WetFood from '@models/WetFood'
import Page from '@layouts/Page'
import { pickSchema } from '@utils/misc'

 const Excludes = ({data}) => {

  return (
    <Page 
        title="Exclude Ingredients" 
        tabName="exclude"
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