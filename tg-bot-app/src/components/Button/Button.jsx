import React from 'react';
import './button.css';

const Button = (props) => {
  return (
    <div>
      <buton {...props} className={'Button' + props.className}/>
    </div>
  )
}

export default Button
