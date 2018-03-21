import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

const Image = (props) => {
  const { image } = props;

  return (
    <div>
      <h3>Image</h3>
      id = {image.id}<br/>
      title = {image.title}<br/>
      description = {image.description}<br/>
    </div>
  );
};

Image.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default createFragmentContainer(Image, {
  image: graphql`
      fragment Image_image on Image {
          id
          description
          title
      }
  `,
});
