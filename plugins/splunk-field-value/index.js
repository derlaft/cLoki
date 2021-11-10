const { PluginLoaderBase } = require('plugnplay')

module.exports = class extends PluginLoaderBase {
  exportSync () {
    return {
      bnf: 'MACRO_splunk_field_value ::= <log_stream_selector> <OWSP> "| search" <OWSP> <label> "=" <quoted_str> <OWSP> ["OR" <OWSP> <label> "=" <quoted_str> ]',
      /**
      *
      * @param token {Token}
      * @returns {string}
      */
      stringify: (token) => {
        console.log(`Label array length ${token.Children('label').length}`)
        console.log(`Label array ${token.Children('label')}`)
        if (token.Children('label').length >= 1) {
          console.log(`Query: ${token.Children('log_stream_selector')[0].value} | json | ${token.Children('label')[1].value}=~${token.Children('quoted_str')[1].value}`)
          return `${token.Children('log_stream_selector')[0].value} | json | ${token.Children('label')[1].value}=~${token.Children('quoted_str')[1].value}`
        } else if (token.Children('label').length > 2) {
          console.log(`Query: ${token.Children('log_stream_selector')[0].value} | json | ${token.Children('label')[1].value}=~${token.Children('quoted_str')[1].value} or ${token.Children('label')[2].value}=~${token.Children('quoted_str')[2].value}`)
          return `${token.Children('log_stream_selector')[0].value} | json | ${token.Children('label')[1].value}=~${token.Children('quoted_str')[1].value} or ${token.Children('label')[2].value}=~${token.Children('quoted_str')[2].value} `
        }
      }
    }
  }
}