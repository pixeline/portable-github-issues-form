function GithubIssueForm(options) {
    this.token = options.token || '1b508508fcf3c7ec30dfa3aba9697bc51c3896fd';
    this.useragent = options.useragent || 'portable-github-issues-form';
    this.repository = options.repository || 'pixeline/portable-github-issues-form';
    this.DOMElement = null;
    var issue = this;
    if (!issue.token || !issue.repository) {
        throw new Error('Cannot post to Github : No token or repository provided.');
    }
    function send(title, content) {
        var createGithubIssue = require('github-create-issue');
        // Basic validation:
        if (!title || !content) {
            var feedback = 'Cannot post to Github : No Title or Content filled.';
            alert(feedback);
            throw new Error(feedback);
        }
        // Actually post the Issue:
        createGithubIssue(issue.repository, title, {
            'token': issue.token,
            'useragent': issue.useragent,
            'body': content,
            'assignees': options.assignees,
            'labels': options.label,
            'milestone': options.miletone
        }, githubCallback);
    }

    function githubCallback(error, githubIssue, info) {
        // Check for rate limit information...
        if (info) {
            console.error('Limit: %d', info.limit);
            console.error('Remaining: %d', info.remaining);
            console.error('Reset: %s', (new Date(info.reset * 1000)).toISOString());
        }
        if (error) {
            throw new Error(error.message);
        }
        alert("Message sent. Thank you!");
        issue.DOMElement.reset();
    }
    this.form = '<div id="js-github-issue-form" class="portable-github-form"><span id="js-portable-github-form-trigger" class="portable-github-form-trigger">Help</span><span id="js-github-issue-form-close" class="github-issue-form-close"></span><form id="js-github-form"><fieldset><legend>Report an issue</legend><div><label for="git-title">Title</label><input tabindex="0" type="text" id="git-title" name="title"></div><div><label for="git-content">What is the problem ?</label><textarea tabindex="1" id="git-content" name="content" placeholder="Please describe steps to reproduce the issue..."></textarea></div><div><input tabindex="2" type="submit" name="send" id="js-github-issues-form-send" class="github-issues-form-send" value="Send this issue"></div></fieldset></form></div>';

    this.inject = function () {
        var el = document.querySelector('body');
        el.insertAdjacentHTML("beforeend", this.form);
        el = document.getElementById('js-github-issues-form');
        // bind Submit event
        issue.DOMElement = document.getElementById('js-github-form');
        issue.DOMElement.addEventListener("submit", function (e) {
            e.preventDefault();
            var title = document.getElementById('git-title').value;
            var body = document.getElementById('git-content').value;
            send(title, body);
        });
        // bind close button event
        var close = document.getElementById('js-github-issue-form-close');
        close.addEventListener("click", function () {
            // Remove the form 
            issue.DOMElement.remove();
        });
    }
}

var githubForm = new GithubIssueForm({ 'token': '1b508508fcf3c7ec30dfa3aba9697bc51c3896fd', 'useragent': 'portable-github-issues-form', 'repository': 'pixeline/portable-github-issues-form' }).inject();