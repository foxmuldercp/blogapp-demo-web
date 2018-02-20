import React from 'react'
import {hydrate} from 'react-dom'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<App />, document.getElementById('app'))
})
