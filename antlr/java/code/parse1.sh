#!/bin/bash

export CLASSPATH=".:/usr/local/lib/antlr-4.10-complete.jar:$CLASSPATH"
antlr4='java -jar /usr/local/lib/antlr-4.10-complete.jar'
grun='java org.antlr.v4.gui.TestRig'

cd ../parser/generated-code/
$grun Java compilationUnit ../../code/example1.java -tree
cd ../../code
