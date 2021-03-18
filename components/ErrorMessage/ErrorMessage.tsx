import React, { ReactElement } from 'react'
import { Typography, Box, Button, makeStyles, Theme } from '@material-ui/core'
import { useNavigate } from '@reach/router'

interface Props {
  error?: string
  buttonText?: string
  target?: string
  noPadding?: boolean
  noButton?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    display: 'none',
  },
}))

export default function ErrorMessage({
  error,
  buttonText,
  target,
  noPadding,
  noButton,
}: Props): ReactElement {
  const navigate = useNavigate()

  const classes = useStyles()

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
      px={noPadding ? 0 : 3}
      py={noPadding ? 0 : 5}>
      <Typography variant='h5' align='center'>
        {error || 'Something unexpected occurred'}
      </Typography>
      {!noButton && (
        <Box mt={noPadding ? 0 : 2}>
          <Button
            className={!buttonText ? classes.disabled : ''}
            size='small'
            variant='contained'
            color='primary'
            onClick={() => navigate(target || '/')}>
            {buttonText || 'Back to Home'}
          </Button>
        </Box>
      )}
    </Box>
  )
}
