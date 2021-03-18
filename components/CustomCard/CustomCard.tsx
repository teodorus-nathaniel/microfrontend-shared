import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '2px',
    boxShadow: theme.shadows[1],
  },
  rounded: {
    borderRadius: '10px',
  },
}))

interface Props {
  children: any
  rounded?: boolean
  title?: string
  smallTitle?: boolean
  dense?: boolean
}

export default function CustomCard({
  children,
  rounded,
  title,
  smallTitle,
  dense,
}: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box
      padding={dense ? 2 : 3}
      className={`${classes.root} ${rounded ? classes.rounded : ''}`}>
      {title && (
        <Box pb={dense ? 0.5 : 1.5}>
          <Typography
            gutterBottom
            variant={smallTitle ? 'body1' : 'h2'}
            className={smallTitle ? '' : 'bold'}>
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  )
}
