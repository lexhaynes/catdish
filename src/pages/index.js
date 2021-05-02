import Link from 'next/link'
import Image from 'next/image'
import AppShell from '@layouts/AppShell'
import NavBar from '@components/NavBar'
import nav from '@data/nav.json'

 const Home = () => {
  return (
    <AppShell title="Home">
    
    <NavBar />

    <div className="container w-full lg:w-5/6 mx-auto mt-12 md:flex justify-between">

    {/* LEFT SIDE - text */}
    <div className="p-6 md:w-1/2 space-y-4">
      <h1 className="text-3xl md:text-5xl md:leading-tight font-bold">Let's find an allergen-free wet food for your cat!</h1>
      <h3 className="w-5/6"> This tool will help you find wet food brands* that meet your cat's dietary needs or restrictions. You can filter by any combination of brand, texture, and ingredient. </h3>
      <p className="text-xs italic" >* At the moment, we have ingredient data for US brands only</p>
      <div className=" pt-4 -ml-16 flex items-center justify-center"> 
      <Image alt="happy cat" width={200}  height={190} src='/cat-happy.png' />
      </div>
      
    </div>
      
      {/* RIGHT SIDE - LINKS */}
      <div className="container md:w-1/2 text-center table bg-gray-100 p-6 rounded-2xl">
        <div className="desc-text w-full">
          <p className="font-bold">Start with one of the filter groups below</p>
          <p className="italic">You will be able to access all filter groups.</p>
        </div>
  
        <div className="w-full xl:w-5/6 mx-auto grid grid-cols-1 mt-6 md:grid-cols-2">
          {
            nav.filter(item => item.name !== "home" && item.name !== "results").map((item, i) => (
              <Link key={`nav-link_${i}`} href={item.path}>
                <a>
                  <div  className="w-full h-12 md:w-36 md:h-36 lg:w-44 lg:h-44 my-2 mx-auto text-white md:text-lg lg:text-2xl bg-red-400 shadow-sm rounded-full md:rounded-2xl cursor-pointer transition transform hover:scale-90 hover:bg-red-300 active:bg-red-200 flex justify-center items-center">
                      {item.displayName}
                  </div>
                </a>
              </Link>

            ))
          }
        </div>
      </div>

      </div>

    </AppShell>
  )
}


export default Home