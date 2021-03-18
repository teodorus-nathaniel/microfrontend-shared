import {
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'
import React, { ReactElement, useState } from 'react'
import useRowStyles from '../../styles/useRowStyles'
import TableMapper from '../types/TableMapper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { formatNumber } from '../../../../utils/formatNumber'

interface Props<T> {
  checkable?: {
    checkedValues: { [key: string]: any }
    setCheckedValues: React.Dispatch<
      React.SetStateAction<{ [key: string]: any }>
    >
    rowId: keyof T
    useIndex?: boolean
  }
  rowData: T
  mapper: TableMapper<T>[]
  filters: number[]
  index: number
  onDoubleClick?: (data: T, index: number) => void
  onClick?: (data: T, index: number) => void
  expandable?: (
    data: T
  ) =>
    | {
        content: JSX.Element | null
        colspan?: number
        verticalAlign?: 'top' | 'center' | 'bottom'
      }[]
    | JSX.Element
  customStyles?: CSSProperties
  error?: boolean
}

export default function CustomTableRow<T>({
  checkable,
  rowData,
  mapper,
  filters,
  customStyles,
  index,
  expandable,
  onDoubleClick,
  onClick,
  error,
}: Props<T>): ReactElement {
  const classes = useRowStyles()
  const [open, setOpen] = useState(false)

  const additionalRow = expandable ? expandable(rowData) : undefined
  const checked =
    checkable &&
    (checkable.useIndex
      ? !!checkable.checkedValues[index + '']
      : checkable.checkedValues[rowData[checkable.rowId] + ''] !== undefined)

  return (
    <>
      <TableRow
        onClick={
          expandable
            ? () => setOpen(!open)
            : onClick && (() => onClick(rowData, index))
        }
        onDoubleClick={onDoubleClick && (() => onDoubleClick(rowData, index))}
        style={customStyles}
        className={`${expandable ? `${classes.pointer} ${classes.root}` : ''} ${
          open ? classes.openRow : ''
        } ${onDoubleClick || onClick ? 'pointer' : ''} ${
          checked ? classes.checkedCell : ''
        } ${error ? classes.error : ''}`}>
        {expandable && (
          <TableCell className={classes.checkboxCell}>
            <IconButton
              aria-label='expand row'
              size='small'
              className={classes.icon}
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {checkable && (
          <TableCell className={classes.checkboxCell}>
            <Checkbox
              checked={checked}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const now = e.target.checked
                checkable.setCheckedValues((prev) => {
                  const newState = { ...prev }
                  const usedIndex = checkable.useIndex
                    ? index + ''
                    : rowData[checkable.rowId] + ''
                  if (now) {
                    newState[usedIndex] = checkable.useIndex
                      ? true
                      : rowData[checkable.rowId]
                  } else {
                    delete newState[usedIndex]
                  }
                  return newState
                })
              }}
              className={classes.checkbox}
            />
          </TableCell>
        )}
        {filters.map((mapperIdx, idx) => {
          const data = mapper[mapperIdx]
          if (!data) return null
          return (
            <TableCell
              key={data.id as string}
              style={{
                minWidth: data.width || 'auto',
              }}
              // TODO: ini yang kalo mau number ke kanan
              align={data.number ? 'left' : 'left'}
              width={data.width}
              className={`${classes.cell} ${
                (checkable || expandable) && idx === 0
                  ? classes.cellAfterCheckbox
                  : idx === 0
                  ? classes.firstCell
                  : ''
              } ${data.noPadding ? 'no-padding' : ''}`}>
              {(data.content
                ? data.number
                  ? formatNumber(data.content(rowData, index))
                  : data.content(rowData, index)
                : data.number
                ? formatNumber(rowData[data.id])
                : rowData[data.id]) || '-'}
            </TableCell>
          )
        })}
      </TableRow>
      {additionalRow ? (
        <TableRow>
          {Array.isArray(additionalRow) ? (
            <>
              <TableCell className={classes.additionalRow} />
              {additionalRow.map((el, idx) =>
                el ? (
                  <TableCell
                    key={idx}
                    colSpan={el.colspan || 1}
                    className={`${
                      open ? classes.additionalRowOpen : classes.additionalRow
                    } ${
                      el.verticalAlign
                        ? el.verticalAlign === 'top'
                          ? classes.top
                          : el.verticalAlign === 'bottom'
                          ? classes.bottom
                          : classes.center
                        : classes.center
                    }`}>
                    <Collapse timeout={150} in={open} unmountOnExit>
                      {el.content}
                    </Collapse>
                  </TableCell>
                ) : (
                  <TableCell key={idx} className={classes.additionalRow} />
                )
              )}
            </>
          ) : (
            <Collapse timeout={150} in={open} unmountOnExit>
              {additionalRow}
            </Collapse>
          )}
        </TableRow>
      ) : null}
    </>
  )
}
