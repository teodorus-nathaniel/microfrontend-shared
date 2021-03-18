export default function createArrayFromRange({
  from,
  to,
}: {
  from: number
  to: number
}) {
  let arr: number[] = []
  for (let i = from; i <= to; i++) {
    arr.push(i)
  }
  return arr
}
