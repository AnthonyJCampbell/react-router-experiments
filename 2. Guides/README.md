### Three types of components:
- Router components (BrowserRouter and HashRouter)<br>
  Generally speaking, you should use a `<BrowserRouter>` if you have a server that responds to requests and a `<HashRouter>` if you are using a static file server.

- Route matching components (Route and Switch)<br>
  When a `<Route>` does not match, it will render `null`.
  The `<Switch>` component is used to group `<Route>`s together.
  A `<Switch>` will iterate over all of its children `<Route>` elements and only render the first one that matches the current location. This helps when multiple route’s paths match the same pathname, when animating transitions between routes, and in identifying when no routes match the current location (so that you can render a “404” component).

- Navigation components (Links)<br>
You have three prop choices for how you render a component for a given `<Route>`: component, render, and children. 
    - component should be used when you have an existing component
    - render, which takes an inline function, should only be used when you have to pass in-scope variables to the component you want to render. You should **not** use the component prop with an inline function

---

The `<NavLink>` is a special type of `<Link>` that can style itself as “active” when its to prop matches the current location.
```
<NavLink to="/react" activeClassName="hurray">
```

---

Any time that you want to force navigation, you can render a `<Redirect>`. When a `<Redirect>` renders, it will navigate using its to prop.
```
<Redirect to="/login" />
```
Redirect from one place to another on `<Switch>`
```
<Redirect from="/old-match" to="/will-match" />
```

---

### Route:
- A Route is always technically “rendered” even though its rendering null. As soon as the app location matches the route’s path, your component will be rendered.
- When using `component={}`, the component will be rendered with route props. Therefore, any URL params you're inputting are accessible, as is the history. Never use inline functions for these
- To do inline rendering, use `render={() => ...}`. You can pass routeProps as a param and spread it out over the component (thereby getting access to history, match, and location), like so: 
```
render={routeProps => <Component {...routeProps}/>}
```
- `<Route component={}>` takes precedence over `<Route render={}>`
- `children` is used when you _always_ want to render something, regardless of the path, but want it to wrap other components. An example would be to have an animation going to and from every page or having a component wrapper
- Both `<Route component={}>` and `<Route render={}>` take precedence over `<Route children={}>` so don’t use more than one in the same `<Route>`.
- You can pass in an array of URLs to `path` so that multiple URLs render the component:
```
<Route path={["/users/:id", "/profile/:id"]} component={User} />
```

- You can pass `strict` which ensures that React Router looks for trailing slashes (`/home/` does not render, while `/home` does)
- You can pass sensitive to make the URL path case sensitive. Not sure why the hell you would do that outside of token/userId validation

---

### Route Props

#### Match
A match object contains information about how a `<Route path>` matched the URL. Contains: 
```
{
  params, (i.e. {id: "123456" })
  isExact, (if the entire URL was matched i.e. true/false)
  path, (the path pattern i.e. "/users/:id")
  url, (the actual URL i.e. "users/123456")
}
```
- Pathless `<Route>`s inherit their match object from their parent

#### Location
Locations represent where the app is now, where you want it to go, or even where it was. It looks like this:
```
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [clickedTheButton]: true
  }
}
```
- A location object is never mutated so you can use lifecycle hooks to determine when navigation happens
```
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)

```

#### History
Refers to the History API (also called "browser history", "hash history" or ""memory history")
- History is mutable. Therefore, you can `push('/')` and `replace('/')`
- it is recommended to access the `location` from the render props of `<Route>`, not from `history.location`. 
- `location` contains the following:
```
{
  hash, (The URL hash fragment)
  pathname, (i.e. `/dashboard')
  search, (a query string if it was present i.e. "?s=searchterm")
  state, (location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.)
}
```

---

### Route Props

#### Link
- As mentioned above, a Link can have a `to={obj}`:
```
Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```
- When adding `replace`, it'll replace the current entry in the history stack. `<Link to="/courses" replace />`

## To-Do:
- Check out React Transition Group and combine with React Router