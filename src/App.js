import React from 'react';

import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact render={() => (
        <div>
          --- WELCOME ---
          <Link to="/2">Go to Page 2</Link>
        </div>
      )} />
      
      <Route path="/2" render={() => (
        <div>
          --- PAGE 2 ---
        </div>
      )} />

      <Route path="/test" render={() => (
        <div>
          --- test ---
        </div>
      )} />
      
    </Router>
  );
}

export default App;
