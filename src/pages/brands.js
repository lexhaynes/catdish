import dbConnect from '@utils/dbConnect'
import WetFood from '@models/WetFood'
import TabPage from '@layouts/TabPage'


 const Brands = ({ data }) => {
  return (
    <TabPage 
      title="Filter by Brands" 
      tabName="brand"
      data={data}
      />
  )
}

/* nextJS utility to retrieve data from database before the page is rendered and return data as component prop */
export async function getServerSideProps() {
  await dbConnect()

  //put error handling in here!!!
  const res = await WetFood.distinct('brand')

  return { 
    props: { data: res } 
  } 

}


export default Brands