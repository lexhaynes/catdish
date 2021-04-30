import React from 'react'
import Image from 'next/image'
import classnames from 'tailwindcss-classnames'

const Logo =  React.forwardRef(({color = "pink", href, onClick}, ref) => {
    const style = classnames('w-24', 'h-8', 'cursor-pointer');
    const imgSrc = color == "black" ? 'logo-black.png' : '/logo-pink.png';
    return (
      <a href={href} ref={ref} onClick={onClick}>
      <Image
          src={imgSrc}
          alt="CatDish logo"
          width={96}
          height={32}
          className={style}
        />
      </a>
    )
  })
  

export default Logo