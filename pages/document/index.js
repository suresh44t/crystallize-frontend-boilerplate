import React from 'react';
import { Query } from 'react-apollo';

import { Outer, Header } from 'ui';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

export default class DocumentPage extends React.PureComponent {
  static async getInitialProps({ asPath }) {
    return {
      namespacesRequired: ['common', 'basket', 'product'],
      asPath
    };
  }

  render() {
    const { asPath: path } = this.props;

    return (
      <Query
        variables={{ path, language: 'en' }}
        query={FETCH_TREE_NODE_AND_MENU}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Layout loading />;
          }

          const [document] = data.tree;

          if (error || !document) {
            return <Layout error />;
          }

          return (
            <Layout title={document.name}>
              <Outer>
                <Header>
                  {document.components && (
                    <ShapeComponents components={document.components} />
                  )}
                </Header>
              </Outer>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
