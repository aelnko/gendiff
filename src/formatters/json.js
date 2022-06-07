const json = (ast) => {
  return JSON.stringify(ast, null, '   ');
}

export default json;