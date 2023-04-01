### 配置抽象 ConfigMap

Pod <--env-- ConfigMap
Pod <--VolumeMount-- Volume <--File-- ConfigMap

```shell
kubectl get cm
kubectl describe cm petclinic-config
```

测试

```shell
kubectl logs pod/petclinic-75b64d7fc7-8n4vx
kubectl exec pod/petclinic-75b64d7fc7-8n4vx printenv
```
