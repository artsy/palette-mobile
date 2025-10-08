import { getImageURL } from "../helpers/getImageURL"

describe("getImageURL", () => {
  it("should return the original url if performResize is true", () => {
    const url = getImageURL({
      src: "https://example.com/image.jpg",
      dimensions: { width: 100, height: 100 },
      geminiResizeMode: "fill",
      performResize: true,
    })
    expect(url).toBe(
      "https://d7hftxdivxxvm.cloudfront.net/?height=200&quality=80&resize_to=fill&src=https%3A%2F%2Fexample.com%2Fimage.jpg&width=200"
    )
  })

  it("should return the original url if performResize is true and the url is already resized", () => {
    const url = getImageURL({
      src: "https://d7hftxdivxxvm.cloudfront.net/?height=100&quality=80&resize_to=fill&src=https%3A%2F%2Fexample.com%2Fimage.jpg&width=100",
      dimensions: { width: 100, height: 100 },
      geminiResizeMode: "fill",
      performResize: true,
    })
    expect(url).toBe(
      "https://d7hftxdivxxvm.cloudfront.net/?height=100&quality=80&resize_to=fill&src=https%3A%2F%2Fexample.com%2Fimage.jpg&width=100"
    )
  })

  it("should return the original url if performResize is false", () => {
    const url = getImageURL({
      src: "https://example.com/image.jpg",
      dimensions: { width: 100, height: 100 },
      geminiResizeMode: "fill",
      performResize: false,
    })
    expect(url).toBe("https://example.com/image.jpg")
  })
})
