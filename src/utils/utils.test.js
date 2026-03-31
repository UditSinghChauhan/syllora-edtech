import GetAvgRating from "./avgRating"
import { formattedDate } from "./dateFormatter"

describe("utility helpers", () => {
  it("returns zero for an empty rating list", () => {
    expect(GetAvgRating([])).toBe(0)
  })

  it("returns the average rating rounded to one decimal place", () => {
    expect(
      GetAvgRating([{ rating: 4 }, { rating: 5 }, { rating: 3 }])
    ).toBe(4)

    expect(
      GetAvgRating([{ rating: 4 }, { rating: 5 }, { rating: 4 }])
    ).toBe(4.3)
  })

  it("formats dates for UI display", () => {
    expect(formattedDate("2026-03-31T00:00:00.000Z")).toBe("March 31, 2026")
  })
})
