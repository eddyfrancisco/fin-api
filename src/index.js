const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const customers = [];

app.listen(3333);

app.use(express.json());

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    const id = uuidv4();

    if(customerAlreadyExists){

        return response.status(400).json({ error: "Customer already exists"});
    }

    customers.push({
        cpf, 
        name, 
        id, 
        statement: []
    });

    console.log(customers);

    return response.status(201).send();

})