import {
  Box,
  ButtonBase,
  Card,
  IconButton,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { PaginationData } from '../../models/PaginationData'
import usePagination from './effects/usePagination'

interface Props<T> {
  data: PaginationData<T>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles((theme: Theme) => ({
  pagination: {
    borderRadius: '10px',
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: `0 ${theme.spacing(0.5)}px`,

    '&:disabled': {
      color: theme.palette.grey[600],
    },
  },
  activePagination: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,

    '&:disabled': {
      background: theme.palette.grey[600],
      color: theme.palette.common.white,
    },
  },
  paginationContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0 0 5px 5px',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2,
  },
  inputPage: {
    '& input': {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(0.75)}px`,
      width: '5ch',
    },
  },
}))

export default function Pagination<T>({
  data,
  page,
  setPage,
}: Props<T>): ReactElement {
  const classes = useStyles()

  const [inputPage, setInputPage] = useState(page)
  useEffect(() => {
    setInputPage(page)
  }, [page])

  const lastPage =
    'meta' in data ? data.meta.last_page : (data as any).last_page

  const handleSubmitPageInput = (e: any) => {
    e.preventDefault()
    if (!data) return

    if (inputPage < 1 || inputPage > lastPage) {
      setInputPage(page)
      return
    }
    setPage(inputPage)
  }
  const displayedPagination = usePagination(data, page)

  return (
    <>
      {lastPage && (
        <Box
          display='flex'
          alignItems='center'
          className={classes.paginationContainer}
          clone>
          <Card>
            <IconButton
              size='small'
              color='primary'
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
              <ArrowForwardIosIcon fontSize='small' transform='rotate(180)' />
            </IconButton>
            {displayedPagination.map((num, idx) =>
              num === undefined ? (
                <Box
                  key={`undefined${idx}`}
                  className={classes.pagination}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'>
                  <Typography>...</Typography>
                </Box>
              ) : (
                <ButtonBase
                  key={num}
                  onClick={() => setPage(num)}
                  className={`${classes.pagination} ${
                    page === num ? classes.activePagination : ''
                  }`}>
                  {num}
                </ButtonBase>
              )
            )}
            <IconButton
              size='small'
              color='primary'
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, lastPage || 0))
              }>
              <ArrowForwardIosIcon fontSize='small' />
            </IconButton>
            <Box clone ml={4} display='flex' alignItems='center'>
              <form onSubmit={handleSubmitPageInput}>
                <Box mr={1}>
                  <Typography variant='subtitle2'>Go to Page: </Typography>
                </Box>
                <TextField
                  size='small'
                  variant='outlined'
                  color='primary'
                  value={inputPage}
                  type='number'
                  onChange={(e) => setInputPage(+e.target.value)}
                  InputProps={{
                    className: classes.inputPage,
                  }}
                />
                <Box ml={1}>
                  <ButtonBase disableRipple disableTouchRipple type='submit'>
                    <Link className='link'>Go</Link>
                  </ButtonBase>
                </Box>
              </form>
            </Box>
          </Card>
        </Box>
      )}
    </>
  )
}
