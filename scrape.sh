#!/bin/bash

wget -r -A gif 'http://cultofthepartyparrot.com/parrots/'
rm -rf parrots
mv cultofthepartyparrot.com/parrots/ .
rm -rf cultofthepartyparrot.com
for p in $(find parrots/ -name '*gif'); do
    convert -coalesce "$p" "$p.%03d.png"
    n=$(ls -1 $p.* | wc -l)
    echo "'$p': $n,"
done
