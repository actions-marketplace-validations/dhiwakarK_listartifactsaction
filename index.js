const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const since = core.getInput('since')
      , days = core.getInput('activity_days')
      , token = getRequiredInput('token')
      , outputDir = getRequiredInput('outputDir')
      , organization = getRequiredInput('organization')
      , maxRetries = getRequiredInput('octokit_max_retries')
    ;
    
    // Ensure that the output directory exists before we our limited API usage
    await io.mkdirP(outputDir)

    const octokit = githubClient.create(token, maxRetries)
      , orgActivity = new OrganizationActivity(octokit)
    ;
    
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
