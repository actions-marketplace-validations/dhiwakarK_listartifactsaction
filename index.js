const core = require('@actions/core');
const { Octokit } = require("octokit");


async function run() {
  try {
    const githubToken = getRequiredInput('token');
    const owner = getRequiredInput('owner');
    const repo = getRequiredInput('repo');

      } catch (error) {
    core.setFailed(error.message);
  }
}

run();

function getRequiredInput(name) {
  return core.getInput(name, {required: true});
}
