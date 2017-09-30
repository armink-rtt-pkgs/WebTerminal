# Web Terminal 让你的终端在浏览器上跑起来

---

## 1、Web Terminal 是什么

Web Terminal 是一款针对 RT-Thread RTOS 的库。启动后，可以通过网页访问设备的控制台(命令行)系统，实现设备的 **远程/移动化** 操控。

## 2、依赖信息

- RT-Thread 组件
    - LWIP
    - LWIP/app/tftp
    - Finsh/MSH
    - DFS
- RT-Thread 包
    - Mongoose

## 3、如何使用

### 3.1 初始化

在 mongoose 初始化完成后，执行 `web_terminal_init()`

### 3.2 启动

在 Web Terminal 初始化成功后，执行 `web_terminal_start()`

PS：初始化、启动及停止功能都已经集成到了 RT-Thread 的 Finsh/MSH 命令中，也可以手动命令启动，命令格式如下：

```
web_term <init|start|stop>
```

### 3.3 传送资源文件

在根目录下新建并进入 `web_root` 文件夹

```
msh />mkdir web_root
msh />cd web_root
```

启动 TFTP 服务器

> msh /web_root>tftp_server

安装并打开 `/tools/Tftpd64-4.60-setup.exe` 这款 TFTP 工具，然后选择 **Tftp Client** 功能，如下图。（PS：如果电脑上有多个网卡，务必记得网卡也要选择）

![tftp_client](/docs/zh/images/tftp_client.png)

然后选择库源码中 `web_root` 下的 `web_finsh.html` 进行上传。（PS：如果固件开启了  `DFS_USING_WORKDIR` ，所以当前 Finsh/MSH 在哪个文件目录位置， TFTP 就会把文件保存在那里。TFTP 时请注意切换目录）

### 3.4 使用 Web Finsh

如果启用了 `DFS_USING_WORKDIR` ，要保证 Finsh/MSH 控制台当前的目录位于根目录。然后在浏览器中打开 http://put.ip.here/web_finsh.html 即可看到 Web Finsh 真容。

打开网页后的效果如下，现在即可畅快地在网页中输入各种命令，自动补全也支持的。（PS：手机上也一样可以打开 Web Finsh，现在 Finsh/MSH 已被你随时随地的掌控了）

![web_finsh](/docs/zh/images/web_finsh.png)

最后，需要注意，当 Web Finsh 网页打开后， 串口的 Finsh/MSH 就不可使用了。如果想要继续使用，则关闭 Web Finsh 网页即可。
