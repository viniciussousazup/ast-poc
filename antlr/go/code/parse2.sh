#!/bin/bash

export CLASSPATH=".:/usr/local/lib/antlr-4.10-complete.jar:$CLASSPATH"
antlr4='java -jar /usr/local/lib/antlr-4.10-complete.jar'
grun='java org.antlr.v4.gui.TestRig'

cd ../parser/generated-code/
$grun Go sourceFile ../../code/example2.go -tree
cd ../../code
