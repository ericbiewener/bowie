import {exec} from 'child_process'


export const dialog = {
  emit: (...args) => {
  	exec(`osascript -e "display dialog \\"${args.join('\n\n')}\\""`)
  },
  getLineAndColumnString: error => (
  	error.loc && `Line: ${error.loc.line}    Column: ${error.loc.column}`
  )
}