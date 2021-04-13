import dbConnect from '@utils/dbConnect'
import WetFood from '@models/WetFood'
import Page from '@layouts/page';

 const Brands = ({ data }) => {
  return (
    <Page title="CatDish: Filter by Brands">
        <h1>Brands</h1>
        <ul>
          {
            data.map((item, i) => (
              <li key={`brands_${i}`}>{item}</li>
            ))
          } 
        </ul>
    </Page>
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