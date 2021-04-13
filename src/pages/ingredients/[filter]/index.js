import { useRouter } from 'next/router'
import WetFood from '@models/WetFood'
import Page from '@layouts/page'
import capitalize from '@utils/capitalize'

 const Ingredients = ({data}) => {
  const router = useRouter()
  const { filter } = router.query

  return (
    <Page name={`CatDish: ${capitalize(filter)} Ingredients`}>
      <h1>{capitalize(filter)}</h1>
        <ul>
         {
            data.map((item, i) => (
              <li key={`${filter}_${i}`}>{item}</li>
            ))
          } 
        </ul>
    </Page>
  )
}

//get all the ingredient fields from the schema
const pickSchema = (model, excluded) => {
  var fields = []

  model.schema.eachPath(function (path) {
    const splitpath = path.split(".")[0]
    Array.isArray(excluded) ? excluded.indexOf(splitpath) < 0 ? fields.push(splitpath) : false : splitpath === excluded ? false : fields.push(splitpath);
  })

  return fields;
 }

//load data as prop server-side before page is rendered
export function getServerSideProps() {
  const data = pickSchema(WetFood, ["_filter", "__v", "brand", "texture", "product_line", "flavor"])
  return { 
    props: { data: data } 
  }
} 

export default Ingredients