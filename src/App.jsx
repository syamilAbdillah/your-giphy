import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Form,
  useLoaderData,
  Link,
} from "react-router-dom";
import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)

function Navbar() {
  return <nav className="navbar bg-base-200">
    <div className="navbar-start"></div>
    <div className="navbar-center">
      <ul className="menu menu-horizontal px-1 gap-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/iron-man">Iron man</Link>
        </li>
      </ul>
    </div>
    <div className="navbar-end"></div>
  </nav>
}

function Spinner() {
  return <div className="flex items-center justify-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
}

function ErrorAlert({ message }) {
  return <div className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{ message }</span>
</div>
}

function SearchIcon() {
  return <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.3-4.3" />
    </svg>
}

function GifList({ gifs }) {

  return <div className="mx-auto max-w-screen-md columns-2 md:columns-3 gap-4">
    {gifs.map(gif => (
      <GifItem key={gif.slug} gif={gif} />
    ))}
  </div>
}

function GifItem({ gif }) {
  return <figure className="rounded-md border border-base-300 overflow-hidden mb-4">
    <video src={gif.images.looping.mp4} />
  </figure>
}

function SearchBar({ onChange = () => {} }) {
  return <Form method="get" className="join w-full">
    <input 
      type="text"
      name="query" 
      className="input input-bordered w-full join-item" 
      placeholder="search..." 
    />
    <button type="submit" className="btn btn-square join-item">
      <SearchIcon/>
    </button>
  </Form>
}

function getSearchParams(req) {
  const url = new URL(req.url)
  return url.searchParams
}

function searchLoader({ request }) {
  const sp = getSearchParams(request)
  if(sp.has('query')) {
    return gf.search(sp.get('query'), {limit: 9, type: 'gifs'})
  } else {
    return gf.trending({ limit: 9, type: 'gifs' })
  }
}

function SearchYourGiphy() {
  const resp = useLoaderData()
  return <Layout>
    <h1 className="text-4xl text-center font-bold mb-6">Search</h1>
    <div className="mx-auto w-full max-w-lg mb-6">
      <SearchBar/>
    </div>
    <GifList gifs={resp.data} />
  </Layout>
}

const ironmanLoader = () => gf.search('iron-man', { limit: 9, type:'gifs' })

function IronmanGiphy() {
  const resp = useLoaderData()

  return <Layout>
    <h1 className="text-4xl text-center font-bold mb-6">Iron Man</h1>
    <GifList gifs={resp.data} />
  </Layout>
}

function Index() {
  return <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h3 className="text-3xl">Welcome to your Giphy</h3>
      <h1 className="text-5xl font-bold py-10">Giphy</h1>
      <div className="space-y-2">
        <Link className="btn btn-outline btn-wide btn-primary" to="/search">Search your Giphy</Link>
        <Link className="btn btn-outline btn-wide btn-secondary" to="/iron-man">Iron man Giphy</Link>
      </div>
    </div>
  </div>
</div>
}

function Layout({ children }) {
  return <div className="min-h-screen bg-base-100">
    <Navbar/>
    <main className="container py-8 px-4 mx-auto">
      {children}
    </main>
  </div>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: 'search',
    loader: searchLoader,
    element: <SearchYourGiphy/>
  },
  {
    path: 'iron-man',
    loader: ironmanLoader,
    element: <IronmanGiphy/>
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
