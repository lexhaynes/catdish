import Image from 'next/image'

const ErrorDisplay = ({heading, subheading}) => {
    return (
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-lg w-44 h-44 mb-6">
            <Image width={200} height={190} src="/cat-sad.png" alt="sad cat" />
          </div>
          <p className="font-bold mb-2">{heading}</p>
          <p className="">{subheading}</p>
      </div>
    )
}

export default ErrorDisplay