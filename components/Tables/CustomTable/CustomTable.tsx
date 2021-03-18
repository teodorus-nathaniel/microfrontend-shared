import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  Typography,
  Box,
  Theme,
} from '@material-ui/core'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import useSortTable from '../effects/useSortTable'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import TableMapper from './types/TableMapper'
import CustomTableHead from './supporting/CustomTableHead'
import CustomTableRow from './supporting/CustomTableRow'
import CustomTableControlBar from './supporting/CustomTableControlBar'
import Loading from '../../Loading/Loading'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    borderRadius: '10px',
  },
  noBorderRadius: {
    borderRadius: 0,
  },
  noShadow: {
    boxShadow: 'none',
  },
}))

export interface ControlBarButtons {
  text: string
  onClick: (e: any) => void
  hide?: boolean
  contained?: boolean
  disabled?: boolean
}

interface Props<T> {
  className?: string
  data: T[]
  mapper: TableMapper<T>[]
  noDataMessage: {
    message: string
    buttonText?: string
    link?: string
  }
  loading?: boolean
  expandable?: (
    data: T
  ) =>
    | {
        content: JSX.Element | null
        colspan?: number
        verticalAlign?: 'top' | 'center' | 'bottom'
      }[]
    | JSX.Element
  getRowError?: (row: T) => boolean
  customStyles?: CSSProperties[]
  checkable?: {
    checkedValues: { [key: string]: any }
    setCheckedValues: React.Dispatch<
      React.SetStateAction<{ [key: string]: any }>
    >
    rowId: keyof T
    useIndex?: boolean
  }
  onRowDoubleClick?: (data: T, index: number) => void
  onRowClick?: (data: T, index: number) => void
  altHeaderColor?: boolean
  defaultFilters?: number[]
  controlBarButtons?: ControlBarButtons[]
  rightControlBarButtons?: ControlBarButtons[]
  leftControlBar?: any
  filterable?: boolean
  nonFilterableColumn?: (keyof T)[]
  selectableColumn?: boolean
  noShadow?: boolean
  noBorderRadius?: boolean
  search?: string
  onSearch?: React.Dispatch<React.SetStateAction<string>>
  setPage?: React.Dispatch<React.SetStateAction<number>>
}

export default function CustomTable<T>({
  className,
  data,
  noDataMessage,
  mapper,
  customStyles,
  expandable,
  onRowDoubleClick,
  onRowClick,
  defaultFilters,
  controlBarButtons,
  checkable,
  rightControlBarButtons,
  loading,
  altHeaderColor,
  nonFilterableColumn,
  filterable,
  leftControlBar,
  selectableColumn,
  getRowError,
  noShadow,
  noBorderRadius,
  search,
  onSearch,
  setPage,
}: Props<T>) {
  const classes = useStyles()

  const { data: displayData, handleRequestSort, order, orderBy } = useSortTable(
    data,
    mapper
  )

  const [filters, setFilters] = useState(defaultFilters || [])
  useEffect(() => {
    setFilters((prev) => {
      if (prev.length > 0) return prev
      return Array.from({ length: mapper.length }).map((_, idx) => idx)
    })
  }, [mapper])

  const [openFilterOptions, setOpenFilterOptions] = useState(false)

  const [filteredDatas, setFilteredDatas] = useState<{ [key: string]: any }[]>(
    []
  )

  return (
    <>
      {(controlBarButtons ||
        selectableColumn ||
        rightControlBarButtons ||
        onSearch) && (
        <CustomTableControlBar
          setPage={setPage}
          search={search}
          onSearch={onSearch}
          rightControlBarButtons={rightControlBarButtons}
          selectableColumn={selectableColumn}
          controlBarButtons={controlBarButtons}
          leftControlBar={leftControlBar}
          filters={filters}
          setFilters={setFilters}
          mapper={mapper}
          openFilterOptions={openFilterOptions}
          setOpenFilterOptions={setOpenFilterOptions}
          altHeaderColor={altHeaderColor}
        />
      )}
      <TableContainer
        component={Paper}
        className={`${classes.root} ${noShadow ? classes.noShadow : ''} ${
          noBorderRadius ? classes.noBorderRadius : ''
        } ${className || ''}`}>
        {loading ? (
          <Loading />
        ) : mapper.length > 0 ? (
          <>
            <Table stickyHeader size='small'>
              <CustomTableHead
                expandable={expandable}
                filterable={filterable}
                filteredDatas={filteredDatas}
                setFilteredDatas={setFilteredDatas}
                altHeaderColor={altHeaderColor}
                nonFilterableColumn={nonFilterableColumn}
                filters={filters}
                handleRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                mapper={mapper}
                displayData={displayData}
                checkable={checkable}
              />
              <TableBody>
                {displayData
                  .filter((el) => {
                    return filteredDatas.every((rowFilter, idx) => {
                      if (!rowFilter) return true
                      const content =
                        mapper[idx].content && mapper[idx].content!(el)
                      if (typeof content === 'string') {
                        return rowFilter[content]
                      }
                      return rowFilter[el[mapper[idx].id] as any]
                    })
                  })
                  .map((el, idx) => (
                    <CustomTableRow
                      error={getRowError && getRowError(el)}
                      expandable={expandable}
                      onDoubleClick={onRowDoubleClick}
                      onClick={onRowClick}
                      key={idx}
                      rowData={el}
                      filters={filters}
                      index={idx}
                      mapper={mapper}
                      checkable={checkable}
                      customStyles={customStyles && customStyles[idx]}
                    />
                  ))}
              </TableBody>
            </Table>
            {data.length === 0 &&
              (noDataMessage.buttonText ? (
                <ErrorMessage
                  buttonText={noDataMessage.buttonText}
                  error={noDataMessage.message}
                  target={noDataMessage.link}
                />
              ) : (
                <Box py={2}>
                  <Typography className='bold' align='center'>
                    {noDataMessage.message}
                  </Typography>
                </Box>
              ))}
          </>
        ) : null}
      </TableContainer>
    </>
  )
}
