import Link from 'next/link'
import AppShell from '@layouts/AppShell'
import nav from '@data/nav.json'

 const Home = () => {
  return (
    <AppShell title="Home">
      <div className="container w-5/12 mx-auto flex flex-wrap justify-center">
        {
          nav.filter(item => item.name !== "home" && item.name !== "results").map((item, i) => (
            <div key={`nav-link_${i}`} className="bg-gray-100 rounded-lg w-52 h-52 m-2 cursor-pointer transition transform hover:scale-90 flex justify-center items-center">
              <Link href={item.path}>
                <a>{item.displayName}</a>
              </Link>
            </div>
          ))
        }
      </div>
    </AppShell>
  )
}


export default Home