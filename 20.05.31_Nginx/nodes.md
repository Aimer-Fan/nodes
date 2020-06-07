# Nginx

## Nginx简介

### 1、什么是Nginx?

​	Nginx是一个高性能的HTTP和反向代理服务器，特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好。

​	Nginx专为性能优化而开发，性能是尤其重要的考量，实现上非常注重效率，能经受高负载的考验，有报告表明能支持高达50000个并发连接数。

### 2、反向代理

（1）正向代理

​	在客户端（浏览器）配置代理服务器，通过代理服务器进行访问互联网

（2）反向代理

​	反向代理，其实客户端对代理是无感知的，因为客户端不需要做任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器地址。

### 3、负载均衡

​	客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。

​	这种架构模式对应早期的系统相对单一，并发请求相对较少的情况下是比较适合的，成本也低。但是随着信息数量的不断增加、访问量和数据量的飞速增长，以及系统业务的复杂度增加，这种架构会造成服务器响应客户端的请求日益缓慢，并发量特别大的时候，还容易造成服务器直接崩溃。很明显这是由于服务器性能瓶颈造成的问题，那么怎么解决这种情况呢？

​	这个时候集群的概念就产生了。单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原来请求集中到单个服务器上的请求改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们说的负载均衡。

### 4、动静分离

​	为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器开解析，加快解析速度。降低原来单个服务器的压力。

## Nginx 的安装

```(shell)
sudo apt-get install nginx
```

Ubuntu安装之后的文件结构大致如下：

+ 所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下

+ 程序文件在/usr/sbin/nginx

+ 日志放在了/var/log/nginx中

+ 并已经在/etc/init.d/下创建了启动脚本nginx

+ 默认的虚拟主机的目录设置在了/var/www/nginx-default (有的版本默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available里的配置)

## Nginx 的常用指令

+ 查看Nginx版本号

    ```shell
    ./nginx -v
    ```

+ 启动

    ```shell
    sudo /etc/init.d/nginx start
    # 或者
    ./nginx
    ```

+ 停止
    ```shell
    sudo /etc/init.d/nginx stop
    # 或者
./nginx -s stop
    ```
    
+ 重新加载
    ```shell
    sudo /etc/init.d/nginx reload
    # 或者
./nginx -s reload
    ```

## Nginx 的配置文件

nginx.config配置文件主要分为三部分：

### 1、全局块

​		从配置文件开始到events块之间的内容，主要会设置一些影响nginx服务器整体运行的配置指令，主要包括配置运行Nginx服务器的用户（组）、允许生成的worker process数，进程PID存放路径、日志存放路径和类型以及配置文件的引入等。

```
worker_processes 1;
```

​		这是Nginx服务器并发处理服务的关键配置马，worker_processes值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约。

### 2、 events块

​		events块涉及的指令主要影响Nginx服务器与用户的网络链接，常用的设置包括是否开启对多work_process下的网络连接进行序列化，是否 允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个workprocess可以同时支持的最大连接数等。

```
events {
	worker_connections 1024;
}
```

上述的例子就表示每个workprocess支持的最大连接数为1024。

这部分的配置对Nginx的性能影响较大，在实际中应该灵活配置。

### 3、http块

```
http {
	include		mime.types;
	default_type application/octet-stream;
	
	sendfile	on;
	
	keepalive_timeout	65;
	
	server {
		listen	80;
		server_name	localhost;
		
		location / {
			root	html;
			index	index.html index.htm;
		}
		
		error_page	500 502 503 504 /50x.html;
		location = /50x.html {
			root	html;
		}
	}
}
```

​		这部分是Nginx服务器中配置最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。需要注意的是：http块包括http全局快、server块。

1. http 全局块

   ​		http全局块配置的指令包括文件引入，MIME-TYPE定义、日志自定义、连接超时时间、单链接请求数上限等。

2. server块

   ​		这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

   ​		每个http块可以包括多个server块，而每个server块就相当于一个虚拟主机。

   ​		而每个server块也分为全局server块，以及可以同时包含多个location块。

   1. 全局server块

      ​		最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或IP配置。

   2. location块

      ​		一个server块可以配置多个location块。

      ​		这块的主要作用是基于Nginx服务器接收到的请求字符串（例如server_name/uri-string），对虚拟主机名称（也可以是IP别名）之外的字符串（例如：前面的/uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等 功能，还有许多第三方模块的配置也在这里进行。

