export const objectMap = (obj: Object, fn: any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(k, v, i)]
    )
  )
