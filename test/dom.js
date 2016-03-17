if (typeof document === "undefined") {
    // This must be done synchronously so that the DOM is ready when React is required.    
    var jsdom = require("jsdom");
    global.document = jsdom.jsdom("", {});
    global.window = global.document.defaultView;
    global.navigator = global.window.navigator;
    require("fbjs/lib/ExecutionEnvironment").canUseDOM = true;
}
