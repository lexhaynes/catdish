import style from '@styles/Footer.module.scss'

const Footer = () => {
    return (
        <footer className="w-full mt-36">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#F9FAFB" fillOpacity="1" d="M0,224L30,224C60,224,120,224,180,229.3C240,235,300,245,360,245.3C420,245,480,235,540,234.7C600,235,660,245,720,234.7C780,224,840,192,900,165.3C960,139,1020,117,1080,133.3C1140,149,1200,203,1260,224C1320,245,1380,235,1410,229.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg>
            <div className={`bg-gray-50 h-12 flex justify-center items-center`}>
                <div className="container p-6 mx-auto text-center">
                    &copy; CatDish 2021
                </div>
            </div>
        </footer>
    )
}

export default Footer;