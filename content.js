/*
Copyright (c) 2020 Andrew S (Andrews54757@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



// Content script runs in all zoom pages to inject an overriding script.
(function() {
    var sc = document.createElement('script'); // Inject a script before anything loads
    sc.innerHTML = `
(function (){

var realWindowAddEventListener = window.addEventListener
window.addEventListener = function(a,b,c,d) { 
    // Create fake addEventListener for window to prevent using it to detect tab-outs (just in case)
    if (a == "blur") {
        console.log("[Zoom Spoofer] Window blur override",b,c,d)
    } else {
        realWindowAddEventListener(a,b,c,d)
    }
}

var realDocumentAddEventListener = document.addEventListener;
document.addEventListener = function(a,b,c,d) {
    // Create fake addEventListener for document to prevent access to blur (just in case) and visibility events.
    if (a == "blur") {
        console.log("[Zoom Spoofer] Document blur blocked",b,c,d)
    } else if (a == "visibilitychange") {
        console.log("[Zoom Spoofer] Visibility change event listener blocked",b,c,d);
    } else {
        realDocumentAddEventListener(a,b,c,d)
    }
}

// Permenantly set the document.hidden property to false to spoof "attentiveness"
Object.defineProperty(document,'hidden',{
    value: false,
    writable: false
})

})();
`
    document.documentElement.appendChild(sc) // Append script
})();