---
---

# Upload Images and Videos

Users can upload a single file or files in a directory to data lake with custom metadata - the same functionality as the upload facility given in the web frontend. Only one type of content (either image or video) can be uploaded in a single API call.

```python
file_upload(path, content_type, collection_name, meta_data_object)
```

## Parameters

| Parameter          | Value                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | directory or file path (should be absolute path) - the SDK automatically identifies whether its a directory or single file based on path |
| `content_type`     | "image" or "video"                                                                                                                       |
| `collection_name`  | A name given by user for collection, if existing collection name is given, then files will be added to that collection.                  |
| `meta_data_object` | Dictionary having custom meta data                                                                                                       |

## Example usage

```python
meta_data_object = {
    "Captured Location": "test_location",
    "Camera Id": "aaa",
    "Tags": [
        "#retail"
    ],
    "bird": "flying"
}
client.file_upload("/home/user/images/my_directory", "image", "my_collection", meta_data_object)
```
