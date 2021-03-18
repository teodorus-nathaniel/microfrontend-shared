import React from 'react'
import { Box, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Link as RouterLink } from '@reach/router'

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    position: 'relative',
    color: theme.palette.secondary.main,
    fontSize: '1rem',
    margin: `0 ${theme.spacing(0.5)}px`,
  },
}))

export default function PathBreadcrumb({
  name,
  target,
  onClick,
  bold,
  noArrow,
}: {
  name: string
  target?: string
  onClick?: () => void
  bold?: boolean
  noArrow?: boolean
}) {
  const classes = useStyles()
  const interactive = target || onClick

  return (
    <Box clone={!!interactive} display='flex' alignItems='center'>
      {interactive ? (
        <Link
          onClick={(e) => {
            if (onClick) {
              e.preventDefault()
              onClick && onClick()
            }
          }}
          component={RouterLink}
          to={target || ''}
          color='inherit'>
          {!noArrow && <ArrowForwardIosIcon className={classes.arrow} />}
          <Typography className={bold ? 'bold' : ''}>{name}</Typography>
        </Link>
      ) : (
        <>
          {!noArrow && <ArrowForwardIosIcon className={classes.arrow} />}
          <Typography className={bold ? 'bold' : ''}>{name}</Typography>
        </>
      )}
    </Box>
  )
}
