export default function Loader({
  size = "medium",
  color = "primary",
}: { size?: "small" | "medium" | "large"; color?: "primary" | "white" }) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  }

  const colorClasses = {
    primary: "border-[#FF6B35] border-b-transparent",
    white: "border-white border-b-transparent",
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  )
}
