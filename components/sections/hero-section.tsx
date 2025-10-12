import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle: string
  buttonText?: string
  buttonLink?: string
  image?: string
  backgroundColor?: string
  textColor?: string
}

export function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
  image,
  backgroundColor = "#ffffff",
  textColor = "#000000",
}: HeroSectionProps) {
  return (
    <div
      className="relative flex items-center justify-center min-h-[500px] p-8 text-center"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <Image src={image || "/placeholder.svg"} alt="Hero background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-xl mb-8 text-white">{subtitle}</p>
        {buttonText && (
          <Button asChild>
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
