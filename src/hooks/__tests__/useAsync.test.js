import { useAsync } from "../useAsync";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useAsync", () => {
  it("fetches data", async () => {
    const fetchData = Promise.resolve("cats");
    const { result, waitForValueToChange } = renderHook(() => useAsync());

    act(() => {
      result.current.run(fetchData);
    });

    expect(result.current).toEqual({
      data: null,
      error: null,
      run: expect.any(Function),
      status: "pending",
    });

    await waitForValueToChange(() => result.current.status);

    expect(result.current).toEqual({
      data: "cats",
      error: null,
      run: expect.any(Function),
      status: "resolved",
    });
  });

  it("appends existing data", async () => {
    const fetchData = Promise.resolve(["cats"]);
    const { result } = renderHook(() => useAsync());

    await act(async () => {
      await result.current.run(fetchData, ["dogs"]);
    });

    expect(result.current).toEqual({
      data: ["dogs", "cats"],
      error: null,
      run: expect.any(Function),
      status: "resolved",
    });
  });

  it("informs about error", async () => {
    const error = { message: "Something went wrong" };
    const fetchData = Promise.reject(error);
    const { result } = renderHook(() => useAsync());

    await act(async () => {
      await result.current.run(fetchData);
    });

    expect(result.current).toEqual({
      data: null,
      error,
      run: expect.any(Function),
      status: "rejected",
    });
  });
});
