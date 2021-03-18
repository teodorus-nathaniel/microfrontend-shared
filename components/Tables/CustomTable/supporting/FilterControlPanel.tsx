import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  popupFilter: {
    background: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    width: '300px',
    height: '400px',
    position: 'absolute',
    bottom: 0,
    right: '1px',
    borderRadius: '5px',
    transform: 'translate(0, 100%)',
    padding: theme.spacing(2),
    color: ({ altHeaderColor }: any) =>
      altHeaderColor ? theme.palette.common.white : theme.palette.common.black,
  },
  rightPopup: {
    left: '1px',
  },
  filterContainer: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: '2px',
    overflow: 'auto',
  },
  checkbox: {
    padding: theme.spacing(0.5),
  },
  checkboxControl: {
    textTransform: 'capitalize',
    margin: 0,
  },
  searchInputContainer: {
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    fontSize: theme.typography.subtitle2.fontSize,
    '& > input': {
      padding: `6.5px 10px`,
    },
  },
}))

interface Props {
  open?: boolean
  label: string
  filteredDatas: { [key: string]: any }[]
  setFilteredDatas: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }[]>
  >
  idx: number
  uniqueDatas: string[][]
  altHeaderColor?: boolean
}

export default function FilterControlPanel({
  open,
  label,
  filteredDatas,
  setFilteredDatas,
  idx,
  uniqueDatas,
  altHeaderColor,
}: Props) {
  const classes = useStyles({ altHeaderColor })
  const [search, setSearch] = useState('')

  if (!open) return null

  const displayedFilters = uniqueDatas[idx].filter((el) => {
    return (typeof el === 'string' ? el || '-' : '-').includes(search)
  })

  return (
    <Box
      className={`${classes.popupFilter} ${
        idx === 0 ? classes.rightPopup : ''
      }`}
      display='flex'
      flexDirection='column'
      onClick={(e) => e.stopPropagation()}>
      <Typography className='bold' gutterBottom>
        {label}
      </Typography>
      <TextField
        size='small'
        placeholder='Search...'
        variant='outlined'
        className={classes.searchInputContainer}
        InputProps={{
          className: classes.searchInput,
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box flex={1} className={classes.filterContainer}>
        <Box display='flex' alignItems='center'>
          <FormControlLabel
            className={classes.checkboxControl}
            onChange={(e: any) => {
              if (e.target.checked) {
                setFilteredDatas((prev) => {
                  const newState = [...prev]
                  newState[idx] = {}
                  displayedFilters.forEach((el) => (newState[idx][el] = true))
                  return newState
                })
              } else {
                setFilteredDatas((prev) => {
                  const newState = [...prev]
                  displayedFilters.forEach((el) => delete newState[idx][el])
                  return newState
                })
              }
            }}
            checked={displayedFilters.every((el) => filteredDatas[idx][el])}
            control={<Checkbox className={classes.checkbox} size='small' />}
            label='(Select all)'
          />
        </Box>
        {displayedFilters.map((data) => (
          <Box display='flex' alignItems='center' key={data + ''}>
            <FormControlLabel
              className={classes.checkboxControl}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setFilteredDatas((prev) => {
                    const newState = [...prev]
                    if (!newState[idx]) newState[idx] = {}
                    newState[idx][data as any] = true
                    return newState
                  })
                } else {
                  setFilteredDatas((prev) => {
                    const newState = [...prev]
                    if (!newState[idx])
                      newState[idx] = uniqueDatas[idx].reduce<{
                        [key: string]: any
                      }>((prev, data) => {
                        prev[data as any] = true
                        return prev
                      }, {})
                    delete newState[idx][data as any]
                    return newState
                  })
                }
              }}
              checked={
                !!(!filteredDatas[idx] || filteredDatas[idx][data as any])
              }
              control={<Checkbox className={classes.checkbox} size='small' />}
              label={data || '-'}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
