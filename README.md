# tool-box

https://www.npmjs.com/package/repo-tools

## Use

To be installed as a global package and used in command line operations
as utility and helper functions in projects.

See the `bin/index.js` file for the CLI flags/options available to run
specific files in this project.

### Example Command Line Use:

Run the `src/awsConfigure.js` file:
```
repo-tools aws-config
```

## Commands

### aws-config
```
repo-tools aws-config
```
This is a helper function that is used in our Docker image containers
for Bitbucket Pipelines builds. It uses the environment variables
passed to the build environment to set the Docker containers AWS
credentials so that the build can interface and perform operations with
our AWS services. It sets access key and secret for AWS in
"~/.aws/credentials". It expects the environment variables to be set
and available: `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`.

### release
```
repo-tools release
```
A command line util that performs steps to cut a release branch
from the current branch and push to origin. Provides CLI question
interface prior to performing the operation.

## Changes & Publishing

Any logic, utility functions, or operations that can be applied to
more than a single project should reside in this package. An example
would be a helper function that parses the git logs in a repo and
generates a CHANGELOG.md automatically. This would be a helper function
that resides in this package to be shared and used by anyone on the team
or in automation process environments ie: Bitbucket Pipelines. Another
example of utility and helper functions that are in this package are
logic needed across Docker containers, specifically our Pipelines
images use some utility functions (awsConfigure.js).

Any changes that affect this repositories use need to be documented in
the README.md under the correct scope.

### Git Commit Convention

This project uses `generate-changelog` which parses the git log
automatically and appends the release version changes to CHANGELOG.md
based on the git commit log. Because of this, our commits in this
project repo need to follow a convention.

type(category)

Example: `chore(package.json): update deps`

Where **type** is one of the following:

- breaking
- build
- ci
- chore
- docs
- feat
- fix
- other
- perf
- refactor
- revert
- style
- test

### Publishing NPM Package

When you're ready to publish a new package version and all your
changes are committed run the command `npm run release:publish`