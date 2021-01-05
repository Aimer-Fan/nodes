# Git 原理

## Git 对象

> **从根本上来讲，Git是一个内容寻址的文件系统，其次才是一个版本控制系统。**意思是根据文件内容的hash码来定位文件。这就意味着同样内容的文件，在这个文件系统中会指向同一个位置，不会重复存储。

在 Git 中存在三种类型的对象：数据对象、树对象、提交对象。Git 的文件系统 和 Linux 的设计思路类似，即将文件的内容和文件的属性分开存储，文件内容以“装满字节的袋子”存储在文件系统中，文件名、所有者、权限等文件属性信息则另外开辟区域进行存储。在Git中，数据对象相当于文件内容，树对象相当于文件目录树，提交对象则是对文件系统的快照。

### 数据对象

数据对象存储文件的内容，不包括文件名、权限等信息。Git 根据文件内容通过 SHA-1 哈希算法计算文件的哈希值，以哈希值作为文件的索引存储在 Git 文件系统中。由于相同内容的文件生成的哈希值是一致的，所以相同的文件内容在 Git 中只会存储一次。

使用 `git hash-object`可以计算文件的 hash 值，并将生成的数据对象存入 Git 文件系统中。

```shell
$ echo 'version 1' | git hash-object -w --stdin
83baae61804e65cc73a7201a7252750c76066a30
$ echo 'version 2' | git hash-object -w --stdin
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
$ echo 'new file' | git hash-object -w --stdin
fa49b077972391ad58037050f2a75f74e3671e92
```

上面示例中，`-w`表示将数据对象写入到Git文件系统中，如果不加这个选项，那么只计算文件的hash值而不写入；`--stdin`表示从标准输入中获取文件内容，当然也可以指定一个文件路径代替此选项。



使用`git cat-file`可以用来实现所有Git对象的读取，包括数据对象、树对象、提交对象的查看：

```shell
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30
version 1
$ git cat-file -t 83baae61804e65cc73a7201a7252750c76066a30
blob
```

上面示例中，`-p`表示查看Git对象的内容，`-t`表示查看Git对象的类型。



数据对象只是解决了文件内容存储的问题，而文件名的存储则需要通过下一节的树对象来解决。

### 树对象

树对象解决文件名保存的问题，也允许我们将多个文件组织到 一起。

 Git 以一种类似于 UNIX 文件系统的方式存储内容，但作了些许简化。

 所有内容均以树对象和数据对象的 形式存储，其中树对象对应了 UNIX 中的目录项，数据对象则大致上对应了 inodes 或文件内容。

一个树对象包含了一条或多条树对象记录（tree entry），每条记录含有一个指向数据对象或者子树对象的 SHA-1 指针，以及相应的模式、类型、文件名信息。

使用`git update-index`可以为数据对象指定名称和模式，然后使用`git write-tree`将树对象写入到Git文件系统中：

```shell
$ git update-index --add --cacheinfo 100644 83baae61804e65cc73a7201a7252750c76066a30 test.txt
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob 83baae61804e65cc73a7201a7252750c76066a30 test.txt
```

`--add`表示新增文件名，如果第一次添加某一文件名，必须使用此选项；

`--cacheinfo   `是要添加的数据对象的模式、hash值和路径，`<path>`意味着为数据对象不仅可以指定单纯的文件名，也可以使用路径。

本例中，我们指定的文件模式为 100644，表明这是一个普通文件。 其他选择包括：100755，表示一个可执行 文件；120000，表示一个符号链接。 这里的文件模式参考了常见的 UNIX 文件模式，但远没那么灵活——上述 三种模式即是 Git 文件（即数据对象）的所有合法模式（当然，还有其他一些模式，但用于目录项和子模块）。

另外要注意的是，使用`git update-index`添加完文件后，一定要使用`git write-tree`写入到Git文件系统中，否则只会存在于index区域。



接下来我们来创建一个新的树对象，它包括 test.txt 文件的第二个版本，以及一个新的文件：

```shell
$ echo 'new file' > new.txt
$ git update-index --cacheinfo 100644 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
$ git update-index test.txt
$ git update-index --add new.txt
```

可以通过对 read-tree 指定 --prefix 选项，将一个已有的树对象作为子树读入暂存区。

```shell
$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git write-tree
3c4e9cd789d88d8d89c1073707c3585e41b0e614
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579 bak
100644 blob fa49b077972391ad58037050f2a75f74e3671e92 new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
```



