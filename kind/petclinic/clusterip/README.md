### 内部服务间如果访问？

Browser -> Service(app=petclinic, type=NodePort)
        -> Pod(Business Server)
        -> Service(app=mysql, type=ClusterIP)
        -> Pod(Database Server)

ClusterIP 也是不稳定的，随着发布进行，会变化。一般集群内有 DNS（cooreDNS），服务间使用 DNS 互相访问。

发布顺序：（因为业务服务依赖数据库）

1. 先发布 mysql
2. mysql 好了以后，再发布 petclinic
