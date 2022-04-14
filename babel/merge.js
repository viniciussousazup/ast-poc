const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('babel-types');
const fs = require('fs')

function merge_list(ast, ast2) {

  let element_to_add = ast2.map(element2 => {
    let element = ast.find(element => equal(element, element2))
    if (element) {
      merge(element, element2)
      return null
    } else {
      return element2
    }
  });
  element_to_add = element_to_add.filter(e => e != null)

  ast.push(...element_to_add)
}

function equal(ast, ast2) {
  if (ast.type != ast2.type) {
    return false
  }
  if (ast.type == "FunctionDeclaration") {
    return ast.id.name == ast2.id.name
  }
  if (ast.type == "ExportNamedDeclaration") {
    return ast.declaration.id.name == ast2.declaration.id.name
  }
  if (ast.type == "ClassMethod") {
    return ast.key.name == ast2.key.name
  }
  if (ast.type == "BlockStatement") {
    return true
  }
  if (ast.type == "ExpressionStatement") {
    return equal(ast.expression, ast2.expression)
  }
  if (ast.type == "CallExpression") {
    return equal(ast.callee, ast2.callee)
  }
  if (ast.type == "Super"){
    return true
  }
  let x = generate(ast, { comments:false}, "");
  let y = generate(ast2, { comments:false }, "");
  return x.code == y.code;
}

function merge(ast, ast2) {
  console.log("type:", ast.type)
  if (ast.type != ast2.type) {
    return
  }
  if (ast.type == "File") {
    merge_list(ast.program.body, ast2.program.body)
    return
  }

  if (ast.type == "ExportNamedDeclaration") {
    merge(ast.declaration, ast2.declaration)
    return
  }
  if (ast.type == "ClassDeclaration") {
    merge_list(ast.body.body, ast2.body.body)
    return
  }
  if (ast.type == "ExpressionStatement") {
    merge(ast.expression, ast2.expression)
    return
  }
  if (ast.type == "CallExpression") {
    merge(ast.callee, ast2.callee)
    merge_list(ast.arguments, ast2.arguments)
    return
  }
  if (ast.type == "NewExpression") {
    merge(ast.callee, ast2.callee)
    merge_list(ast.arguments, ast2.arguments)
    return
  }
  if (ast.type == "ClassMethod") {
    merge_list(ast.body.body, ast2.body.body)
    return
  }

}


const code = fs.readFileSync("./sample-service-stack-scaffold.ts").toString();
const code2 = fs.readFileSync("./sample-service-stack-plugin.ts").toString();

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: [
    'typescript',
  ]
});
const ast2 = parser.parse(code2, {
  sourceType: 'module',
  plugins: [
    'typescript',
  ]
});
let ast_result = ast
merge(ast, ast2);

const new_code = generate(ast_result, { /* Options */ }, code);
console.log("new_code:")
console.log(new_code.code)

fs.writeFileSync("result.ts", new_code.code)