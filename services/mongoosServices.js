const { Issue } = require('../models/issues');

async function syncIssues(issuesData) {
    try {
        for (const issue of issuesData) {

            const existingIssue = await Issue.findOne({ id: issue.id });

            if (existingIssue) {
                await Issue.updateOne({ id: issue.id }, issue);
            } else {
                await Issue.create(issue);
            }
        }
        console.log("Sync with GitHub completed");
    } catch (error) {
        console.error("Error syncing with GitHub:", error);
        throw error;
    }
}

async function getIssuesDb(issueId) {
    try {
        const issue = await Issue.findOne({ number: issueId });
        return issue;
    } catch (error) {
        console.error("Issue not found in DataBase:", error);
        throw error;
    }
}

async function updateIssueDb(issueId, updatedIssueData) {
    try {
        const updatedIssue = await Issue.findOneAndUpdate(
            { number: issueId },
            updatedIssueData,
            { new: true }
        );
        return updatedIssue;
    } catch (error) {
        logger.error("Error Updating DataBase:", error);
        throw error;
    }
}


module.exports = {
    syncIssues,
    getIssuesDb,
    updateIssueDb
}