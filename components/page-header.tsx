type PageHeaderProps = {
  title: string
  description: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="pt-28 pb-10 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-blue-100 max-w-3xl text-lg">{description}</p>
      </div>
    </div>
  )
}
