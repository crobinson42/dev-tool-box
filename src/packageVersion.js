/*
*   cli git command to cut a release branch off the current branch
*   expects the current working tree to be clean and on `develop`
*   also uses the package.json version as the release branch number
*/

const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const Git = require('git-command-line')
const inquirer = require('inquirer')

if (!global.colors)
  global.colors = require('colors')

const PROJECT_ROOT_DIR = path.dirname('../')

console.log(``.padStart(pkg.name.length + 12, '*').bgBlue)
console.log(`   Project: ${pkg.name}`.inverse)

// todo: add check that working tree is clean
// todo: check and warn if not on develop branch

const git = new Git(PROJECT_ROOT_DIR)

const questions = [
  {
    type: 'input',
    name: 'version',
    message: 'Release version:',
    default: pkg.version,
  },
  {
    type: 'confirm',
    name: 'push_branch',
    message: "Do you want to push this branch now to trigger a build?",
    default: true,
  },
];

inquirer.prompt(questions).then(answers => {
  const releaseBranch = `release/${answers.version}`

  console.log(`Cutting release branch: ${releaseBranch}`.green)

  git.checkout(`-b ${releaseBranch}`)
      .catch(function(err) {
        console.log(`ERROR CREATING NEW BRANCH:`.red, err)
      })
      .then(() => {
          if (answers.push_branch)
            return git.push(`-f -u origin ${releaseBranch}`)
      })
      .catch(function(err) {
          console.log(`ERROR PUSHING BRANCH TO REMOTE:`.red, err)
      })
      .then(() => {
        console.log('Release branch cut complete'.green)

        if (answers.push_branch)
          console.log('The build is in process in Bitbucket Pipelines'.green)
      })

})