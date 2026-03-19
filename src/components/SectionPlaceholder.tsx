interface Props {
  subtle?: boolean
}

export default function SectionPlaceholder({ subtle = false }: Props) {
  return (
    <div
      className={`relative z-10 ${subtle ? 'bg-app-bg-subtle' : 'bg-app-bg'} h-24 md:h-32`}
      aria-hidden="true"
    />
  )
}
