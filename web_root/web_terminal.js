var Terminal = (function () {
    var KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        KEY_TAB = 9,
        KEY_ENTER = 13,
        KEY_BACKSPACE = 8;
        KEY_DELETE = 46;

    function setFocusToDivEnd(obj) {
        if (window.getSelection) {
            obj.focus();
            var range = window.getSelection();
            range.selectAllChildren(obj);
            /* 光标移至最后 */
            range.collapseToEnd();
        } else if (document.selection) {
            var range = document.selection.createRange();
            /* range定位到obj */
            range.moveToElementText(obj);
            /* 光标移至最后 */
            range.collapse(false);
            range.select();
        }
    }

    self.init = function (elem, wsUrl) {
        var input = document.querySelector('.input');
        var wsStatus = document.querySelector('.wsStatus');
        var line;

        var ws = new WebSocket(wsUrl);
        ws.onopen = function (ev) {
            wsStatus.innerHTML = "Web finsh is <font color=\"Green\" size=5><b>connected</b></font>.";
            console.log(ev);
        };
        ws.onerror = function (ev) {
            wsStatus.innerHTML = "Web finsh connect has <font color=\"Red\" size=5><b>error</b></font>.";
            console.log(ev);
        };
        ws.onclose = function (ev) {
            wsStatus.innerHTML = "Web finsh connection <font color=\"Red\" size=5><b>closed</b></font>.";
            console.log(ev);
        };
        ws.onmessage = function (ev) {
            /* console.log(ev); */
            /* 添加接收到的数据 */
            var spanEle = document.createElement("span");
            /* html 转义 */
            spanEle.innerHTML = ev.data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
            input.appendChild(spanEle);
            setFocusToDivEnd(input);
            /* 页面自动滚动至底部 */
            var bo = document.getElementsByTagName("body")[0];
            bo.scrollTop = bo.scrollHeight;
        };

        document.addEventListener("keydown",
            function (event) {
                if (event.keyCode == KEY_TAB) {
                    ws.send(String.fromCharCode(event.keyCode));
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_LEFT) {
                    /* ws.send(String.fromCharCode(0x1B, 0x5B, 0x44)); */
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_UP) {
                    /* ws.send(String.fromCharCode(0x1B, 0x5B, 0x41)); */
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_DOWN) {
                    /* ws.send(String.fromCharCode(0x1B, 0x5B, 0x42)); */
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_RIGHT) {
                    /* ws.send(String.fromCharCode(0x1B, 0x5B, 0x43)); */
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_BACKSPACE) {
                    /* ws.send(String.fromCharCode(event.keyCode)); */
                    event.preventDefault(true);
                } else if (event.keyCode == KEY_DELETE) {
                    /* ws.send(String.fromCharCode(event.keyCode)); */
                    event.preventDefault(true);
                }
                return false;
            });

        document.addEventListener("keyup",
            function (event) {
                return false;
            });

        document.addEventListener("keypress",
            function (event) {
                /* 转发输入数据至 WebSocket 服务器 */
                ws.send(String.fromCharCode(event.keyCode));

                event.preventDefault();
            });

        setFocusToDivEnd(input);
        return self;
    };

    return self;
})();