---
---

# Download Annotations

We can download annotation data from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data. The user needs to supply the collection id which can be viewed from metadata inside the collection in data lake frontend.

```python
download_annotations(collection_id, model_id)
```

## Parameters

| Parameter             | Value                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `collection_id`       | The image collection id in data lake                                                                                     |
| `model_id` (optional) | If this is present, then it fetches the annotations for that model run, otherwise the ground truth data will be fetched. |

## Example usage

```python
client.download_annotations(“63579fa0f7eb5e0e62d4705”)
```
