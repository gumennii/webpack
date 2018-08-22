import React from "react"
import { Route, Link } from "react-router-dom"
import universal from "react-universal-component"
import { Switch } from "react-router"
import "../nav.css"

const UniversalComponent = universal(props => import(`../components/${props.page}`))

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page="counter" />
      </Route>
      <Route path="/about">
        <UniversalComponent page="counter" />
      </Route>
      <Route path="/article">
        <UniversalComponent page="counter" />
      </Route>
    </Switch>
  </div>
)