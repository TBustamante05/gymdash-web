type Props = {
  icon: React.ReactNode,
  title: string
  className?: string
  onClick?: () => void
}

function MainButton({ icon, title, className = "", onClick }: Props) {
  return (
    <button className={`bg-primary hover:bg-primary/90 flex items-center gap-2 font-medium py-3.5 rounded-md cursor-pointer transition-all ease-in ${className}`} onClick={onClick}>
      {icon}
      <span>{title}</span>
    </button>
  )
}

export default MainButton