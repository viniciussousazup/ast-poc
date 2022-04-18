#!/bin/bash

export CLASSPATH=".:/usr/local/lib/antlr-4.10-complete.jar:$CLASSPATH"
antlr4='java -jar /usr/local/lib/antlr-4.10-complete.jar'
$antlr4 Java*.g4 -o generated-code
cd generated-code
javac Java*.java
cd ..