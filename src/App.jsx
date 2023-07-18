import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Form,
  Link,
} from "react-router-dom";

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

function SearchYourGiphy() {
  return <Layout>
    <h1>iron man</h1>
  </Layout>
}

function IronmanGiphy() {
  return <Layout>
    <h1>iron man</h1>
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
    element: <SearchYourGiphy/>
  },
  {
    path: 'iron-man',
    element: <IronmanGiphy/>
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
