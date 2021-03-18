import { useEffect, useState } from 'react'
import TableMapper from '../CustomTable/types/TableMapper'

export type Order = 'asc' | 'desc'

function sortFunc<T>(
  orderBy: keyof T | '',
  order: Order,
  map?: TableMapper<T>
) {
  return (a: T, b: T) => {
    if (!orderBy) return 0
    function getContent(data: T) {
      return (
        (map && map.content && map.content(data)) || (orderBy && data[orderBy])
      )
    }

    const data1 = map && map.number ? +getContent(a) : getContent(a)
    const data2 = map && map.number ? +getContent(b) : getContent(b)

    if (data1 === data2) return 0
    if (order === 'asc') {
      return data1 < data2 ? -1 : 1
    }
    return data1 < data2 ? 1 : -1
  }
}

export default function useSortTable<T>(data: T[], mapper: TableMapper<T>[]) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof T | ''>('')
  const [displayData, setDisplayData] = useState<T[]>([])

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    const newData = [...data]
    const usedMapper = mapper.find((el) => el.id === orderBy)

    newData.sort(sortFunc(orderBy, order, usedMapper))
    setDisplayData(newData)
  }, [order, orderBy, data, mapper])

  return {
    data: displayData,
    handleRequestSort,
    order,
    orderBy,
  }
}
