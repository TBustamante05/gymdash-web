type Props = {
  icon: React.ReactNode,
  title: string
  className?: string
}

function MainButton({ icon, title, className = "" }: Props) {
  return (
    <button className={`bg-primary hover:bg-primary/90 flex items-center gap-2 font-medium py-3 rounded-md cursor-pointer transition-all ease-in ${className}`}>
      {icon}
      <span>{title}</span>
    </button>
  )
}

export default MainButton