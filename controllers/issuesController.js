const express = require("express");
const router = express.Router();
const Issue = require('../models/issues');
const { Octokit } = require('@octokit/core');
const { getIssuesRepo, updateIssueRepo } = require('../services/gitHubApi')
const { syncIssues, getIssuesDb, updateIssueDb } = require('../services/mongoosServices')

const { ACCESS_TOKEN, OWNER, REPO, BATCH_SIZE } = process.env;

const createIssue = async (req, res, next) => {
    try {
        const issuesData = await getIssuesRepo();
        await syncIssues(issuesData)
        res.status(201).send(issuesData);
    }
    catch (error) {
        next(error);
    }
};

const getIssue = async (req, res, next) => {
    const issueNumber = req.params.issueNumber;
    try {
        const issue = await getIssuesDb(issueNumber);
        if (!issue) {
            const notFoundError = new Error('Issue not found');
            notFoundError.status = 404;
            throw notFoundError;
        }
        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
}

const updateIssue = async (req, res, next) => {
    const issueNumber = req.params.issueNumber;
    const { title, body } = req.body;
    try {
        await updateIssueRepo(issueNumber, { 'title': title, 'body': body })
        await updateIssueDb(issueNumber, { 'title': title, 'body': body })
        res.status(200).send("Update issue successfully");
    }
    catch (error) {
        next(error);
    }
};


module.exports = {
    getIssue,
    createIssue,
    updateIssue
}
