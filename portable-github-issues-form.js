var createIssue = require('github-create-issue');

var opts = {
    'token': '304aa57fd077ca9562376f3dea91fe3091245afe',
    'useragent': 'beep-boop-bop',
    'body': 'Beep boop.'
};

createIssue('pixeline/portable-github-issues-form', 'Big bug.', opts, clbk);

function clbk(error, issue, info) {
    // Check for rate limit information...
    if (info) {
        console.error('Limit: %d', info.limit);
        console.error('Remaining: %d', info.remaining);
        console.error('Reset: %s', (new Date(info.reset * 1000)).toISOString());
    }
    if (error) {
        throw new Error(error.message);
    }
    console.log(JSON.stringify(issue));
    // returns <issue_data>
}