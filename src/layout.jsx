import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apollo Subscriptions</h1>

        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/subscriptions-wslink">
                Subscriptions (GraphQLWsLink)
              </Link>
            </li>
          </ul>
        </nav> */}
      </header>
      <div className="Grid-column">
        <Outlet />
      </div>
    </div>
  );
}
