### 存储解耦

* PersistentVolumeClaim (PVC)
* PersistentVolume (PV)

```
                                      静态绑定
Pod -> Volume -> PersistentVolumeClaim => PersistentVolume -> Physical
                           | 动态绑定                          Storage
                           V                                  Physical
                        StorageClass -> StorageProvisioner -> Storage
```

