const core = require('@actions/core');
const Octokit = require("octokit");


async function run() {
  try {
    const githubToken = getRequiredInputValue('token')
    const octokit = new Octokit({ auth: `${githubToken}` });
    const getArtifactsForRepo =  await octokit.rest.actions.listArtifactsForRepo({
        owner: context.repo.owner,
        repo: context.repo.repo,
      });
    const artifacts = getArtifactsForRepo.data.artifacts;
    console.log('Artifact Count');
    console.log(artifacts.length);

    var size = 0;
    for (let i = 0; i < artifacts.length; i++) {
        console.log('Artifact Name');
        console.log(artifacts[i].name);
        console.log('Artifact Size');
        console.log(artifacts[i].size_in_bytes);
        size += artifacts[i].size_in_bytes / 1000000.0;
    }
    console.log('Total Size of Artifacts' + size + ' MB');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

function getRequiredInput(name) {
  return core.getInput(name, {required: true});
}
