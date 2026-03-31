describe("API endpoint configuration", () => {
  const originalEnv = process.env.REACT_APP_BACKEND_URL

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.REACT_APP_BACKEND_URL
    } else {
      process.env.REACT_APP_BACKEND_URL = originalEnv
    }
    jest.resetModules()
  })

  it("falls back to localhost when no backend url is configured", () => {
    delete process.env.REACT_APP_BACKEND_URL

    jest.isolateModules(() => {
      const { endpoints, contactusEndpoint } = require("./apis")

      expect(endpoints.LOGIN_API).toBe("http://localhost:4000/api/v1/auth/login")
      expect(contactusEndpoint.CONTACT_US_API).toBe(
        "http://localhost:4000/api/v1/reach/contact"
      )
    })
  })

  it("uses the deployed backend url when configured", () => {
    process.env.REACT_APP_BACKEND_URL = "https://api.syllora.com/api/v1"

    jest.isolateModules(() => {
      const { courseEndpoints } = require("./apis")

      expect(courseEndpoints.GET_ALL_COURSE_API).toBe(
        "https://api.syllora.com/api/v1/course/getAllCourses"
      )
    })
  })
})
