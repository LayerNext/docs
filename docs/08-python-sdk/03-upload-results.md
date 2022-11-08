---
---

# Upload results

You can feed the Data Lake with a json file having model run output for each image in a DataLake image collection. The correct file name should be set to the ‘image’ field in uploading Json. The format of the json file depends shape type of annotations.

```python
upload_modelrun_from_json(collection_base_path, model_id, json_data_file_path, shape_name)
```

Parameters:

| Parameter            | Value                                        |
| -------------------- | -------------------------------------------- |
| collection_base_path | “S3 path of the relevant collection”         |
| model_id             | model_id                                     |
| json_data_file_path  | "/path/to/my/file"                           |
| shape_name           | This can be `rectangle`, `polygon` or `line` |

Sample JSON format for `rectangle`:

```json
{
    "images": [
        {
            "image": "000000397133.jpg",
            "annotations": [
                {
                    "bbox": [217.62, 240.54, 38.99, 57.75],
                    "label": "kitchen",
                    "metadata": {
                        "name": "bottle"
                    },
                    "confidence": 0.30611335805442985
                }
            ]
        }
    ]
}
```

Sample JSON format for `polygon` and `line`:

```json
{
    "images": [
        {
            "image": "000000397133.jpg",
            "annotations": [
                {
                    "polygon": [
                        [224.24, 297.18],
                        [228.29, 297.18],
                        [234.91, 298.29],
                        [241.53, 260.04],
                        [224.24, 255.62],
                        [217.62, 268.5],
                        [218.72, 295.71],
                        [225.34, 297.55]
                    ],
                    "label": "kitchen",
                    "metadata": {
                        "name": "bottle"
                    },
                    "confidence": 0.8316836170368476
                }
            ]
        }
    ]
}
```

Example usage:

```javascript
	client.upload_modelrun_from_json(‘s3_path/to/collection/’, “yolov5.0.1”, ‘/my/file/path/file.json’, ‘polygon’)
```
