### Request/Limit

1. CPU
  - Request: k8s 保证供给
  - Limit: 限制 CPU 使用量(throttling)
2. Memory
  - Request: k8s 保证供给
  - Limit: OOMKill


```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "200m" # 1/5 core. 1000mini core = 1core
  limits:
    memory: "512Mi"
```

```shell
kubectl get no
# NAME                 STATUS   ROLES           AGE     VERSION
# kind-control-plane   Ready    control-plane   3h13m   v1.26.3
# kind-worker          Ready    <none>          3h13m   v1.26.3
# kind-worker2         Ready    <none>          3h13m   v1.26.3
kubectl describe no kind-control-plane
# Allocated resources:
#   (Total limits may be over 100 percent, i.e., overcommitted.)
#   Resource           Requests    Limits
#   --------           --------    ------
#   cpu                950m (15%)  100m (1%)
#   memory             290Mi (3%)  390Mi (4%)
#   ephemeral-storage  0 (0%)      0 (0%)
#   hugepages-2Mi      0 (0%)      0 (0%)
```