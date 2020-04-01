/*

Copyright (c) 2020 Andrew S (Andrews54757@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var redirect_enabled = true;

function loadOptions() {
    chrome.storage.local.get({
        "redirect_enabled": true
    }, function (obj) {
        redirect_enabled = obj.redirect_enabled;
    })
}

chrome.runtime.onMessage.addListener(function (msg, details) {
    if (msg.type == "options_changed") {
        loadOptions();
        return;
    }
});
loadOptions();


chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.runtime.openOptionsPage();
});

// From Zoom-redirector by arkadiyt.

/*
Copyright (c) 2020 Arkadiy Tetelman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (!redirect_enabled) return;
    if (details.type !== 'main_frame' || details.method !== 'GET') {
        return;
    }

    const url = new URL(details.url);
    const match = /^\/[js]\/(\d+)\/?$/.exec(url.pathname);
    if (match === undefined || match[1] === undefined) {
        return;
    }

    const ending = match[0][1];
    const mapping = {
        'j': '/join',
        's': '/start'
    };

    // Save a round trip if the user requested a non-https url
    // At time of writing, Zoom has non-preloaded HSTS deployed
    url.protocol = 'https:';
    url.pathname = '/wc/' + encodeURIComponent(match[1]) + mapping[ending];
    return {
        redirectUrl: url.href
    };
}, {
    urls: ['*://*.zoom.us/j/*', '*://*.zoom.us/s/*']
}, ['blocking']);