## 配置反向代理

1. 对所有的请求都进行转发。

```config
http {
    server {
		location / {
            # 配置反向代理（请求转发）
            proxy_pass http://127.0.0.1:8080;
        }
    }
}
```

2. 根据请求关键字分别转发至不同服务器。

   请求中带有edu会被转发至8080端口，请求中带有vod会转发至8081端口。

```
http {
    server {
		location ~ /edu/ {
            # 配置反向代理（请求转发）
            proxy_pass http://127.0.0.1:8080;
        }
        location ~ /vod/ {
            # 配置反向代理（请求转发）
            proxy_pass http://127.0.0.1:8081;
        }
    }
}
```

location指令说明：

```
location [ = | ~ | ~* | ^~ ] uri {}
```

| 指令名 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| =      | 用于不含正则表达式的uri前，要求请求字符串与uri严格匹配，如果匹配成功，就继续向下搜索并立即处理该请求。 |
| ~      | 用于表示uri包含正则表达式，并且区分大小写。                  |
| ~*     | 用于表示uri包含正则表达式，并且不区分大小写。                |
| ^~     | 用于不含正则表达式的uri前，要求Nginx服务器找到标识uri和请求字符串匹配度最高的location后，立即使用此location处理请求，而不再使用location块中的正则uri和请求字符串做匹配。 |

**注意：**如果uri包含正则表达式，则必须要有~或者~*标识。

## 配置负载均衡

```
http {
	# 添加upstream定义
	upsteam myserver {
		server 127.0.0.1:8080;
		server 127.0.0.1:8081;
	}
    server {
		location / {
            # 在请求转发时指向配置的upstream
            proxy_pass http://myserver;
            root html;
            index index.html index.htm;
        }
    }
}
```

负载均衡策略：

1. 轮询（默认）

   每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器宕机，能自动剔除。

2. weight（权重）

   weight代表权重，默认为1，权重越高，被分配的客户端越多。

   指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。例如：

   ```
   upstream server_pool {
   	server 192.168.5.21 weight=10;
   	server 192.168.5.22 weight=10;
   }
   ```

3. ip_hash

   每个请求按照访问ip的hash结果分配，这样每个访客固定访问一个后端服务器。这样可以解决session的问题。例如：

   ```
   upstream server_pool {
   	ip_hash;
   	server 192.168.5.21;
   	server 192.168.5.22;
   }
   ```

4. faie（第三方）

   按照后端服务器的响应时间来分配请求，响应时间短的优先分配。

   ```
   upstream server_pool {
   	server 192.168.5.21;
   	server 192.168.5.22;
   	fair;
   }
   ```

## 动静分离

​		Nginx动静分离简单来说就是把动态跟静态请求分开，不能理解成只是单纯的把动态页面和静态页面物理分离。严格意义上说应该是动态请求跟静态请求分开，可以理解成使用Nginx 处理静态页面，Tomcat处理动态页面。

​		动静分离从目前实现角度来讲大致分为两种，一种是纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案；另外一种方法就是动态跟静态文件混合在一起发布，通过nginx来分开。

​		通过location指定不同的后缀名实现不同的请求转发。通过expires参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。

​		具体 Expires定义：是给一个资源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源。（如果经常更新的文件，不建议使用 ExPireS 来缓存），这里设置 3d ，表示在这 3 天之内访问这个 URL ，发送一个请求，比对服务器该文件最后更新时间没有变化，则不会从服务器抓取，返回状态码 304 ，如果有修改，则直接从服务器重新下载，返回状态码 200。

```
http {
    server {
    	# 文件在/data/www/下，访问的路径为 192.168.5.21/www
		location /www/ {
            root /data/;
            index index.html index.htm;
        }
        # 文件在/data/image/下，访问的路径为 192.168.5.21/image
        location /image/ {
            root /data/;
            # 表示列出文件夹中的文件列表
            autoindex on;
        }
    }
}
```

## Nginx高可用配置（keepalived）

处理一台nginx服务器宕机的情况。当主服务器nginx服务器宕机后自动转发至备份服务器。

