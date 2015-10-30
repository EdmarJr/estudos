var tempwin = win = window; while (tempwin != tempwin.top) { try { if (tempwin.frameElement) { win = tempwin.parent; } } catch (e) { } tempwin = tempwin.parent; }
if (!win.__WS_BOOT) {
    function e(v) { var s = encodeURIComponent(v); return s.replace(/%(?![0-9a-fA-F]{2})/g, "%25"); } function h() { return e((window.location.href || '').split("?")[0].split("#")[0]); }
    win.__WS_BOOT = 1; var wsHost = "//wsc2.webspectator.com"; var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = wsHost + '/init?appId=10046216&h=' + h() + '&t=' + +new Date(); var x = win.document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
}
var q = document.createElement('script');q.type = 'text/javascript';q.async = true;q.src = '//wfpscripts.webspectator.com/quantcast.js';document.getElementsByTagName('HEAD')[0].appendChild(q);

