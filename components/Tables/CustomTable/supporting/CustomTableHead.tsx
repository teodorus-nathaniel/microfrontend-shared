import {
  Box,
  Checkbox,
  IconButton,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
} from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import { Order } from '../../effects/useSortTable'
import useHeaderStyles from '../../styles/useHeaderStyles'
import TableMapper from '../types/TableMapper'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import FilterControlPanel from './FilterControlPanel'

const useStyles = makeStyles((theme: Theme) => ({
  controlBar: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  controlBarCell: {
    padding: '0 !important',
    paddingBottom: `${theme.spacing(0.75)}px !important`,
    verticalAlign: 'top',
  },
  header: {
    position: 'sticky',
    top: 0,
    transition: `top ${theme.transitions.duration.standard}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
  filterButton: {
    position: 'absolute',
    right: '1px',
    bottom: 0,
    backgroundColor: ({ altHeaderColor }: any) =>
      altHeaderColor ? theme.palette.grey[100] : theme.palette.primary.light,
    color: ({ altHeaderColor }: any) =>
      altHeaderColor ? theme.palette.common.black : theme.palette.common.white,
    borderRadius: '5px 0 0 0',
  },
  headerAction: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

interface Props<T> {
  order: Order
  orderBy: '' | keyof T
  mapper: TableMapper<T>[]
  handleRequestSort: (property: keyof T) => void
  filters: number[]
  checkable?: {
    checkedValues: { [key: string]: any }
    setCheckedValues: React.Dispatch<
      React.SetStateAction<{ [key: string]: any }>
    >
    rowId: keyof T
    useIndex?: boolean
  }
  displayData: T[]
  altHeaderColor?: boolean
  filteredDatas: { [key: string]: any }[]
  setFilteredDatas: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }[]>
  >
  filterable?: boolean
  nonFilterableColumn?: (keyof T)[]
  expandable?: (
    data: T
  ) =>
    | {
        content: JSX.Element | null
        colspan?: number
        verticalAlign?: 'top' | 'center' | 'bottom'
      }[]
    | JSX.Element
}

export default function CustomTableHead<T>({
  handleRequestSort,
  mapper,
  order,
  expandable,
  orderBy,
  filters,
  checkable,
  displayData,
  altHeaderColor,
  filteredDatas,
  nonFilterableColumn,
  setFilteredDatas,
  filterable,
}: Props<T>): ReactElement {
  const headerClasses = useHeaderStyles({ altHeaderColor })
  const classes = useStyles({ altHeaderColor })
  const [openPopup, setOpenPopup] = useState(-1)

  const [uniqueDatas, setUniqueDatas] = useState<string[][]>([])
  useEffect(() => {
    const uniqueDatas = mapper.map((map) => [
      ...new Set(
        displayData.map((el) => {
          const content = map.content && map.content(el)
          if (typeof content === 'string') {
            return content
          }
          return el[map.id]
        })
      ),
    ]) as any[][]

    setUniqueDatas(uniqueDatas)

    setFilteredDatas(
      uniqueDatas.map((data) =>
        data.reduce((acc, el) => {
          acc[el] = true
          return acc
        }, {})
      )
    )
  }, [displayData, mapper, setFilteredDatas])

  useEffect(() => {
    function hidePopup() {
      setOpenPopup(-1)
    }
    window.addEventListener('click', hidePopup)
    return () => {
      window.removeEventListener('click', hidePopup)
    }
  }, [])

  return (
    <TableHead className={`${headerClasses.root}`}>
      <TableRow>
        {expandable && (
          <TableCell
            width='50px'
            className={`${headerClasses.root} ${
              altHeaderColor ? headerClasses.altHeader : ''
            } ${headerClasses.checkboxCell}`}
          />
        )}
        {checkable && (
          <TableCell
            className={`${headerClasses.root} ${headerClasses.checkboxCell} ${
              classes.header
            } ${altHeaderColor ? headerClasses.altHeader : ''}`}>
            <Checkbox
              className={headerClasses.checkbox}
              onChange={(e) => {
                if (!e.target.checked) {
                  checkable.setCheckedValues({})
                } else {
                  const checked: { [key: string]: any } = {}
                  displayData.forEach((el, idx) => {
                    const usedIndex =
                      (checkable.useIndex ? idx : el[checkable.rowId]) + ''
                    checked[usedIndex] = checkable.useIndex
                      ? true
                      : checkable.rowId
                  })
                  checkable.setCheckedValues(checked)
                }
              }}
            />
          </TableCell>
        )}
        {filters.map((mapperIdx, idx) => {
          if (!mapper[mapperIdx]) return null
          return (
            <TableCell
              key={mapper[mapperIdx].id as string}
              width={mapper[mapperIdx].width || 'auto'}
              className={`${headerClasses.root} ${headerClasses.headContent} ${
                classes.header
              } ${altHeaderColor ? headerClasses.altHeader : ''} ${
                (checkable || expandable) && idx === 0
                  ? headerClasses.cellAfterCheckbox
                  : idx === 0
                  ? headerClasses.firstCell
                  : ''
              } ${mapper[mapperIdx].noPadding ? 'no-padding' : ''}`}
              sortDirection={orderBy === mapper[mapperIdx].id ? order : false}>
              <Box
                display='flex'
                alignItems='center'
                textAlign={mapper[mapperIdx].number ? 'right' : 'left'}>
                {checkable?.useIndex ? (
                  mapper[mapperIdx].label
                ) : (
                  <TableSortLabel
                    active={orderBy === mapper[mapperIdx].id}
                    direction={orderBy === mapper[mapperIdx].id ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(mapper[mapperIdx].id as any)
                    }>
                    {mapper[mapperIdx].label}
                    {orderBy === mapper[mapperIdx].id && (
                      <span className={headerClasses.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    )}
                  </TableSortLabel>
                )}
                {mapper[mapperIdx].headerAction && (
                  <IconButton
                    color='inherit'
                    className={classes.headerAction}
                    size='small'
                    onClick={() =>
                      mapper[mapperIdx].headerAction?.onClick(
                        mapper[mapperIdx].id
                      )
                    }>
                    {mapper[mapperIdx].headerAction?.icon}
                  </IconButton>
                )}
              </Box>
              {filterable &&
                (!nonFilterableColumn ||
                  !nonFilterableColumn.includes(
                    mapper[mapperIdx].id as any
                  )) && (
                  <>
                    <IconButton
                      size='small'
                      className={classes.filterButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenPopup(openPopup === idx ? -1 : idx)
                      }}>
                      <ArrowDropDownIcon fontSize='small' />
                    </IconButton>
                    <FilterControlPanel
                      altHeaderColor={altHeaderColor}
                      open={idx === openPopup}
                      idx={mapperIdx}
                      filteredDatas={filteredDatas}
                      label={mapper[mapperIdx].label}
                      setFilteredDatas={setFilteredDatas}
                      uniqueDatas={uniqueDatas}
                    />
                  </>
                )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
