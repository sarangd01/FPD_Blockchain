import React from 'react';
import QrScanner from 'qr-scanner';
import Layout from '../components/Layout';
import instance from "../ethereum/productInstance";
import { Form ,  Input } from 'semantic-ui-react';


class App extends React.Component {
    
    state = {
      result: '',
      returnedComppanyName:'',
      description : '',
      companyName : '',
      loading: false
    };


  onhandleInputChange = async event =>{
    const file = event.target.files[0];
    const decoded =  await QrScanner.scanImage(file);
    this.setState({result : decoded})
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({loading : true});

    try{
      const productDescription = await instance.methods.findProduct(this.state.companyName.toUpperCase(),this.state.result).call();
      console.log(productDescription[0]);
      console.log(productDescription[1]);
      this.setState({description : productDescription[1]});
      this.setState({returnedComppanyName : productDescription[0]});
    }catch(err){
      console.log(err);
    }

    this.setState({loading : false});
  }


  render() {
    return (
      <Layout>
        <h1>Upload QR Code</h1>
        <Form onSubmit = {this.onSubmit}>
            <Form.Input 
            fluid label='Company Name' 
            placeholder='Please enter the name of company' 
            value = {this.state.companyName}
            onChange = {event => {
              this.setState({companyName : event.target.value})
            }} 
            />
            <Form.Input
            type = "file"
            accept = "image/*" 
            onChange = {this.onhandleInputChange}
            />
            <Form.Button primary loading={this.state.loading}>
                        Submit    
              </Form.Button> 
         </Form>
         <h3>{this.state.returnedComppanyName}</h3>
         <h3>{this.state.description}</h3>
     </Layout>
    );
  }
}

export default App;




