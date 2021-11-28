export const getContractActions = (abi) => {
  let calls = []
  let sends = []

  return new Promise(function (resolve, reject) {
    const abiObject = JSON.parse(abi)

    const methods = []

    abiObject.forEach((method, i) => {

      methods.push(method)
      if (method.stateMutability === 'view') {
        var methodInputs = []
        var methodOutputs = []

        method.inputs.forEach((input, j) => {
          methodInputs.push(
            {
              name: method.name,
              key: j,
              label: input.name,
              placeholder: input.type,
            }
          )
        })

        method.outputs.forEach((output, j) => {
          methodOutputs.push(
            {
              key: j,
              name: output.name || '(unnamed)',
              type: output.type || '',
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

        method.inputs.forEach((input, j) => {
          formInputs.push(
            {
              name: method.name,
              key: j,
              label: input.name,
              placeholder: input.type,
              payable: method.payable
            }
          )
        })

        sends.push(
          {
            name: method.name,
            inputs: formInputs
          }
        )
      }
    })

    if(calls.length === 0 && sends.length === 0) {
      reject('No actions present')
    }

    const contractActions = {
      calls: calls,
      sends: sends
    }

    resolve(contractActions)
  })
}