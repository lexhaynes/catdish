import Link from 'next/link'
import Page from '@layouts/page'
import nav from '@data/nav.json'

 const Home = () => {
  return (
    <Page title="CatDish Home">
      <h1>Home</h1>
      <ul>
        {
          nav.map((item, i) => (
            <li key={`nav-link_${i}`}><Link href={item.path}><a>{item.displayName}</a></Link></li>
          ))
        }
      </ul>
    </Page>
  )
}


export default Home