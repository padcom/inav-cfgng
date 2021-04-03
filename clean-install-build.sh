#!/bin/sh -e

rm -rf node_modules dist
npm cache clean --force
npm install
npm run build
npm run dist
