const { Octokit } = require('@octokit/core');
const axios = require("axios");


const { ACCESS_TOKEN, OWNER, REPO, BATCH_SIZE } = process.env;
const baseUrl = `https://api.github.com/repos/${OWNER}/${REPO}`;

const getIssuesRepo = async () => {
    const octokit = new Octokit({
        auth: ACCESS_TOKEN
    });

    try {

        const totalCountResponse = await axios.get(baseUrl);
        const totalCount = totalCountResponse.data.open_issues_count;
        const numBatches = Math.ceil(totalCount / BATCH_SIZE);

        let allIssues = [];

        for (let pageNumber = numBatches; pageNumber > 0; pageNumber--) {

            const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
                owner: OWNER,
                repo: REPO,
                per_page: BATCH_SIZE,
                page: pageNumber
            });

            allIssues = allIssues.concat(response.data);

            if (pageNumber < numBatches) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        return allIssues;

    } catch (error) {
        console.error(error);
        return [];
    }
};

const updateIssueRepo = async (issueNumber, updatedIssueData) => {

    const octokit = new Octokit({
        auth: ACCESS_TOKEN
    });

    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: OWNER,
        repo: REPO,
        issue_number: issueNumber,
        title: updatedIssueData.title,
        body: updatedIssueData.body,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

module.exports = {
    getIssuesRepo,
    updateIssueRepo
};