// ==UserScript==
// @name         YouTube channels: disable featured video autoplay
// @description  Disable autoplay of the featured video in the channel page
// @author       Pietro Albini
// @version      1.0
// @license      MIT License
// @namespace    https://userscripts.pietroalbini.org
// @icon         https://userscripts.pietroalbini.org/icons/youtube.png
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

// Copyright (c) 2017 Pietro Albini <pietro@pietroalbini.org>
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
    "use strict";

    const VALID_PAGES_RE = /^\/(user|channel)\/[a-zA-Z0-9_\-]+(\/featured)?$/;

    var pause_video = function() {
        // Don't do anything on pages other than the channel preview
        if (VALID_PAGES_RE.exec(location.pathname) === null) {
            return;
        }

        var interval = setInterval(function() {
            var video = document.querySelector(
                "ytd-channel-video-player-renderer video"
            );

            if (video !== null) {
                video.pause();
                clearInterval(interval);
            }
        }, 100);
    };

    // Initially pause the video
    pause_video();

    // Pause videos even when the YouTube page is changed
    document.addEventListener("yt-navigate-finish", function() {
        pause_video();
    });

})();
