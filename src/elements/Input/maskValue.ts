const maskString = (value: string, mask: string) => {
  let result = mask.replace(/9/g, "_")
  for (const digit of value.replace(/\D/g, "")) {
    if (result.includes("_")) {
      result = result.replace("_", digit)
    } else {
      result = result + digit
    }
  }
  if (result.includes("_")) {
    result = result.slice(0, result.indexOf("_"))
  }
  return result
}
export const maskValue = ({
  currentValue,
  mask,
  previousValue = "",
}: {
  currentValue: string | undefined
  mask: string | string[] | undefined
  previousValue?: string
}) => {
  if (!currentValue || !mask || mask.length === 0) {
    return currentValue
  }

  const value = unmaskText(currentValue)

  if (previousValue && previousValue.length > currentValue.length) {
    // user is deleting, don't mess with the format
    return currentValue
  }

  if (typeof mask === "string") {
    return maskString(currentValue, mask)
  } else {
    if (value.length <= unmaskText(mask[0]).length) {
      return maskString(value, mask[0])
    } else {
      const nearestMask =
        [...mask].reverse().find((m) => {
          if (value.length >= unmaskText(m).length) {
            return true
          }
          return false
        }) || mask[0]

      return maskString(value, nearestMask)
    }
  }
}

// Helper method to clean the mask and remove all non-digits and spaces
export const unmaskText = (mask: string) => mask.replace(/\W/g, "")
