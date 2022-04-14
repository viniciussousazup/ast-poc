const babylon = require('@babel/parser');
const generate = require('@babel/generator').default;
const fs = require('fs')
const traverse = require('babel-traverse').default;
const t = require('babel-types');

function main() {
    const source = fs.readFileSync("./shared-resources-stack.ts").toString();
    console.log("source:", source)
    const ast = babylon.parse(source, {
        sourceType: 'module',
        plugins: [
            'typescript' ,
        ]
    });

    console.log("ast:")
    console.log(ast)

    // Checks whether the node or it's parent is an ImportDeclaration or an ImportSpecifier
    const isImportDeclaration = path => (
        t.isImportDeclaration(path.node) ||
        t.isImportSpecifier(path.parent) ||
        t.isImportDeclaration(path.parent) ||
        t.isImportSpecifier(path.parent) ||
        t.isImportDefaultSpecifier(path.parent)
    );
    console.log("isImportDeclaration", isImportDeclaration)

    // Remember the last ImportDeclaration node
    let lastImport = null;
    let lastProperty = null;

    // Create a new import declaration. You can also create a factory function for that.
    const declaration = t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(`myLib`))], // This is the imported name
        t.stringLiteral(`./myLib/class.js`), // This is the path to the source
    );

    console.log("declaration", declaration)

    traverse(ast, {
        enter(path) {
            // console.log("path:", path)
            if (lastImport && !isImportDeclaration(path)) {
                lastImport.insertAfter(declaration);
                lastImport = null
            }
        },
        ImportDeclaration(path) {
            lastImport = path;
        }
    })

    // Generate actually source code from modified AST
    const { code } = generate(ast, { /* Options */ }, source);
    console.log("code:")
    console.log(code)

}
main()