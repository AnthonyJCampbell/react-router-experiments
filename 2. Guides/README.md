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


## To-Do:
- Check out React Transition Group and combine with React Router