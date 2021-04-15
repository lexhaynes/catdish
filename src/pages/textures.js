import dbConnect from '@utils/dbConnect'
import WetFood from '@models/WetFood'
import Page from '@layouts/Page'

 const Textures = ({ data }) => {
  return (
      <Page 
        title="Filter by Texture" 
        tabName="texture"
        data={data}
        />
    )
}

/* nextJS utility to retrieve data from database before the page is rendered and return data as component prop */
export async function getStaticProps() {
  await dbConnect()

  //put error handling in here!!!
  const data = await WetFood.distinct('texture')

  if (!data) return {
    props: {data: []}
  }

  return { 
    props: { data: data } 
  } 

}


export default Textures;