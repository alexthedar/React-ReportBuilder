import uuid from 'node-uuid';
import React from 'react';
import List from './List.jsx';

export default class Displaybox extends React.Component {
  render() {

const data = [
  {
    id: uuid.v4(),
    thing: "thing1"
  },
  {
    id: uuid.v4(),
    thing: "thing2"
  },
  {
    id: uuid.v4(),
    thing: "thing3"
  },
  {
    id: uuid.v4(),
    thing: "thing4"
  },
]

    return (
      <div>
        <ul>{data.map(d =>
          <li key={d.id}>{d.thing}</li>)}
        </ul>
      </div>
    );
  }
}
