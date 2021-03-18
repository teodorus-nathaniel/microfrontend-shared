export default function getErrorResponse(error: any) {
  return error?.response?.data
}
