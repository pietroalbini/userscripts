// ==UserScript==
// @name         GitHub Pull Request: variables in comments
// @description  Allow replacing variables in comments/saved replies
// @author       Pietro Albini
// @version      1.0.1
// @license      MIT License
// @namespace    https://userscripts.pietroalbini.org
// @icon         https://userscripts.pietroalbini.org/icons/github.png
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

// Copyright (c) 2018 Pietro Albini <pietro@pietroalbini.org>
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

    const VALID_PAGES_RE = /^\/[^\/]+\/[^\/]+\/pull\/[0-9]+/;

    var replaces = {
        // Transforms to: @authorname
        "##GITHUB_PR_REPLACE_AUTHOR##": function() {
            return "@"+document.querySelector(".author.pull-header-username").innerHTML;
        },

        // Transforms to: @assignee1 @assignee2 @assignee3
        "##GITHUB_PR_REPLACE_ASSIGNEES##": function() {
            var result = "";
            var assignees = document.querySelectorAll("a.assignee span");
            for (var i = 0; i < assignees.length; i++) {
                result += "@"+assignees[i].innerHTML+" ";
            }

            if (result === "") {
                return "@ASSIGNEE";
            } else {
                return result.trim();
            }
        },

        // Processes T-team labels on the issue (rust-lang/rust specific)
        // Transforms to: @rust-lang/team1 @rust-lang/team2 @rust-lang/team3
        "##GITHUB_PR_REPLACE_RUSTC_TEAMS##": function() {
            var result = "";
            var labels = document.querySelectorAll("a.IssueLabel span");
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i].innerHTML;
                if (label.indexOf("T-") === 0) {
                    result += "@rust-lang/"+label.substr(2)+" ";
                }
            }

            if (result === "") {
                return "@rust-lang/TEAM_NAME";
            } else {
                return result.trim();
            }
        },
    };

    function replace() {
        var value = this.value;
        for (var key in replaces) {
            if (value.indexOf(key) !== -1) {
                value = value.replace(key, replaces[key]());
            }
        }

        if (value != this.value) {
            this.value = value;
        }
    }

    function listen() {
        if (VALID_PAGES_RE.exec(location.pathname) === null) {
            return;
        }

        var comment_fields = document.querySelectorAll(".comment-form-textarea");
        for (var i = 0; i < comment_fields.length; i++) {
            comment_fields[i].addEventListener("keyup", replace.bind(comment_fields[i]));
            comment_fields[i].addEventListener("change", replace.bind(comment_fields[i]));
        }
    }

    window.addEventListener("load", listen);
    window.addEventListener("pjax:complete", listen);
})();
