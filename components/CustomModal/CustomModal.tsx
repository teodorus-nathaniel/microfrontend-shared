import React, { ReactElement } from 'react'
import { Modal, Box, makeStyles, Theme, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: ({ width }: any) => width || 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: ({ noPadding }: any) =>
      noPadding ? theme.spacing(0) : theme.spacing(2, 4, 3),
    outline: 'none',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    right: '28px',
    top: '6px',
  },
}))

interface Props {
  children: any
  open: boolean
  handleClose: () => void
  width?: number
  noPadding?: boolean
  withCloseButton?: boolean
}

export default function CustomModal({
  children,
  open,
  handleClose,
  width,
  noPadding,
  withCloseButton,
}: Props): ReactElement {
  const classes = useStyles({ width, noPadding })

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.container}>
        {children}
        {withCloseButton && (
          <IconButton
            edge='end'
            onClick={handleClose}
            className={classes.closeBtn}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Modal>
  )
}