1. 安装keepalived

   ```
   sudo apt-get install keepalived
   ```

   安装完成，会生成 /etc/keepalived/ 目录，该目录是keepalived的配置文件目录。

2. 修改keepalived.config配置文件

   ```
   # 全局配置
   global_defs {
   	notification_email {
   		acassen@firewall.loc
   		failover@firewall.loc
   		sysadmin@firewall.loc
   	}
   	notification_email_from Alexandre.Cassen@firewall.loc
   	smtp_server 192.168.17.129
   	smtp_connect_timeout 30
   	router_id LVS_DEVELBACK # 访问到主机
   }
   # 脚本配置
   vrrp_script chk_http_port {
   	script "/usr/local/src/nginx_check.sh"
   	interval 2 # 检测脚本执行的间隔
   	weight 2 # 权重
   }
   # 虚拟ip的配置
   vrrp_instanceVI_1 {
   	state MASTER # 备份服务器上将MASTER改为BACKUP
   	interface ens33 # 网卡
   	virtual_router_id 51 # 主、备机的virtual_router_id必须相同
   	priority 100 # 主、备机取不同的优先级，主机值较大（100），备份机值较小（90）
   	advert_int 1 # 每隔多少时间发送心跳
   	authentication { # 校验权限方式
   		auth_type PASS
   		auth_pass 1111
   	}
   	virtual_ipaddress {
   		192.168.17.50 # VRRP H虚拟地址
   	}
   }
   ```

3. 在/usr/local/src添加检测脚本

   ```
   #!/bin/bash
   A=`ps -C nginx -no-header |wc -l`
   if [ $A -eq 0];then
   	/usr/local/nginx/sbin/nginx
   	sleep 2
   	if [`ps -C nginx --noheader |wc -l` -eq 0];then
   		killall keepalived
   	fi
   fi
   ```

4. 启动nginx

   ```
   ./nginx
   ```

5. 启动keepalived

   ```
   systemctl start keepalived.serveice
   ```

6. 查看进程服务

   ```
   ps -ef | grep keepalived
   ```

## Nginx原理

![原理图](.\images\原理图.png)

![工作模式](.\images\工作模式.png)

1. 一个master和多个worker有好处

   ​		可以使用nginx -s reload 热部署，利于nginx进行热部署操作。

   ​		首先，对于每个worker进程来说，独立的进程，不需要加锁，所以省掉了锁带来的开销， 同时在编程以及问题查找时，也会方便很多。其次，采用独立的进程，可以让互相之间不会 影响， 一 个进程退出后，其它进程还在工作，服务不会中断，master进程则很快启动新的 worker进程。当然，worker进程的异常退出，肯定是程序有bug 了，异常退出，会导致当 前worker上的所有请求失败，不过不会影响到所有请求，所以降低了风险。

2. 需要设置多少个worker

   Nginx同redis类似都采用了io多路复用机制，每个worker都是一个独立的进程，但每个进程只有一个主线程，通过异步非阻塞的方式来处理请求，即使是成千上万请求也不在话下。每个worker的线程可以把一个cpu的性能发挥到极致。所以worker的数量和cpu数相等是最适宜的。设少了会浪费cpu，设多了会造成cpu频繁切换上下文带来的损耗。

   ```
   # 设置worker数量
   worker_process 4
   # worker绑定cpu（4worker绑定4cpu）
   worker_cpu_affinity 0001 0010 0100 1000
   
   # worker绑定cpu（4worker绑定8cpu中的4个）
   worker_cpu_affinity 00000001 00000010 00000100 00001000
   ```

连接数 worker_connection

​		这个值是表示每个 worker 进程所能建立连接的最大值，所以，一个 nginx 能建立的最大连接数，应该是 worker_connections * worker_processes。当然，这里说的是最大连接数，对于HTTP请求本地资源来说，能够支持的最大并发数量是 worker_connections * worker_processes，如果是支持 httP 1.1 的浏览器每次访问要占两个连接，所以普通的静态访问最大并发数是 worker_connections * worker_processes / 2，而如果是 HTTp 作为反向代理来说，最大并发数量应该是 worker_connections * worker_processes / 4 。因为作为反向代理服务器，每个并发会建立与客户端的连接和与后端服务的连接，会占用两个连接。

