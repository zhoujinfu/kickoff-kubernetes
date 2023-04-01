### Blue-Green-Deployment

1. add new label `version: v1.0.0` to all the pods

2. deploy new versioned pods with `version: v1.0.1`

3. deploy new service select `version: v1.0.0`

4. remove old version pods (v1.0.0)


```shell
kubectl apply -f petclinic-pod-v1.0.0.yaml
kubectl apply -f petclinic-service.yaml

kubectl apply -f petclinic-pod-v1.0.1.yaml
# change `petclinic-service.yaml` selector version to v1.0.1
kubectl apply -f petclinic-service.yaml
```