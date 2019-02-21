'use strict';

function GithubIssueForm(options) {
    this.token = options.token || '1b508508fcf3c7ec30dfa3aba9697bc51c3896fd';
    this.useragent = options.useragent || 'portable-github-issues-form';
    this.repository = options.repository || 'pixeline/portable-github-issues-form';
    this.assignee = options.assignee || []; //GitHub usernames of assigned users.
    this.labels = options.labels || ['bug', 'funny'];
    this.milestone = options.milestone || null; // Number

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
            'assignee': issue.assignee,
            'labels': issue.labels,
            //          'milestone': issue.milestone
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
    this.form = '<div id="js-github-issues-form" class="portable-github-form"><span id="js-portable-github-form-trigger" class="portable-github-form-trigger">Help</span><form id="js-github-form"><fieldset><legend>Report an issue</legend><div><label for="git-title">Title</label><input tabindex="0" type="text" id="git-title" name="title"></div><div><label for="git-content">What is the problem ?</label><textarea tabindex="1" id="git-content" name="content" placeholder="Please describe steps to reproduce the issue..."></textarea></div><div><input tabindex="2" type="submit" name="send" id="js-github-issues-form-send" class="github-issues-form-send" value="Send this issue"></div></fieldset></form></div>';

    this.inject = function () {
        /** 
         * - Inject the HTML form into the document
         * - autohide it
         * - Bind the Events 
         * */
        document.querySelector('body').insertAdjacentHTML("beforeend", this.form);
        var wrapper = document.getElementById('js-github-issues-form');
        // Autohide
        var offset = this.offset(wrapper);
        console.log(offset);
        var top = offset.top;
        var height = wrapper.offsetHeight;
        var hidePos = 
        //wrapper.style.bottom = (- height - 25) + 'px';
        wrapper.style.top = top + wrapper.offsetHeight;
        wrapper.setAttribute('data-height', height);
        wrapper.setAttribute('data-state', 'hidden');
        console.info('height: ' + wrapper.style.bottom);

        issue.DOMElement = document.getElementById('js-github-form');
        // bind Submit event
        issue.DOMElement.addEventListener("submit", function (e) {
            e.preventDefault();
            var title = document.getElementById('git-title').value;
            var body = document.getElementById('git-content').value;
            send(title, body);
        });
        // bind TRIGGER button behaviour
        var trigger = document.getElementById('js-portable-github-form-trigger');
        trigger.addEventListener("click", function () {
            if (wrapper.getAttribute('data-state') === 'hidden') {
                // show the form
                wrapper.setAttribute('data-state', 'visible');
                var newVerticalPosition = wrapper.offsetHeight;
                moveVertically(wrapper, 0);
            } else {
                // hide the form 
                wrapper.setAttribute('data-state', 'hidden');
            }
            //  issue.DOMElement.remove();
        });
    }

    this.offset = function (el) {
        var rect = el.getBoundingClientRect(), bodyElt = document.body;
        return {
            top: rect.top + bodyElt.scrollTop,
            left: rect.left + bodyElt.scrollLeft
        }
    }
    function moveVertically(elem, destination) {
        var position = elem.style.bottom;
        var id = setInterval(frame, 3);
        function frame(destination) {
            if (position == destination) {
                clearInterval(id);
            } else {
                position++;
                elem.style.bottom = position + 'px';
            }
        }
    }

};

var githubForm = new GithubIssueForm({ 'token': '67b0d83e414a2fcf81c5ffa33fa0faf0c2713cce', 'useragent': 'portable-github-issues-form', 'repository': 'pixeline/portable-github-issues-form', 'milestone': null }).inject();