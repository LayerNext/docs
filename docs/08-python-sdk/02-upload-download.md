---
---

# 2. Uploading and Downloading

## 2.1. Upload Files to a Collection

You can upload files in a directory to a collection in the Data Lake (which is the same functionality as the 'Upload' feature in the web frontend). Optionally, you can include custom metadata, which may include attributes or additional information about the file. Only one type of content (either image or video) can be uploaded in a single API call.

Note that currently we are supporting following file types for upload: jpeg, jpg, png, mp4, mkv

```python
upload_files_to_collection(path, content_type, collection_name, meta_data_object)
```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | string | - | directory or file path (should be an absolute path) - The SDK automatically identifies whether it's a directory or single file based on the given path |
| `content_type`     | string | - | “image” for image files, “video” for video files and "other" for all other files                                                                                                                      |
| `collection_name`  | string | - | A name given for the collection. If an existing collection name is given, then files will be added to that collection.                  |
| `meta_data_object` | dictionary | - | custom metadata field and value pairs                                                                                                       |
| meta_data_override | boolean      | False | Optional: If this flag is True, the metadata of already uploaded files will be overridden, even if the file is skipped during the upload process.  |

## Returns

Id of the new collection created and the corresponding job Id

```python
{
    'is_success': True/False, 
    'job_id': '<Job Id of the operation>', 
    'collection_id': '<Id of the uploading collection>'
}
```

## Example usage

```python
meta_data_object = {
    "Captured Location": "Winnipeg",
    "Camera Id": "CAM_0001",
    "Tags": [
        "#retail"
    ]
}
upload_res = client.upload_files_to_collection(‘/home/user/images, “image”, “my_collection”, meta_data_object)
upload_job_id = upload_res['job_id']

#Waiting for upload processing to complete
client.wait_for_job_complete(upload_job_id)
print('Upload Completed!')
```

## 2.2. Upload Files (Deprecated)

You can upload a single file or files in a directory to the Data Lake with custom metadata. Only one type of content (either image or video) can be uploaded in a single API call.

```python
file_upload(path, collection_type, collection_name, meta_data_object, override)
```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | string | - | directory or file path (should be an absolute path) - the SDK automatically identifies whether its a directory or single file based on path |
| `content_type`     | integer | - | 5 for image 4 for video                                                                                                                       |
| `collection_name`  | string | - | A name given for collection, if an existing collection name is given, then files will be added to that collection.                  |
| `meta_data_object` | dictionary | - | custom metadata field and value pairs                                                                                                       |
| `override` | boolean | - | If the value is set to True, the new file will override the existing file with the same name. Otherwise, the upload process will skip files with the same name.                                                                                                       |


## Example usage

```python
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

```python
upload_annoations_for_folder(collection_name, operation_unique_id, json_data_file_path, annotation_shape_type, is_normalized, is_model_run, destination_project_id)
```

Note that the correct file name should be set to the ‘image’ field in uploading a json file. The format of the json file depends on the shape type of the annotations.


## JSON format for 'rectangle’

```json
{
   "images":[
      {
         "image":"<image_filename>",
         "annotations":[
            {
               "bbox":[
                  <top1_left_x(number)>,
                  <top1_left_y(number)>,
                  <width1(number)>,
                  <height1(number)>
               ],
               "label":"<label_name>",
               "metadata":{
                  "<attribute_name1>":"<attribute_value1>",
                  "<attribute_name2>":"<attribute_value2>"
               },
               "confidence":<confidence_value(number)>
            }
         ]
      }
   ]
}

```

## JSON format for ‘polygon’ and ‘line’

```json
{
   "images":[
      {
         "image":"000000397133.jpg",
         "annotations":[
            {
               "polygon":[
                  [
                     <point1_x(number)>,
                     <point1_y(number)>
                  ],
                  [
                     <point2_x(number)>,
                     <point2_y(number)>
                  ],
                  [
                     <pont3_x(number)>,
                     <point3_y(number)>
                  ]
               ],
               "label":"<label1>",
               "metadata":{
                  "<attribute1_name>":"<attribute1_value>"
               },
               "confidence":<confidence_value(number)>
            }
         ]
      }
   ]
}

