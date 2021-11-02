import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import localforage from "localforage"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import App from "../components/App"

jest.mock("localforage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

/**
 * Missing parts from testing:
 * - UI testing on Favourites functionality,
 * - UI testing on Load more functionality in images page,
 * - Unit testing on functions in "util/async.js" functions.
 */

describe("Checks app navigation", () => {  
  it("Checks the images are displayed on the home page", async () => {
    const history = createMemoryHistory()
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    // Check the page title has the correct text 
    // (Images for homepage).
    expect(
      screen.getByTestId("page-title").textContent
    ).toEqual("Images")
  })

  it("Checks 'breeds' url exists and has correct content", async () => {
    const history = createMemoryHistory()
    history.push("/breeds")
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    // Check the page title has the correct text 
    // (Breeds for /breeds page).
    expect(
      screen.getByTestId("page-title").textContent
    ).toEqual("Breeds")
  })

  it("Checks 'favourites' url exists and has correct content", async () => {
    const history = createMemoryHistory()
    history.push("/favourites")
    
    act( () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    // Check the page title has the correct text 
    // (Favourites for /favourites page).
    expect(
      screen.getByTestId("page-title").textContent
    ).toEqual("Favourites")
  })
})

describe("Check Images page", () => {
  jest.mock("axios")
  jest.mock("localforage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
  }))

  it("Verify that the images are requested and rendered in the page", async () => {
    // Mock the API response for images.
    const imagesResponse = [
      { id: "ol", url: "https://cdn2.thecatapi.com/images/ol.jpg" },
      { id: "2tb", url: "https://cdn2.thecatapi.com/images/2tb.jpg" },
    ]
    axios.get = jest.fn().mockResolvedValue({ data: imagesResponse })

    const history = createMemoryHistory()
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    expect(screen.getByTestId("list")).toBeInTheDocument()
    expect(screen.getAllByTestId("list-item").length).toEqual(2)
  })

  it("Verify that the stored images are rendered in the page and no request is send", async () => {
    // Mock the localstorage get response for images.
    localforage.getItem = jest.fn()
    .mockReturnValueOnce({
      "ol": { id: "ol", url: "https://cdn2.thecatapi.com/images/ol.jpg" },
      "2tb": { id: "2tb", url: "https://cdn2.thecatapi.com/images/2tb.jpg" },
    })
    .mockReturnValue(1)
    axios.get = jest.fn()

    const history = createMemoryHistory()
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    expect(screen.getByTestId("list")).toBeInTheDocument()
    expect(screen.getAllByTestId("list-item").length).toEqual(2)
    expect(axios.get).not.toHaveBeenCalled()
  })

  it("Verify the modal opens when an image is clicked", async () => {
    // Mock the API response for images.
    const imagesResponse = [
      { id: "ol", url: "https://cdn2.thecatapi.com/images/ol.jpg" },
    ]
    axios.get = jest.fn().mockResolvedValue({ data: imagesResponse })

    const history = createMemoryHistory({ initialEntries: ['/'] })
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    
    userEvent.click(screen.getByTestId("list-item").firstChild)
    expect(history.location.pathname).toEqual("/image/ol")
    expect(await screen.findByTestId("modal")).toBeInTheDocument()
  })
})

describe("Check Breeds page", () => {
  jest.mock("axios")
  jest.mock("localforage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
  }))

  it("Verify that the images are requested and rendered in the page", async () => {
    // Mock the API response for images.
    const breedsResponse = [
      { id: "abob", name: "American Bobtail" },
      { id: "abys", name: "Abyssinian" },
    ]
    axios.get = jest.fn().mockResolvedValue({ data: breedsResponse })

    const history = createMemoryHistory()
    history.push("/breeds")
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    expect(screen.getByTestId("list")).toBeInTheDocument()
    expect(screen.getByText(/American Bobtail/i)).toBeInTheDocument()
    expect(screen.getByText(/Abyssinian/i)).toBeInTheDocument()
  })

  it("Verify that the stored images are rendered in the page and no request is send", async () => {
    // Mock the localstorage get response for images.
    localforage.getItem = jest.fn()
    .mockReturnValueOnce({
      "abob": { id: "abob", name: "American Bobtail" },
      "abys": { id: "abys", name: "Abyssinian" },
    })
    .mockReturnValue(1)
    axios.get = jest.fn()

    const history = createMemoryHistory()
    history.push("/breeds")
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })

    expect(screen.getByTestId("list")).toBeInTheDocument()
    expect(screen.getByText(/American Bobtail/i)).toBeInTheDocument()
    expect(screen.getByText(/Abyssinian/i)).toBeInTheDocument()
    expect(axios.get).not.toHaveBeenCalled()
  })

  it("Verify the modal opens when a breed is clicked", async () => {
    // Mock the API response for images.
    const breedsResponse = [
      { id: "abob", name: "American Bobtail" },
    ]
    axios.get = jest.fn().mockResolvedValue({ data: breedsResponse })

    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push("/breeds")
    await act(async () => {
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    })
    
    userEvent.click(screen.getByTestId("list-item").firstChild)
    expect(history.location.pathname).toEqual("/breed/abob")
    expect(await screen.findByTestId("modal")).toBeInTheDocument()
  })
})