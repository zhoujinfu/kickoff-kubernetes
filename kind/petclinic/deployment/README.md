### Rolling Update

如果服务横向有 4 个 Pod，滚动发布，是一个一个发布，一个一个替换。对比蓝绿发布，滚动发布需要版本间是兼容的情况，不会占用额外的机器资源，发布速度也很快，一般配合金丝雀发布降低发布风险。

|     |  蓝绿  | 滚动  |
|  ----  |  ----  |  ----  |
| 所需自预案 | 两倍机器资源 | 无需额外或少量 |
| 发布速度 | 很快 | 较慢 |
| 版本兼容 | 支持版本不兼容升级 | 仅支持版本兼容升级 |
| 发布风险 | 风险大（需配合金丝雀）| 风险小 |


1. 发布 deployment/service 镜像v1.0.0
2. 修改 deployment 镜像到 v1.0.1
3. 重新发布 deployment

```shell
kubectl apply -f .
# 查看滚动发布历史
kubectl rollout history deployment/petclinic
```

### Rollback

```shell
kubectl rollout undo deployment/petclinic
kubectl rollout undo deployment/petclinic --to-revision=2
```

```shell
kubectl rollout status deployment/petclinic
```