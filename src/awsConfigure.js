/*
    This file is intended to run inside a Docker container
    and sets the aws credentials file from ENV vars that are avail
    to the Docker container
*/

const fs = require('fs')

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
let AWS_REGION = process.env.AWS_REGION

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.log(`Environment variables are not set for AWS
Expects: AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY`.red.inverse)
}

if (!AWS_REGION) {
  console.log(`Environment variable not set "AWS_REGION"
Using default "us-east-1"`.orange)
  AWS_REGION =  'us-east-1'
}

// write to /root/.aws/credentials
const credentialsFile = `
[default]
region = ${AWS_REGION}
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
`

try {
    console.log(`Creating ~/.aws directory`.green)
    fs.mkdirSync('~/.aws')
} catch (e) {
    console.log(`~/.aws already exists`.yellow)
}

console.log(`Adding awscli credentials file`.green)
fs.writeFileSync('~/.aws/credentials', credentialsFile)
