import React, { Fragment } from 'react';

import Header from '../Header/Header';
import Images from '../../containers/Images';

class IndexPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Images />
      </Fragment>
    );
  }
}

export default IndexPage;
