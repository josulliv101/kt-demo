import React from 'react';
import Relay from 'react-relay';
import {BasicCard} from '../cards/CardTypes';

class Faq extends React.Component {

  render() {
    return (
      <BasicCard>
        <div className="docs-content">
          <h1 className="m-t-0">FAQ</h1>
          <p>Each theme is designed as it’s own toolkit—a series of well designed, intuitive, and cohesive components—built on top of Bootstrap. If you’ve used Bootstrap itself, you’ll find this all super familiar, but with new aesthetics, new components, beautiful and extensive examples, and easy-to-use build tools and documentation.</p>
        </div>
      </BasicCard>
    )
  }
}

export default Faq