#!/bin/bash

export CLASSPATH=".:/usr/local/lib/antlr-4.10-complete.jar:$CLASSPATH"
antlr4='java -jar /usr/local/lib/antlr-4.10-complete.jar'
$antlr4 Go*.g4 -o generated-code
cp GoParserBase.java generated-code
cd generated-code
javac Go*.java
cd ..