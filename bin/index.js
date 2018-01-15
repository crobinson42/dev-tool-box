#! /usr/bin/env node

const args = require('args')
global.colors = require('colors')

args
  .command('aws-config', 'Use env vars to set ~/.aws/credentials file', () => require('../src/awsConfigure'))
  .command('release', 'Cut a release branch', () => require('../src/release'))

const flags = args.parse(process.argv)

