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
export function getServerSideProps() {
  const data = pickSchema(WetFood, ["_filter", "__v", "brand", "texture", "product_line", "flavor"])
  return { 
    props: { data: data } 
  }
} 

export default Includes