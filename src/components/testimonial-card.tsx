interface TestimonialCardProps {
  image: string
  text: string
  link: string
  linkUrl: string
  isCenter?: boolean
}

export function TestimonialCard({ image, text, link, linkUrl, isCenter = false }: TestimonialCardProps) {
  return (
    <div className={`flex flex-col items-center transition-all ${isCenter ? "w-[280px]" : "w-[220px] scale-[0.92]"}`}>
      {/* Circular Image */}
      <div className="relative z-10 mb-[-50px]">
        <div
          className={`rounded-full overflow-hidden border-4 border-[#f5f0e6] ${isCenter ? "w-[100px] h-[100px]" : "w-[85px] h-[85px]"
            }`}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={link}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div
        className={`bg-[#c4c4c4] rounded-[30px] px-4 flex flex-col items-center text-center ${isCenter ? "pt-14 pb-6 min-h-[380px]" : "pt-12 pb-5 min-h-[340px]"
          }`}
      >
        <p className={`text-[#3a3a3a] leading-relaxed flex-grow ${isCenter ? "text-sm" : "text-xs"}`}>
          {text.split(/(Fincadool|Fincal Forest|San Agustín|Orquiderama Jardín Botánico)/g).map((part, index) => {
            if (["Fincadool", "Fincal Forest", "San Agustín", "Orquiderama Jardín Botánico"].includes(part)) {
              return (
                <span key={index} className="text-[#4a9a8c]">
                  {part}
                </span>
              )
            }
            return part
          })}
        </p>

        <div className="mt-auto flex flex-col items-center">
          {/* Link */}
          <a
            href={linkUrl}
            className={`text-[#4a9a8c] underline underline-offset-2 mb-4 hover:text-[#3d857a] transition-colors ${isCenter ? "text-sm" : "text-xs"
              }`}
          >
            {link}
          </a>

          {/* Ver más Button */}
          <button
            className={`bg-[#4a9a8c] text-white rounded-full hover:bg-[#3d857a] transition-colors ${isCenter ? "text-sm px-6 py-2" : "text-xs px-5 py-1.5"
              }`}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  )
}
