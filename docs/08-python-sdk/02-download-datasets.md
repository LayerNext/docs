---
---

# Download datasets

The datasets created on dataset manager tool can be downloaded using `download_dataset` method in Python SDK. You need the following information to use it:

1. Id of the dataset version: `version_id`
2. Dataset export format: `export_type`

You can easily copy these values from LayerNext Dataset Manager tool by going to the "download" of required dataset export format as shown below:

![Image showing instructions for downloading the dataset using the Python SDK](img/download-datasets-01.png)

---

`download_dataset(version_id, export_type)`

Example usage:

```python
    client.download_dataset("635eafbec1a605ab795d2768", "YOLO Darknet")
```
