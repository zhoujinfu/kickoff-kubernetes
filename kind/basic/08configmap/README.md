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
kubectl exec pod/petclinic-75b64d7fc7-8n4vx -- printenv
```

### 更新 ConfigMap，重新发布

```yaml
TEST_CONFIG: test_config_v2
```

重新检测

```shell
kubectl exec pod/petclinic-75b64d7fc7-8n4vx -- printenv | grep TEST_CONFIG
# TEST_CONFIG=test_config_v1
```

使用版本号来处理：

1. 更新 configmap name -> petclinic-config-v2
2. 更新 deployment中 ref，更新到 petclinic-config-v2
3. 重新发布

> ConfigMap 也可以绑定到 Pod 的持久卷（Volume），支持配置热更新。
