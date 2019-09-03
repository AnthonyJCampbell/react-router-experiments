import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        {/* 
          To add a catch-all for when no routes match the current location (i.e. a 404 component), we'll need a switch
          A Switch iterates over all its children and will return the first matching path
        */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          {/* Whenever none of the above match, it'll return this. It could also be a component like <CatchAll/> */}
          <Route render={() => <div>ZOINKS!</div>} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function CatchAll() {
  return <h2>WHOOPS</h2>;
}


// NESTED ROUTING
// `/topics` loads <Topics> which then further conditionally renders any Routes that might be in place on that particular component, based on the paths `:id` value
function Topic({ match }) {
  console.log(`This is the match as part of a single <Topic>: `, match)
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  // match is an object that passes on some info through the Link from Router
  // It looks like this:
  // {
  //   isExact: false,
  //   params: {},
  //   path: "/topics",
  //   url: "/topics",
  // }

  console.log(`This is the match as part of <Topics>: `, match)
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* 
        Here, we declare that when we go to `topics` / `:somevalue`, it should create a link that loads Topic 
        In this case, `:id` is our declared param name, but could be named anything. It will show up in the match of <Topic> as:
        params: {id: "PARAMSNAME"}
      */}
      <Route path={`${match.path}/:id`} component={Topic} />
      {/* 
        Essentially, this is a conditional rendering of the <h3>, since it only shows up when the URL is just `/topic` 
        This is evident by the attribute of `path={match.path}`
      */}
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;