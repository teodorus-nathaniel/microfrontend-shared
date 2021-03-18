export default interface TableMapper<T> {
  id: string
  label: string
  content?: (data: T, idx?: number) => any
  headerAction?: {
    icon: JSX.Element
    onClick: (mapId: string) => void
  }
  width?: string
  number?: boolean
  noPadding?: boolean
}
