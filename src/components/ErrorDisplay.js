const ErrorDisplay = ({heading, subheading}) => {
    return (
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-lg w-44 h-44 mb-6">
            <img src="/cat-face.png" />
          </div>
          <p className="font-bold mb-2">{heading}</p>
          <p className="">{subheading}</p>
      </div>
    )
}

export default ErrorDisplay