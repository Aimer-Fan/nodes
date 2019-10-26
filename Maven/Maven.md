# Maven

## 1. 目前技术在开发中存在的问题
  + 一个项目就是一个工程
    - 如果一个项目非常庞大，就不适合使用package划分模块，最好是一个模块对应一个工程，利于分工协作。
    - 借助Maven就可以讲一个项目拆分成多个项目。
  + 项目中需要的jar包必须手动 复制 粘贴 到 WEB-INF/lib 目录下
    - 问题：同样的jar包重复出现在不同的项目工程中，一方面浪费存储空间，另外
  + jar包需要提前准备好，或者到官网下载
  + 一个jar包依赖的其它jar包需要自己手动加入到项目中

## 2. Maven 是什么
  + Maven是一款服务于Java平台的自动化构建工具
    - Make -> Ant -> Maven -> Gradle
  + 构建
    - 以java源文件，或者其它文件去生产一个可以运行的项目的过程。
  + 构建过程中的各个环节
    + 清理：将以前编译的字节码文件删除，为下一次编译做准备
    + 编译：将java源文件编译成字节码文件
    + 测试：自动测试，自动调用junit程序
    + 报告：测试程序的结果
    + 打包：动态Web工程打war包，java工程打jar包
    + 安装：Maven特定的概念--> 将打包得到的文件复制到"仓库"中的指定位置
    + 部署：将动态web工程生成的war包复制到Servlet容器的指定目录下，使其可以运行。
    
