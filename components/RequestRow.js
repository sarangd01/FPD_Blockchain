import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RequestRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, dataElement } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{dataElement.hashValue}</Cell>
        <Cell>{dataElement.description}</Cell>
      </Row>
    );
  }
}

export default RequestRow;