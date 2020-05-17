import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth", () => {
  it("should return iState", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store token", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "asas",
          userId: "fdfd",
        }
      )
    ).toEqual({
      token: "asas",
      userId: "fdfd",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
