import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../views/Home'
import Testing from '../views/Testing'
import Trash from '../views/Trash'

const App = props => (
  <div>
    <Route exact path='/' component={Home} />
    <Route path='/testing' component={Testing} />
    <Route path='/trash' component={Trash} />
  </div>
)

export default App
