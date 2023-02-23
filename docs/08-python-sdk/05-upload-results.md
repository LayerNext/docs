---
---

# 5. Working with Datasets

## 5.1. Download datasets

You can use the "download_dataset" method in the Python SDK to download the datasets that were created in the Dataset Manager App. You need the following information to use it

###### 1. Id of the dataset version: `version_id`
###### 2. Dataset export format: `export_type`

You can easily copy above values from LayerNext Dataset Manager tool by accessing the ‘download’ of required dataset export format as shown below

![Product UI showing steps to download the dataset](img/download-datasets-01.png)

```python
download_dataset(version_id, export_type)
```

## Example Usage

```python
client.download_dataset("635eafbec1a605ab795d2768", "YOLO Darknet")
```
