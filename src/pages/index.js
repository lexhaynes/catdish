import Link from 'next/link'
import AppShell from '@layouts/AppShell'
import nav from '@data/nav.json'

 const Home = () => {
  return (
    <AppShell title="Home">
      <h1>Home</h1>
      <ul>
        {
          nav.map((item, i) => (
            <li key={`nav-link_${i}`}><Link href={item.path}><a>{item.displayName}</a></Link></li>
          ))
        }
      </ul>
    </AppShell>
  )
}


export default Home