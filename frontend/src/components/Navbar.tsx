//export default function Navbar() {

    /*render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link href="/" className="navbar-brand">ExcerTracker</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link href="/" className="nav-link">Exercises</Link>
            </li>
            <li className="navbar-item">
            <Link href="/create" className="nav-link">Create Exercise Log</Link>
            </li>
            <li className="navbar-item">
            <Link href="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
  }*/

export default function Navbar() {
  return <>
    <nav className="bg-gray-800">      
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
              <a href="/" className="bg-gray-900 text-white rounded-md px-2 py-2 text-sm font-medium" aria-current="page">Amazon Reviews Sentiment Analysis Demo</a>
            </div>
          </div>
        </div>
      </div>
      </nav>
    </>;
}

{/*
  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
*/}