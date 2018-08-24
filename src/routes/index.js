import React from 'react'
import Universal from 'react-universal-component'
import { Switch } from 'react-router'
import { Route, Link } from 'react-router-dom'

const UniversalComponent = Universal(props => {
  return import(`../components/${props.page}`)
})

export default () => (
  <div>
    <div>
      <Link to="/">Counter</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
    <Switch>
      <Route exact path='/'>
        <UniversalComponent page='counter' />
      </Route>
      <Route path='/about'>
        <UniversalComponent page='about' />
      </Route>
      <Route path='/contact'>
        <UniversalComponent page='contact' />
      </Route>
    </Switch>
  </div>
)