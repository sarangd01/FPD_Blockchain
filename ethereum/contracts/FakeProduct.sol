// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;
pragma experimental ABIEncoderV2;



contract FakeProduct{

    struct Data{
        string hashValue;
        string description;
    }

    //Stores the data about company name and keys of products it has added to the chain
    mapping(string => Data[]) allProductKeys;

    //To add the manufacturer's details to the blockchain
    mapping(string => string) manufacturerAddress;
    mapping(string => bool) allAddress;
    mapping(string => bool) isManufacturer;

    //For checking already existing hash values to avoid same description of products
    mapping(string => bool) hashValue;
    uint public countHash;

    //To display list of all the products on the chain
    Data[] public elements;
    

    function addData(string memory hashKey , string memory description,string memory senderAddress) public returns(bool) {
        //check only registered manufacturers add prodcut
        if(allAddress[senderAddress] == false){
            return false;
        }
        //already existing description of product is not again added 
        if(hashValue[hashKey] == true){
            return false;
        }
        hashValue[hashKey] = true;
        countHash++;
        string memory companyName = manufacturerAddress[senderAddress];
        allProductKeys[companyName].push(Data(hashKey,description));
        elements.push(Data(hashKey,description));
        return true;
    }

    function returnSize() public view returns(uint){
        return elements.length;
    }

    //check the equality of the string
    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
            bytes memory b1 = bytes(s1);
            bytes memory b2 = bytes(s2);
            uint256 l1 = b1.length;
            if (l1 != b2.length) return false;
            for (uint256 i=0; i<l1; i++) {
                if (b1[i] != b2[i]) return false;
            }
            return true;
    }

    //Check if the product exists in the company mentioned by the customer
    function findProduct(string memory companyName,string memory hashKey) public view returns(string memory,string memory){
        string memory descriptionOfProduct = "No such product exists with the mentioned company";
        if(isManufacturer[companyName]==false){
            return(
                "No such company exists",
                descriptionOfProduct
            );
        }
        Data[] memory variable = allProductKeys[companyName];
        for(uint i=0;i<variable.length;i++){
            if(stringsEquals(variable[i].hashValue,hashKey)){
                descriptionOfProduct = variable[i].description;
                break;
            }
        }
        return (
            companyName,
            descriptionOfProduct
        );
    }

    //Something to debug
    function findInMapping(string memory index) public view returns(string memory){
        return manufacturerAddress[index];
    }

    //Add manufacturer to the chain
    function addManufacturer(string memory companyName , string memory senderAddress) public {
        manufacturerAddress[senderAddress] = companyName;
        allAddress[senderAddress] = true;
        isManufacturer[companyName] = true;
    }

}


