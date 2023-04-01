### 查看 mysql pod 中数据

> mysql pod 数据在重新部署后，会丢失。


```shell
kubectl exec -it mysql-75b64d7fc7-8n4vx -- sh
$ cd /var/lib/mysql
$ ls
```

### 存储卷抽象 Volume

1. Ephemeral: 临时存储，如 emptyDir
2. Persistent：持久化存储，如云存储、NFS 等
 - 云存储：阿里云 NAS/OSS，AWS EBS 等
 - 网络文件系统： Ceph, GlusterFS, NFS 等
 - 其他：emptyDir, hostPath, local 等
