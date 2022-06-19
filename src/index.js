const { request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {

    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found" });
    };
    
    request.customer = customer;

    return next();

};


app.use(express.json());

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    const id = uuidv4();

    if (customerAlreadyExists) {

        return response.status(400).json({ error: "Customer already exists" });
    }

    customers.push({
        cpf,
        name,
        id,
        statement: []
    });

    console.log(customers);

    return response.status(201).send();

});

//app.use(verifyIfExistsAccountCPF);


app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {

    const { customer } = request;

    return response.json(customer.statement);

});


app.listen(3333);