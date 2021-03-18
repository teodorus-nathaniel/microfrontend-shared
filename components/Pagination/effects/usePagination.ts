import { PaginationData } from '../../../models/PaginationData'
import { useEffect, useState } from 'react'
import createArrayFromRange from '../../../utils/createArrayFromRange'

export default function usePagination<T>(
  data: PaginationData<T> | undefined,
  page: number
) {
  const [displayedPagination, setDisplayedPagination] = useState<
    (number | undefined)[]
  >([])
  useEffect(() => {
    const firstPage = 1
    const lastPage =
      data && 'meta' in data ? data?.meta?.last_page : (data as any).last_page
    if (!lastPage) return

    const low = Math.max(firstPage + 1, page - 3)
    const high = Math.min(page + 3, lastPage - 1)

    const displayedPages: (number | undefined)[] = createArrayFromRange({
      from: low,
      to: high,
    })
    if (page - 3 < firstPage + 1) {
      for (let i = 0; i < firstPage - (page - 3); i++) {
        if (high + i + 1 < lastPage) displayedPages.push(high + i + 1)
      }
    } else if (page + 3 > lastPage - 1) {
      for (let i = 0; i < page + 3 - lastPage; i++) {
        if (low - i - 1 > firstPage) displayedPages.unshift(low - i - 1)
      }
    }

    if (low > firstPage + 1) displayedPages.unshift(undefined)
    if (high < lastPage - 1) displayedPages.push(undefined)

    displayedPages.unshift(firstPage)
    if (firstPage !== lastPage) displayedPages.push(lastPage)

    setDisplayedPagination(displayedPages)
  }, [page, data])

  return displayedPagination
}
