import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Layout from '../components/Layout';
import instance from "../ethereum/productInstance";
import RequestRow from '../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps() {
    
    const elementCount = await instance.methods.returnSize().call();

    const dataElements = await Promise.all(
      Array(parseInt(elementCount))
        .fill()
        .map((element, index) => {
          return instance.methods.elements(index).call();
        })
    );

    return { dataElements , elementCount };
  }

  renderRows() {
    return this.props.dataElements.map((dataElement, index) => {
      return (
        <RequestRow
          key={index}
          id = {index}
          dataElement = {dataElement}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>List of products and their descriptions</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Product Fingerprint</HeaderCell>
              <HeaderCell>Description</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;