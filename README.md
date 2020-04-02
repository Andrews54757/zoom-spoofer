# zoom-spoofer
Simple extension to spoof Zoom's 'attendee attention tracking' system in their web-based client

## Description

This tiny extension bypasses Zoom's 'attendee attention tracking' system in their web-based client that allows hosts to know if you have not seen their presentation for longer than 30 seconds (https://support.zoom.us/hc/en-us/articles/115000538083-Attendee-attention-tracking).

This extension redirects zoom conference urls to their notoriously hidden web based client that doesn't require any app to use. This feature can be disabled in the extension settings if you wish.

This "spoof" only works on the web-based client because, unlike with the actual app, users have more control over what Zoom does on a browser — instead of directly accessing your machine as in an app, Zoom has to interface with Chrome to access your computer environment.

This codebase is 100% open source, and available on Github here: https://github.com/Andrews54757/zoom-spoofer

P.S.
Web-based limited access means that some app-only features (like the greenscreen/special effects) may be unavailable on the web-based client. However, I personally believe that it may be well worth the sacrifice considering that the web-client is more privacy-friendly than the app (Moreover, Zoom has had a concerning track record of privacy and security issues which doesn't particularly inspire my confidence).
