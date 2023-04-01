### Namespace

```shell
kubectl get ns
# NAME                 STATUS   AGE
# default              Active   123m
# kube-node-lease      Active   123m
# kube-public          Active   123m
# kube-system          Active   123m
# local-path-storage   Active   123m
```

### coreDNS

```shell
kubectl get all -n kube-system
# NAME                                             READY   STATUS    RESTARTS   AGE
# pod/coredns-787d4945fb-gm8s7                     1/1     Running   0          124m
# pod/coredns-787d4945fb-nrvbr                     1/1     Running   0          124m
# pod/etcd-kind-control-plane                      1/1     Running   0          124m
# pod/kindnet-9lckx                                1/1     Running   0          124m
# pod/kindnet-p79sj                                1/1     Running   0          124m
# pod/kindnet-vqxcr                                1/1     Running   0          124m
# pod/kube-apiserver-kind-control-plane            1/1     Running   0          124m
# pod/kube-controller-manager-kind-control-plane   1/1     Running   0          124m
# pod/kube-proxy-gw8v8                             1/1     Running   0          124m
# pod/kube-proxy-shqnx                             1/1     Running   0          124m
# pod/kube-proxy-vjpx8                             1/1     Running   0          124m
# pod/kube-scheduler-kind-control-plane            1/1     Running   0          124m

# NAME               TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
# service/kube-dns   ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   124m

# NAME                        DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
# daemonset.apps/kindnet      3         3         3       3            3           kubernetes.io/os=linux   124m
# daemonset.apps/kube-proxy   3         3         3       3            3           kubernetes.io/os=linux   124m

# NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
# deployment.apps/coredns   2/2     2            2           124m

# NAME                                 DESIRED   CURRENT   READY   AGE
```
