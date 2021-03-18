export interface PaginationData<T> {
  data: T
  links: {
    first: null | string
    last: null | string
    next: null | string
    prev: null | string
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
