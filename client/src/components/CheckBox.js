import React from 'react'
import { Checkbox } from 'antd'

export class CheckBox extends React.Component {
  onChange (e) {}

  render () {
    return <Checkbox onChange={event => console.log(event)} />
  }
}

export default CheckBox
