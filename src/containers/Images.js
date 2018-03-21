import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import modernEnvironment from './../module/relay/environment';
import Image from '../components/Image';
import isEmpty from 'lodash/isEmpty';

class Images extends Component {
  render() {
    return (
      <div>
        <QueryRenderer
          environment={modernEnvironment}
          query={graphql`
            query ImagesQuery {
              viewer {
                allImages {
                  edges {
                    node {
                      ...Image_image
                    }
                  }
                }
              }
            }
          `}
          variables={{}}
          render={({ error, props }) => {
            if (props) {
              const { edges } = props.viewer.allImages;
              // Они возвращают не массив с null ...
              if (isEmpty(edges) || edges[0] === null) {
                return <div>Нет изображений.</div>;
              }

              return props.viewer.allEvents.edges.map(item => {
                return <Image key={item.node.id} image={item.node} />;
              });
            }

            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

export default Images;
