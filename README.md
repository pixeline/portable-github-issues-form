# portable-github-issues-form

## how to use 

Add the provided javascript file right before the end body tag: 

`<script src="bundle.js" ></script>`
Then instantiate the Issue object, using your project's repository credential :

``` javascript
<script>
Issue = new Issue({ 'token': '1b508508fcf3c7ec30dfa3aba9697bc51c3896fd', 'useragent': 'portable-github-issues-form', 'repository': 'pixeline/portable-github-issues-form' });
Issue.inject();
</script>
```

## Configuration

The `function` accepts the following `options`:
*   __token__: GitHub [access token][github-token] (*required*).
*   __useragent__: [user agent][github-user-agent] `string`.
*   __body__: issue content.
*   __assignees__: GitHub usernames of assigned users.
*   __milestone__: associated milestone `number`.
*   __labels__: `array` of associated labels.


To [authenticate][github-oauth2] with GitHub, set the [`token`][github-token] option.

``` javascript
var opts = {
    'token': 'tkjorjk34ek3nj4!'
};
```

## Want to contribute ? 

`npm install -g watchify browserify`

then

`watchify portable-github-issues-form.js -o bundle.js` 

## Credits 
- post issue to github function : https://github.com/kgryte/github-create-issue