## 3. 安装Maven核心程序
  + 检查JAVA_HOME环境变量
  + 安装[Maven](https://maven.apache.org/download.cgi)，解压核心压缩包，放在非中文无空格路径下
  + 配置MAVEN_HOME和M2_HOME `向下兼容`
  + 配置path
  + 验证：运行 mvn -v 查看Maven版本

## 4. Maven的核心概念
  + **约定的目录结构**
  + **POM**
  + **坐标**
  + **依赖**
  + 仓库
  + 生命周期/插件/目标
  + 继承
  + 聚合

## 5. 第一个Maven工程
  + 创建约定的目录工程
  ```
    |---工程名
        |---src                   源码
        |---|---main              存放主程序
        |---|---|---java          存放Java源文件
        |---|---|---resources     存放框架或者其他工具的配置文件
        |---|---|test             存放测试程序
        |---|---|---java
        |---|---|---resources     
        |---pom.xml               Maven工程的核心配置文件
  ```
  + 为什么要遵循约定的目录结构呢？
    - Maven要负责我们项目的自动化构建，以编译为例，Maven想要自动编译，那么他必须知道Java源文件保存在哪里。
    - 如果自定义的东西想要让框架或工具知道，有两种办法
      * 以配置的方式告诉框架
      * 遵守框架内部已存在的约定
      * 约定 > 配置 > 编码
      
## 6. 常用的Maven命令
  + 注意：执行与构建相关的命令，必须进入pom.xml所在的目录
  + 常用命令：
    ```
      mvn clean           // 清理
      mvn compile         // 编译主程序
      mvn test-compile    // 编译测试程序
      mvn test            // 执行测试
      mvn package         // 打包
      mvn install		  // 安装
      mvn site			  // 生成站点
    ```
    
## 7. 关于联网问题
  + Maven的核心程序中仅仅定义了抽象的生命周期，但是具体的工作必须由特定的插件来完成。而插件本身并不包含在在Maven的核心程序中
  + 当我们执行的Maven命令需要某些插件时，Maven核心程序会首先到本地仓库中查找
  + 本地仓库的默认位置：[系统的当前用户的家目录]\.m2\repository
  + Maven核心程序人如果在本地仓库中找不到需要的插件，它会自动连外网，到中央仓库下载
  + 如果此时无法链接外网，则构建失败
  + 修改默认本地仓库的位置，可以让Maven核心程序到事先准备好的目录下查找插件
    ```
      [maven解压目录]\conf\settings.xml ===> <localRepository></loaclRepository>
    ```

## 8. POM

	* 含义：Project Object Model 项目对象模型
	* pom.xml 对于 Maven 工程是核心配置文件，与构建相关的一切设置都在这个文件中进行配置。

## 9. 坐标

 + 数学中的坐标：

   	+ 在平面上使用x，y两个向量可以定位任意一个点
      	+ 在空间中使用x，y，z三个向量可以唯一的定位空间中的任何一个点

 + Maven中的坐标：

    + 使用下面三个向量在仓库中唯一定位一个Maven工程
      	+ groupid：公司或者组织域名倒序 + 项目名
       	 	  	+ artifactid：模块的名称
       	 	  	+ version：版本

+ Maven工程中坐标与仓库中路径的对应关系

  ```xml
  <groupId>org.springframework</groupId>
  <artifactId>spring-core</artifactId>
  <version>4.0.0.RELEASE</version>
  ```

  ```
  org/springframework/spring-core/4.0.0.RELEASE/spring-core-4.0.0.RELEASE.jar
  ```

## 10. 仓库

 + 仓库的分类
   	+ 本地仓库：当前电脑上部署的仓库目录，为当前电脑上所有的Maven工程服务
    + 远程仓库：
      	+ 私服：搭建在局域网环境中，为局域网范围内的所有Maven工程服务
      	+ 中央仓库：架设在Internet上，为全世界所有的Maven工程服务
      	+ 中央仓库镜像：为了分担中央仓库的流量，提升用户访问速度
 + 仓库中保存的内容：Maven工程
   	+ Maven自身所需要的插件
      	+ 第三方框架或工具jar包
      	+ 我们自己开发的Maven工程

## 11. 依赖

 + Maven解析依赖时会到本地仓库中查找被依赖的jar包

   	+ 对于我们自己开发的Maven工程，使用 ```mvn install```命令安装后就可以进入仓库

 + 依赖的范围

    + compile 范围依赖
      	+ 对主程序是否有效：有效
      	+ 对测试程序是否有效：有效
      	+ 是否参与打包：参与
    + test 范围依赖
       + 对主程序是否有效：无效
      + 对测试程序是否有效：有效
      + 是否参与打包：不参与
    + provided 范围依赖
       + 对主程序是否有效：有效
      + 对测试程序是否有效：有效
      + 是否参与打包：不参与

## 12. 生命周期
+ 各个环节执行的顺序

+ Maven的核心程序中定义了抽象的生命周期，生命周期中各个阶段的具体任务是由插件来完成的

+ Maven核心程序为了更好的实现自动化构建，按照这一特点执行生命周期中的各个阶段：无论现在要执行生命周期中的哪个阶段，都是从这个生命周期最初的位置开始执行。

+ 插件和坐标

  + 生命周期的各个阶段仅仅定义了要执行的任务是什么

  + 各个阶段和插件的目标是对应的

  + 相似的目标由特定的插件来完成

    | 生命周期阶段 | 插件目标    | 插件                  |
    | ------------ | ----------- | --------------------- |
    | compile      | compile     | maven-compiler-plugin |
    | test-compile | testCompile | maven-compiler-plugin |

## 13. 依赖【高级】

 + 依赖的传递性

   	+ 好处：可以传递的依赖不必每个模块工程中都重复声明，在“最下面”的工程中依赖一次即可。
      	+ 注意：非compile范围的依赖不能传递。所以在各个工程模块中，如果有需要就要重复声明。

 + 依赖的排除

   + 依赖排除的设置

   ```xml
   <exclusions>
   	<exclusion>
   		<groupId>commons-logging</groupId>
   		<artifactId>commons-logging</artifactId>
   	</exclusion>
   </exclusions>
   ```

+ 依赖的原则

  + 作用： 解决模块之间jar包冲突的问题
  + 验证路径最短者优先原则
  + 验证路径相同时先声明者优先（先声明指的是dependency标签的声明顺序）

+ 统一管理依赖的版本

  + 如果需要同意升级jar包的版本，手动逐一修改不可靠

  + 建议配置方式：

    + 使用properties标签内使用自定义标签统一声明的版本号

      ```xml
      <properties>
      	<snl.spring.version>4.0.0.RELEASE</snl.spring.version>
      </properties>
      ```

    + 在需要统一版本的位置，使用```${自定义标签名}```引用声明的版本号

      ```xml
      <version>${snl.spring.version}</version>
      ```

  + 其实```properties```标签配合自定义标签声明数据的配置并不是只能用于声明依赖的版本号。凡是需要统一声明后在使用的场合都可以使用。

## 14. 继承

 + test范围的依赖，由于起不能传递所以必然会分散在各个模块工程中，很容易造成版本不一致。

 + 解决思路：

   	+ 将依赖的提取到“父工程”中，在子工程中声明依赖时不指定版本，以父工程中统一设定的为准。同时也便于修改。

 + 操作步骤：

    + 创建一个Maven工程作为父工程。注意：打包的方式pom

      ```xml
      <groupId>com.maven</groupId>
      <actifactId>Parent</actifactId>
      <version>0.0.1-SNAPSHOT</version>
      <packaging>pom</packaging>
      ```

    + 在子工程中声明对父工程的引用

      ```xml
      <!-- 子工程中声明父工程 -->
      <parent>
      	<groupId>com.maven</groupId>
          <actifactId>Parent</actifactId>
          <version>0.0.1-SNAPSHOT</version>
          
          <!-- 以当前文件为基准的父文件pom.xml文件的相对路径 -->
          <relativePath>../Parent/pom.xml</relativePath>
      </parent>
      ```

    + 在子工程的坐标中与父工程坐标中重复的内容删除

    + 在父工程中统一管理所需的依赖

      ```xml
      <dependencyManagement>
      	<dependencies>
          	<dependency>
              	<groupId>junit</groupId>
                  <artifactId>junit</artifactId>
                  <version>4.0</version>
                  <scope>test</scope>
              </dependency>
          </dependencies>
      </dependencyManagement>
      ```

      	+ 在子工程中删除依赖的版本号部分

	+ 注意：**配置继承后，执行安装命令时要先安装父工程。**

## 15 聚合

 + 作用： 一键安装各个模块

 + 配置方式： 在一个总的聚合工程中配置各个参与聚合的模块

   ```xml
   <!-- 配置聚合 -->
   <modules>
       <!-- 配置各个子工程的相对路径 -->
   	<module>Model1</module>
       <module>Model2</module>
       <module>Model3</module>
   </modules>
   ```
```

## 16 自动化部署

​```xml
<!-- 配置当前工程构建过程中的特殊配置 -->
<build>
	<finalName>FinalName</finalName>
    
    <!-- 配置构建过程中需要使用的插件 -->
    <plugins>
    	<plugin>
        	<!-- cargo是一家专门从事“启动Servlet”的组织 -->
            <groupId>org.codehaus.cargo</groupId>
            <artifactId>cargo-maven2-plugin</artifactId>
            <version>1.2.3</version>
            
            <!-- 针对插件进行的配置 -->
            <configuration>
            	<!-- 配置当前系统中容器的位置 -->
                <container>
                	<containerId>tomcat6x</containerId>
                    <home>D:\DevInstall\apache-tomcat-6.0.39</home>
                    <!-- 如果Tomcat端口为默认值8080则不必设置该属性 -->
                    <properties>
                    	<cargo.servlet.port>8089</cargo.servlet.port>
                    </properties>
                </container>
            </configuration>
            
            <!-- 配置插件在什么情况下执行 -->
            <executions>
            	<execution>
                	<id>cargo-run</id>
                    <!-- 声明周期的阶段 -->
                    <phase>install</phase>
                    <goals>
                        <!-- 插件的目标 -->
                    	<goal>run</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

## 16 MavenRepository

​	[MavenRepository](http://mvnrepository.com)

