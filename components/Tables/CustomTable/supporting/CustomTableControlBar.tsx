import {
  Box,
  TextField,
  makeStyles,
  Theme,
  Button,
  Collapse,
  Chip,
  IconButton,
  Typography,
} from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import TableMapper from '../types/TableMapper'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { ControlBarButtons } from '../CustomTable'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    color: theme.palette.primary.main,
  },
  searchContainer: {
    marginRight: theme.spacing(2),
  },
  filterOptions: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '2px',
    padding: theme.spacing(1.5),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.common.white,

    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addChip: {
    backgroundColor: theme.palette.secondary.main,
  },
  deleteChip: {
    backgroundColor: theme.palette.error.main,
  },
  controlBarButtons: {
    marginLeft: theme.spacing(1),
  },
}))

interface Props<T> {
  openFilterOptions: boolean
  setOpenFilterOptions: React.Dispatch<React.SetStateAction<boolean>>
  mapper: TableMapper<T>[]
  filters: number[]
  setFilters: React.Dispatch<React.SetStateAction<number[]>>
  controlBarButtons?: ControlBarButtons[]
  rightControlBarButtons?: ControlBarButtons[]
  altHeaderColor?: boolean
  leftControlBar?: any
  selectableColumn?: boolean
  search?: string
  onSearch?: React.Dispatch<React.SetStateAction<string>>
  setPage?: React.Dispatch<React.SetStateAction<number>>
}

export default function CustomTableControlBar<T>({
  openFilterOptions,
  setOpenFilterOptions,
  filters,
  mapper,
  setFilters,
  controlBarButtons,
  leftControlBar,
  altHeaderColor,
  rightControlBarButtons,
  selectableColumn,
  search,
  onSearch,
  setPage,
}: Props<T>): ReactElement {
  const classes = useStyles()
  const availableColumns = mapper.filter((_, idx) => !filters.includes(idx))
  const [thisSearch, setThisSearch] = useState('')

  useEffect(() => {
    setThisSearch(search || '')
  }, [search])

  return (
    <>
      <Box
        display='flex'
        alignItems='flex-end'
        width='100%'
        justifyContent='space-between'
        mb={2}>
        <Box display='flex'>
          {controlBarButtons &&
            controlBarButtons.map((button) => (
              <Button
                size='small'
                variant={
                  button.contained || altHeaderColor ? 'contained' : 'outlined'
                }
                disabled={button.disabled}
                color='secondary'
                key={button.text}
                className={`${classes.button} ${button.hide ? 'hide' : ''}`}
                onClick={button.onClick}>
                {button.text}
              </Button>
            ))}
          {leftControlBar ? <Box height='100%'>{leftControlBar}</Box> : null}
        </Box>
        <Box display='flex' alignItems='center'>
          {onSearch && (
            <TextField
              value={thisSearch}
              onChange={(e) => {
                const value = e.target.value
                setThisSearch(value)
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  if (!onSearch) return
                  onSearch(thisSearch)
                  if (setPage) setPage(1)
                  ev.preventDefault()
                }
              }}
              size='small'
              color='primary'
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      if (!onSearch || !setPage) return
                      onSearch(thisSearch)
                      setPage(1)
                    }}
                    size='small'
                    className={classes.searchIcon}>
                    <SearchIcon color='inherit' />
                  </IconButton>
                ),
              }}
              placeholder='Search...'
              className={classes.searchContainer}
            />
          )}
          {selectableColumn && (
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setOpenFilterOptions((prev) => !prev)}>
              Filter
            </Button>
          )}
          {rightControlBarButtons &&
            rightControlBarButtons.map((el) => (
              <Button
                key={el.text}
                className={classes.controlBarButtons}
                variant={el.contained ? 'contained' : 'outlined'}
                color='secondary'
                onClick={el.onClick}
                disabled={el.disabled}>
                {el.text}
              </Button>
            ))}
        </Box>
      </Box>
      <Collapse unmountOnExit in={openFilterOptions} timeout={150}>
        <div className={classes.filterOptions}>
          <Box pb={1}>
            <Typography
              variant='subtitle2'
              className='bold'
              color='textPrimary'
              gutterBottom>
              Current Columns
            </Typography>
            {filters.map((filterIdx, idx) => {
              if (!mapper[filterIdx]) return null
              return (
                <Chip
                  key={mapper[filterIdx].label}
                  label={mapper[filterIdx].label}
                  onDelete={() => {
                    if (filters.length === 0) return
                    setFilters((prev) => {
                      const newState = [...prev]
                      newState.splice(idx, 1)
                      return newState
                    })
                  }}
                  size='small'
                  className={`${classes.chip} ${classes.deleteChip}`}
                />
              )
            })}
          </Box>
          <Box>
            <Typography
              variant='subtitle2'
              className='bold'
              color='textPrimary'
              gutterBottom>
              Available Columns
            </Typography>
            {availableColumns.length === 0 ? (
              <Typography variant='subtitle2' color='textPrimary'>
                All columns have been displayed
              </Typography>
            ) : (
              availableColumns.map((el) => (
                <Chip
                  key={el.id as string}
                  label={el.label}
                  onDelete={() => {
                    setFilters((prev) => {
                      const newState = [...prev]
                      const idx = mapper.findIndex((data) => data.id === el.id)
                      if (idx === -1) return prev

                      newState.push(idx)
                      return newState
                    })
                  }}
                  deleteIcon={<AddCircleIcon />}
                  size='small'
                  className={`${classes.chip} ${classes.addChip}`}
                />
              ))
            )}
          </Box>
        </div>
      </Collapse>
    </>
  )
}
