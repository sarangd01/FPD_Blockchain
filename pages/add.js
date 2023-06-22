import React , {Component} from "react";
import instance from "../ethereum/productInstance";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";
import { Form , Message } from 'semantic-ui-react'
import QRImage from "react-qr-image";
import {saveAs} from "file-saver";


class AddProduct extends Component{
    state = {
        description : '',
        loading : false,
        errorMessage : ''
    }


    onSubmit = async event => {
        event.preventDefault();

        this.setState({loading : true});

        try{
            const accounts = await web3.eth.getAccounts();
            var acc = web3.currentProvider.selectedAddress; 
            await instance.methods.addData(web3.utils.soliditySha3(this.state.description),this.state.description,acc)
            .send({from : accounts[0] , gas : "1000000"});  
        }catch (err){
            console.log(err);
        }

        this.setState({loading : false});


    }


    onClick = async =>{
        // var acc = web3.currentProvider.selectedAddress;
        // console.log(typeof(acc));
        const qrCodeImage = document.querySelector('.qr-code-img');
        fetch(qrCodeImage.src)
          .then(response => response.blob())
          .then(blob => {
            saveAs(blob, 'qr-code.png');
          });
    }

    render(){
        return(
            <Layout>
                <h1>Add Product to Blockchain!</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.TextArea 
                        label='About' 
                        placeholder='Add description of your product...' 
                        value = {this.state.description}
                        onChange = {event => {
                        this.setState({description : event.target.value})
                        }}
                     />
                     <Message error header="Oops!" content={this.state.errorMessage} />
                     <Form.Button primary loading={this.state.loading}>
                        Submit    
                     </Form.Button>
                </Form>
                <h1>Hash value of your product</h1>
                <h4>{(web3.utils.soliditySha3(this.state.description))}</h4>
                <QRImage className = "qr-code-img" onClick = {this.onClick}>{(web3.utils.soliditySha3(this.state.description))}</QRImage>
            </Layout>
        )
    }
}

export default AddProduct;