```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_name`             | string | - | Name of the existing image collection |
| `operation_unique_id`     | string | - | This is a unique identifier that is used to distinguish between different sets of annotations. This ID is important in both human and machine annotations because it ensures that annotations from different sources are not mixed up. If the same ID is used for multiple API calls, the previous annotations will be replaced by the new ones. However, if a different ID is used, the new annotations will be added to the Data Lake.                                                                                                                       |
| `json_data_file_path`  | string | - | Absolute path of the json file having annotation data                  |
| `annotation_shape_type` | string | - | This can be ‘rectangle’, ‘polygon’ or ‘line’                                                                                                       |
| `Is_normalized` | boolean | - | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the Data Lake backend.                                                                                                       |
| `is_model_run` | boolean | - | True if this is machine annotations, False if this is human annotations                                                                                                       |
| `destination_project_id`(optional) | string | None | If this is given then annotations are copied to the given studio project - this can be used for attaching auto annotations to studio projects                                                                                                      |

## Example usage

###### 1. For a model run

```python
client.upload_annoations_for_folder(‘my_collection’, “yolov5.0.1”, ‘/my/file/path/file.json’, ‘polygon’, False, True)
```

###### 2. For a human annotation (Upload annotations to an existing project)

```python
client.upload_annoations_for_folder(‘my_collection’, “<annotation_project_id>”, ‘/my/file/path/file.json’, ‘polygon’, False, False)
```

## 2.4. Download Annotations of a Collection - Deprecated

We can download annotation data from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data and images. You need to supply the collection id which can be viewed from metadata inside the collection in the Data Lake frontend.

```python
download_annotations(collection_id, model_id)
```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`             | string | - | The image collection id in the Data Lake |
| `model_id`     | string/None | - | If this is present the system fetches the annotations belonging to that model run, otherwise (if None) the ground truth data will be fetched instead.                                                                                                                       |


## Returns

The function creates a new directory with a specific name and saves a JSON file inside it containing annotations for a collection of data.
Next, it downloads specific frames related to the collection and saves them in a directory called "data" within the newly created directory.


## Example usage

```python
client.download_annotations(“63579fa0f7eb5e0e62d4705”, None)
```


## 2.5. Download a Collection with Annotations

This function can be used for downloading annotation data for a list of any human or machine annotation operations from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data and images. 

```python
download_collection(collection_id, annotation_type, operation_id_list, custom_download_path)
```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`             | string | - | The image collection id in the Data Lake |
| `annotation_type`(Optional)     | string | all | Type of annotation to download - available values are: 'human', 'machine' or 'all'. Note that this is applicable only when operation_id_list is not given or empty.                                                                                                                        |
| `operation_id_list`(Optional)     | string | [] | List of required annotation operation ids - This can be  project id in case of human annotations or model id in case of machine annotations.                       
| `custom_download_path` (Optional)     | string | empty | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path. |

## Returns

The function creates a new directory with a specific name and saves a JSON file inside it containing annotations for the collection for all required annotation operations.
Next, it downloads specific frames related to the collection and saves them in a directory called "data" within the newly created directory.


## Example usage

```python
client.download_collection("<collection_id>", "human", ["project1_id", "project2_id"], "/my/custom/path")
```

## 2.6. Get Downloadable Url for a File

This function retrieves the URL of any file within the Data Lake, enabling its download.

```python
get_downloadable_url(file_key)
```

## Parameters

| Parameter          | Data type         | Default          | Description         |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `file_key`             | string | - | File path in the Data Lake |

## Returns

A signed URL is provided, enabling direct downloading of the corresponding file from the Data Lake. Please be aware that this URL has a limited lifespan, and it is crucial that your application does not reuse it.


## Example usage

```python
client.get_downloadable_url("my_collection/image1.jpeg")
```

## 2.7. Trash Items from a Collection

With this SDK function, all or a subset of items in a given collection can be moved to the trash.

```python
trash_objects_from_collection(collection_id, query, filter)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`     | string | - | Collection ID |
| `query` (Optional)     | string | - | The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified in the filter object as shown here:\n { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> }|


## Returns

```python
{
    'message': '[success_count] objects successfully trashed, [failed_count] objects failed to trash', 
    'isSuccess': 'True or False'
}
```

## 2.8. Trash Items from DataLake

Given items in DataLake can be trashed without specifying a collection, choosing a set of items using a query string and filters.

```python
trash_objects_from_datalake(datalake_query, datalake_filter, content_type)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `datalake_query` (Optional)     | string | - | The search query that filters items in the collection. This is the same query format that we use in the Data Lake frontend. |
| `datalake_filter` (Optional)     | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `content_type`     | string | "image" | Type of items that needs to be trashed: “image” or “video” |

## Returns

```python
{
    'message': '[success_count] objects successfully trashed, [failed_count] objects failed to trash', 
    'isSuccess': 'True or False'
}
```
