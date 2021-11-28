export const deconstructAbi = (abi) => {
  
  return new Promise(function (resolve, reject) {
    const methods = []
    const calls = []
    const sends = []
    const events = []

    const abiObject = JSON.parse(abi)

    abiObject.forEach((method) => {
      methods.push(method)

      if (method.stateMutability === 'view') {
        const methodInputs = []
        const methodOutputs = []

        method.inputs.forEach((input) => {
          methodInputs.push(
            {
              name: input.name,
              type: input.type,
            }
          )
        })

        method.outputs.forEach((output) => {
          methodOutputs.push(
            {
              name: output.name,
              type: output.type,
            }
          )
        })

        calls.push(
          {
            name: method.name,
            inputs: methodInputs,
            outputs: methodOutputs
          }
        )
      } else if(method.stateMutability !== 'view' && method.type === 'function') {
        const formInputs = []
        const payable = method.stateMutability === 'payable'

        method.inputs.forEach((input) => {
          formInputs.push(
            {
              name: input.name,
              type: input.type
            }
          )
        })

        sends.push(
          {
            name: method.name,
            inputs: formInputs,
            payable: payable,
          }
        )
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
    }

    resolve(contractActions)
  })
}