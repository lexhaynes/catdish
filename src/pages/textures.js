import dbConnect from '@utils/dbConnect'
import WetFood from '@models/WetFood'
import FilterPage from '@layouts/FilterPage'
const FILTER_NAME = "texture";

 const Textures = ({ data }) => {
  return (
    <FilterPage 
      title="Filter by Texture" 
      filterName={FILTER_NAME}
      data={data}
      dataType="LIST"
    />
  )
}
/* nextJS utility to retrieve data from database before the page is rendered and return data as component prop */
export async function getStaticProps() {
  await dbConnect()

  //put error handling in here!!!
  const data = await WetFood.distinct(FILTER_NAME)

  if (!data) return {
    props: {data: []}
  }

  return { 
    props: { data: data } 
  } 

}


export default Textures;