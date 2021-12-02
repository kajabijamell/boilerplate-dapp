import React from 'react';
import {
  Form,
  Segment,
  Header,
  Icon,
  Button
} from 'semantic-ui-react';

export const  deconstructAbi = (abi) => {
  
  return new Promise(function (resolve, reject) {
    const methods = []
    const calls = []
    const sends = []
    const events = []
    const forms = []

    const abiObject = JSON.parse(abi)

    abiObject.forEach((method, i) => {
      methods.push(method)

      if (method.stateMutability === 'view') {
        const methodInputs = []
        const methodOutputs = []

        method.inputs.forEach((input, j) => {
          methodInputs.push(
            <Form.Input
              name={method.name}
              inputindex={j}
              key={j}
              inline
              label={input.name}
              placeholder={input.type}
            />
          )
        })

        method.outputs.forEach((output, j) => {
          methodOutputs.push(
            <p key={j}>
              {`${output.name || '(unnamed)'}
            ${output.type}: ''`}
            </p>
          )
        })

        calls.push(
          {
            name: method.name,
            inputs: methodInputs,
            outputs: methodOutputs
          }
        )

        forms.push(
          <Segment textAlign="left" key={i}>
            <Header textAlign="center">
              {method.name}
              <Header.Subheader>View</Header.Subheader>
            </Header>
            <Form
              name={method.name}
              key={i}
            >
              <Button floated="right" icon>
                <Icon name="refresh" />
              </Button>
              {methodInputs}
              {methodOutputs}
            </Form>
          </Segment>
        );

      } else if(method.stateMutability !== 'view' && method.type === 'function') {
        const formInputs = []
        const payable = method.stateMutability === 'payable'

        method.inputs.forEach((input, j) => {
          formInputs.push(
            <Form.Input
              required
              name={method.name}
              key={j}
              inputindex={j}
              inline
              label={input.name}
              placeholder={input.type}
            />
          )
        })

        sends.push(
          {
            name: method.name,
            inputs: formInputs,
            payable: payable,
          }
        )

        forms.push(
          // Make a form, even when there are no inputs
          <Segment textAlign="left" key={i}>
            <Header textAlign="center">
              {method.name}
            </Header>
            <Form
              // onSubmit={this.handleSubmitSend}
              name={method.name}
              key={i}
            >
              {formInputs}
              <Form.Button color="blue" content="Submit" />
            </Form>
          </Segment>
        );
      } else if(method.type === 'event') {
        events.push(
          {
            name: method.name
          }
        )
      }
    })
    
    if(calls.length === 0 && sends.length === 0) {
      reject('No actions present')
    }

    const contractActions = {
      all: methods,  
      calls: calls,
      sends: sends,
      events: events,
      forms: forms
    }

    resolve(contractActions)
  })
}