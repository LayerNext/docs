---
---

# Download Datasets

The datasets created on dataset manager tool can be downloaded using `download_dataset` method in Python SDK.

```python
download_dataset(version_id, export_type)
```

## Parameters

| Parameter     | Value                     |
| ------------- | ------------------------- |
| `version_id`  | Id of the dataset version |
| `export_type` | Dataset export format     |

You can find the values for your dataset by going to **LayerNext** > **Dataset Manager** and clicking on the **Download** button under the **Export** tab of the dataset you want to download..

![Image showing instructions for downloading the dataset using the Python SDK](img/download-datasets-01.png)

## Example usage

```python
client.download_dataset("635eafbec1a605ab795d2768", "YOLO Darknet")
```
