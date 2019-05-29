// ==UserScript==
// @name         Azure Pipelines: plaintext logs
// @description  Show plaintext logs instead of downloadable ZIPs on Azure Pipelines
// @author       Pietro Albini
// @version      1.0.0
// @license      MIT License
// @namespace    https://userscripts.pietroalbini.org
// @icon         https://userscripts.pietroalbini.org/icons/azure-pipelines.png
// @match        https://dev.azure.com/*
// @grant        none
// ==/UserScript==

// Copyright (c) 2019 Pietro Albini <pietro@pietroalbini.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

(function() {
    'use strict';

    const LOG_URLS_RE = /^https:\/\/dev\.azure\.com\/([^/]+)\/([^/]+)\/_apis\/build\/builds\/([0-9]+)\/logs\/([0-9]+)(\?.*)?$/;

    const realOpen = window.open;
    window.open = function(url, name, features) {
        // Remove the query string from the logs URL since it includes $format=zip
        if (url.match(LOG_URLS_RE)) {
            url = url.replace(LOG_URLS_RE, "https://dev.azure.com/$1/$2/_apis/build/builds/$3/logs/$4");
            name = "_blank";
        }
        realOpen(url, name, features);
    };
})();
