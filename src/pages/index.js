import Link from 'next/link'
import Image from 'next/image'
import AppShell from '@layouts/AppShell'
import Navbar from '@components/Navbar'
import nav from '@data/nav.json'

 const Home = () => {
  return (
    <AppShell title="Home">
    
    <Navbar />

    <div className="container w-5/6 mx-auto mt-12 flex justify-between border">

    {/* LEFT SIDE - text */}
    <div className="p-6 w-1/2 space-y-4">
      <h1 className="text-5xl leading-tight font-bold">Let's find an allergen-free wet food for your cat!</h1>
      <h3> This tool will help you find a list of wet food brands* that meet your cat's dietary needs or restrictions. You can filter by any combination of brand, texture, and ingredient. </h3>
      <p className="text-xs italic" >* At the moment, we have ingredient data for US brands only</p>
      <div className=" pt-4 -ml-12 flex items-center justify-center"> 
      <Image alt="happy cat" width={200}  height={190} src='/cat-happy.png' />
      </div>
      
    </div>
      
      {/* RIGHT SIDE - LINKS */}
      <div className="container w-1/2 text-center my-6 border border-red-500 flex flex-col">
        <div className="desc-text w-full">
          <p className="font-bold">Start with one of the filters below</p>
          <p className="italic">You will be able to access all filter groups.</p>
        </div>
  
        <div className="w-full mt-6 grid grid-cols-2 border">
          {
            nav.filter(item => item.name !== "home" && item.name !== "results").map((item, i) => (
              <Link key={`nav-link_${i}`} href={item.path}>
                <a>
                  <div  className="text-white text-2xl bg-red-400 shadow-sm rounded-lg w-52 h-52 m-2 cursor-pointer transition transform hover:scale-90 flex justify-center items-center">
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