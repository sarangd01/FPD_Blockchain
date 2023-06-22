import React , {Component} from "react";
import instance from "../ethereum/productInstance";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";
import { Form } from 'semantic-ui-react'

class AddManufacturer extends Component{


     state = {
        description : '',
        companyName : '',
        loading:false
      }
    
    
      onSubmit = async event => {
        event.preventDefault();

        this.setState({loading : true});

        console.log(web3.currentProvider.selectedAddress);
        console.log(this.state.companyName.toUpperCase());

        try{
            var acc = web3.currentProvider.selectedAddress;
            const accounts = await web3.eth.getAccounts();
            await instance.methods.addManufacturer(this.state.companyName.toUpperCase(),acc)
            .send({from : accounts[0]}); 
        }catch(err){
            console.log(err);
        }

        this.setState({loading : false});

      }


    render(){
        return(
            <Layout>
                <Form onSubmit = {this.onSubmit}>
                        <Form.Input 
                        fluid label='Company Name' 
                        placeholder='Please enter the name of company' 
                        value = {this.state.companyName}
                        onChange = {event => {
                        this.setState({companyName : event.target.value})
                        }} 
                        />
                        <Form.TextArea 
                        label='Details about the company' 
                        placeholder='Tell us more about you...' 
                        value = {this.state.description}
                        onChange = {event => {
                        this.setState({description : event.target.value})
                        }}
                        />
                       <Form.Button primary loading={this.state.loading}>
                        Submit    
                     </Form.Button>
                </Form>
            </Layout>
        );
    }
}

export default AddManufacturer;