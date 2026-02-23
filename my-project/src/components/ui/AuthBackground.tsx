type AuthBackgroundProps = {
  image: string
}

export function AuthBackground({ image }: AuthBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Dark mode overlay */}
      <div className="absolute inset-0 bg-transparent dark:bg-black/70" />
    </div>
  )
}
