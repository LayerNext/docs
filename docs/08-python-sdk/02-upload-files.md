---
---

# 2. Uploading and Downloading Data

## 2.1. Upload Files to a Collection

You can upload file/files in a directory to a collection in the data lake - the same functionality as the upload facility given in the web frontend. Optionally, the user can include custom metadata, which may include attributes or additional information about the file. Only one type of content (either image or video) can be uploaded in a single API call.

```
upload_files_to_collection(path, content_type, collection_name, meta_data_object)
```

## Parameters

| Parameter          | Data type          | Value                                                                                                                                    |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | string | directory or file path (should be absolute path) - The SDK automatically identifies whether its a directory or single file based on the given path |
| `content_type`     | string | “image” for image files and “video” for video files                                                                                                                       |
| `collection_name`  | string | A name given for collection, if an existing collection name is given, then files will be added to that collection.                  |
| `meta_data_object` | dictionary | custom metadata field and value pairs                                                                                                       |

## Returns

ID of the new collection created.

## Example usage

```
meta_data_object = {
    "Captured Location": "Winnipeg",
    "Camera Id": "CAM_0001",
    "Tags": [
        "#retail"
    ]
}
client.upload_files_to_collection(‘/home/user/images, “image”, “my_collection”, meta_data_object)
```

## 2.2. Upload Files (Deprecated)

You can upload a single file or files in a directory to data lake with custom metadata. Only one type of content (either image or video) can be uploaded in a single API call.

```
file_upload(path, collection_type, collection_name, meta_data_object, override)
```

## Parameters

| Parameter          | Data type          | Value                                                                                                                                    |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | string | directory or file path (should be absolute path) - the SDK automatically identifies whether its a directory or single file based on path |
| `content_type`     | integer | 5 for image 4 for video                                                                                                                       |
| `collection_name`  | string | A name given for collection, if an existing collection name is given, then files will be added to that collection.                  |
| `meta_data_object` | dictionary | custom metadata field and value pairs                                                                                                       |
| `override` | boolean | If the value is set to True, the new file will override the existing file with the same name. Otherwise, the upload process will skip files with the same name.                                                                                                       |


## Example usage

```
meta_data_object = {
    "Captured Location": "Winnipeg",
    "Camera Id": "CAM_0001",
    "Tags": [
        "#retail"
    ]
}
client.file_upload(‘/home/user/images, 5, “my_collection”, meta_data_object)
```

## 2.3. Upload Model Predictions / Annotations

You can feed the Data Lake with a json file having model run output (machine) or ground truth (human) annotations for frames in a given image collection.

```
upload_annoations_for_folder(collection_name, operation_unique_id, json_data_file_path, annotation_shape_type, is_normalized, is_model_run)
```

Note that the correct file name should be set to the ‘image’ field in uploading Json. The format of the json file depends shape type of annotations.


## Sample JSON format for rectangle’

```
{
   "images":[
      {
         "image":"000000397133.jpg",
         "annotations":[
            {
               "bbox":[
                  217.62,
                  240.54,
                  38.99,
                  57.75
               ],
               "label":"kitchen",
               "metadata":{
                  "name":"bottle"
               },
               "confidence":0.30611335805442985
            }
         ]
      }
   ]
}

```

## Sample JSON format for ‘polygon’ and ‘line’

```
{
   "images":[
      {
         "image":"000000397133.jpg",
         "annotations":[
            {
               "polygon":[
                  [
                     224.24,
                     297.18
                  ],
                  [
                     228.29,
                     297.18
                  ],
                  [
                     234.91,
                     298.29
       	     ],
                  [
                     218.72,
                     295.71
                  ],
                  [
                     225.34,
                     297.55
                  ]
               ],
               "label":"kitchen",
               "metadata":{
                  "name":"bottle"
               },
               "confidence":0.8316836170368476
            }
         ]
      }
   ]
}

```

## Parameters

| Parameter          | Data type          | Value                                                                                                                                    |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_name`             | string | Name of the existing image collection |
| `operation_unique_id`     | string | This is a unique identifier that is used to distinguish between different sets of annotations. This ID is important in both human and machine annotations because it ensures that annotations from different sources are not mixed up. If the same ID is used for multiple API calls, the previous annotations will be replaced by the new ones. However, if a different ID is used, the new annotations will be added to the Data Lake.                                                                                                                       |
| `json_data_file_path`  | string | Absolute path of the json file having annotation data                  |
| `annotation_shape_type` | string | This can be ‘rectangle’, ‘polygon’ or ‘line’                                                                                                       |
| `Is_normalized` | boolean | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the Data Lake backend.                                                                                                       |
| `is_model_run` | boolean | True if this is machine annotations, False if this is human annotations                                                                                                       |


## Example usage

###### 1. For a model run

```
client.upload_annoations_for_folder(‘my_collection’, “yolov5.0.1”, ‘/my/file/path/file.json’, ‘polygon’, False, True)
```

###### 2. For a human annotation

```
client.upload_annoations_for_folder(‘my_collection’, “annotation_project_001”, ‘/my/file/path/file.json’, ‘polygon’, False, False)
```

## 2.4. Download Annotations of a Collection

We can download annotation data from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data and images in a folder. The user needs to supply the collection id which can be viewed from metadata inside the collection in the data lake frontend.

```
download_annotations(collection_id, model_id)
```

## Parameters

| Parameter          | Data type          | Value                                                                                                                                    |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`             | string | The image collection id in data lake |
| `model_id`     | string/None | If this is present, then the system fetches the annotations belonging to that model run, otherwise (if None) the ground truth data will be fetched instead.                                                                                                                       |


## Returns

The function creates a new directory with a specific name and saves a JSON file inside it. The JSON file contains annotations for a collection of data.
Then it downloads specific frames related to the collection and saves them in a directory called "data" within the newly created directory.


## Example usage

```
client.download_annotations(“63579fa0f7eb5e0e62d4705”, None)
```


