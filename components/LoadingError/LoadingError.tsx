import React, { ReactElement } from 'react'
import Loading from '../Loading/Loading'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import getErrorResponse from '../../utils/getErrorResponse'

interface Props {
  status: 'success' | 'error' | 'loading' | 'idle'
  children: any
  error: any
  usedErrorAttr?: string
  renderChild?: boolean
}

export default function LoadingError({
  status,
  children,
  error,
  usedErrorAttr: usedAttr,
  renderChild,
}: Props): ReactElement {
  return status === 'success' || renderChild ? (
    children
  ) : status === 'loading' ? (
    <Loading />
  ) : status === 'error' ? (
    <ErrorMessage
      error={
        typeof error === 'string'
          ? error
          : (getErrorResponse(error) &&
              getErrorResponse(error)[usedAttr || 'message']) ||
            'Something unexpected happening'
      }
    />
  ) : null
}
