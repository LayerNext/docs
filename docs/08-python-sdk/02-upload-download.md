---
---

# 2. Uploading and Downloading

## 2.1. Upload Files to a Collection

You can upload files in a directory to a collection in the MetaLake (which is the same functionality as the 'Upload' feature in the web frontend). Optionally, you can include custom metadata and annotation data. Custom metadata may include attributes or additional information about the file. Annotation data may include labeling data for images. Only one type of content (either image or video) can be uploaded in a single API call.

Note that currently we are supporting following file types for upload: jpeg, jpg, png, mp4, mkv

```python
upload_files_to_collection(path, content_type, collection_name, meta_data_object, meta_data_override, file_meta_data_json_path, file_meta_data_json_path, storage_prefix_path, annotation_data)
```

## Parameters

| Parameter                             | Data type  | Default | Description                                                                                                                                                                                                                                           |
| ------------------------------------- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`                                | string     | -       | directory or file path (should be an absolute path) - The SDK automatically identifies whether it's a directory or single file based on the given path                                                                                                |
| `content_type`                        | string     | -       | “image” for image files, “video” for video files and "other" for all other files                                                                                                                                                                      |
| `collection_name`                     | string     | -       | A name given for the collection. If an existing collection name is given, then files will be added to that collection.                                                                                                                                |
| `meta_data_object` (optional)         | dictionary | {}      | Custom metadata fields and value pairs. These will be applied to all files that are going to be uploaded.                                                                                                                                             |
| `meta_data_override` (optional)       | boolean    | False   | If this flag is True, the metadata of already uploaded files will be overridden, even if the file is skipped during the upload process.                                                                                                               |
| `file_meta_data_json_path` (optional) | string     | None    | If we need to set specific metadata (both meta fields and tags) to each individual file, then we can give the path of the JSON file that contain these metadata. The format of the JSON is given below.                                               |
| `storage_prefix_path` (optional)      | string     | None    | By default, the uploaded file collection will be created in the root directory of the bucket. If you wish to avoid creating folders in the root directory and instead specify a specific directory, you can use this parameter. Ex: 'dir_1/sub_dir_1' |
| `annotation_data` (optional)          | dictionary | None    | Contains details about annotation data. Fields within this dictionary are described below.                                                                                                                                                            |

### `annotation_data` Fields

- `json_data_file_path`: (String) The absolute path of the JSON file containing annotation data.
- `operation_unique_id`: (String) A unique ID representing the relevant model run or annotation project. This ensures annotations from different sources aren't mixed. Using the same ID for multiple API calls will replace previous annotations with new ones.
- `is_normalized`: (Boolean) Set to True if normalized values (instead of actual pixel values) are provided for coordinates and dimensions. If True, conversion occurs at the MetaLake.
- `is_model_run`: (Boolean) Indicates the type of annotation: True for machine annotations and False for human annotations.

## Returns

The ID of the newly created collection and the corresponding job ID will be returned. The unique name of the file will be returned only if you upload a single file.

```python
{
    'is_success': True/False,
    'job_id': '<Job Id of the operation>',
    'collection_id': '<Id of the uploading collection>',
    'unique_name': '<unique name of the file>'
}
```

## JSON format of metadata for individual files

```JSON
{
	"files" : [
      {
         "file": "<file_name1>",
         "metadata": {
            "field1": "data1",
            "field2": "data2",
            "Tags": [
               "<tag1>", "<tag2>"
            ]
         }
      },
      {
         "file": "<file_name2>",
         "metadata": {
            "field1": "data3",
            "field3": "data4",
            "Tags": [
               "<tag2>","<tag3>"
            ]
         }
      }
	]
}
```

## Example usage:

###### 1. Upload with metadata for whole collection

```python
meta_data_object = {
    "Captured Location": "Winnipeg",
    "Camera Id": "CAM_0001",
    "Tags": [
        "#retail"
    ]
}
upload_res = client.upload_files_to_collection("/home/user/images", "image", "my_collection", meta_data_object)
upload_job_id = upload_res['job_id']

#Waiting for upload processing to complete
client.wait_for_job_complete(upload_job_id)
print('Upload Completed!')
```

###### 2. Upload with metadata specific to each file

```python
meta_data_object = {
    "Captured Location": "Toronto",
    "Camera Id": "CAM_0002",
    "Tags": [
        "#retail"
    ]
}
metadata_json_path = '/home/user/path/to/json/metadata.json'
upload_res = client.upload_files_to_collection("/home/user/images", "image", "my_collection1", meta_data_object, False, metadata_json_path)
```

## JSON format for annotation data with 'rectangle’ shape type

```json

{
    "images": [
       {
        "image": "image_file_name.jpg",
        "annotations": [
          {
            "type": "rectangle",
            "bbox": [
               <top1_left_x(number)>,
               <top1_left_y(number)>,
               <width1(number)>,
               <height1(number)>
            ],
            "confidence": 0.53,
            "label": "<label_name>",
            "metadata": {
              "<optional_meta_field1>": "<metadata_value1>",
              "<optional_meta_field2>": "<metadata_value2>"
            },
            "attributes": {
              "<optional_attribute_name1>": [
                {
                  "value": "<attribute_value1>",
                  "confidence": 0.35,
                  "metadata": {
                    "<optional_attribute_value1_metadata_field1>": "<attribute_metadata_value3>",
                    "<optional_attribute_value1_metadata_field2>": "<attribute_metadata_value4>"
                  }
                },
                {
                  "value": "attribute_value2",
                  "confidence": 0.33,
                  "metadata": {
                  }
                }
              ],
              "<optional_attribute_name2>": [
                {
                  "value": "<attribute_value3>",
                  "confidence": 0.23,
                  "metadata": {

                  }
                }
              ]
            }
          }
        ]
      }
    ]
}

```

## JSON format for annotation data with 'polygon' shape type

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "polygon",
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}
```

## JSON format for annotation data with 'line' shape type

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "line",
               "line":[
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}

```

###### 3. Upload with annotation data to each file

```python
meta_data_object = {
    "Captured Location": "Toronto",
    "Camera Id": "CAM_0002",
    "Tags": [
        "#retail"
    ]
}
metadata_json_path = '/home/user/path/to/json/metadata.json'
json_data_file_path = '/home/user/path/to/json/annotation.json'

upload_res = client.upload_files_to_collection(
   "/home/user/images",
   "image",
   "my_collection1",
    meta_data_object,
    False,
    metadata_json_path,
    None,
    {
      "json_data_file_path": json_data_file_path,
      "operation_unique_id": "car_human_annotations",
      "is_normalized": False,
      "is_model_run": False
    }
)
```

## 2.2. Upload Model Predictions / Annotations to a Collection in DataLake

You can feed the Data Lake with a json file having model run output (machine) or ground truth (human) annotations for frames in a given image collection.

```python
upload_annotations_for_collection(collection_name, operation_unique_id, json_data_file_path, is_normalized, is_model_run)
```

Note that the correct file name should be set to the ‘image’ field in uploading a json file. The format of the json file depends on the shape type of the annotations.

#### Limitations

This function is designed to upload annotations exclusively for images uploaded for a collection after the initial extraction of data from storage. Note that it is only compatible with images directly uploaded to the given collection. If images are added to the collection using the 'Add to collection' option, this function will not support them

## JSON format for 'rectangle’

```json

{
    "images": [
       {
        "image": "image_file_name.jpg",
        "annotations": [
          {
            "type": "rectangle",
            "bbox": [
               <top1_left_x(number)>,
               <top1_left_y(number)>,
               <width1(number)>,
               <height1(number)>
            ],
            "confidence": 0.53,
            "label": "<label_name>",
            "metadata": {
              "<optional_meta_field1>": "<metadata_value1>",
              "<optional_meta_field2>": "<metadata_value2>"
            },
            "attributes": {
              "<optional_attribute_name1>": [
                {
                  "value": "<attribute_value1>",
                  "confidence": 0.35,
                  "metadata": {
                    "<optional_attribute_value1_metadata_field1>": "<attribute_metadata_value3>",
                    "<optional_attribute_value1_metadata_field2>": "<attribute_metadata_value4>"
                  }
                },
                {
                  "value": "attribute_value2",
                  "confidence": 0.33,
                  "metadata": {
                  }
                }
              ],
              "<optional_attribute_name2>": [
                {
                  "value": "<attribute_value3>",
                  "confidence": 0.23,
                  "metadata": {

                  }
                }
              ]
            }
          }
        ]
      }
    ]
}

```

## JSON format for ‘polygon’

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "polygon",
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}
```

## JSON format for ‘line'

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "line",
               "line":[
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}

```

## Parameters

| Parameter             | Data type | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_name`     | string    | -       | Name of the existing image collection                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `operation_unique_id` | string    | -       | The ID of the relevant model run or annotation project. This is a unique identifier that is used to distinguish between different sets of annotations. This ID is important in both human and machine annotations because it ensures that annotations from different sources are not mixed up. If the same ID is used for multiple API calls, the previous annotations will be replaced by the new ones. However, if a different ID is used, the new annotations will be added to the MetaLake. |
| `json_data_file_path` | string    | -       | Absolute path of the json file having annotation data                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Is_normalized`       | boolean   | -       | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the MetaLake backend.                                                                                                                                                                                                                                                                                                               |
| `is_model_run`        | boolean   | -       | True if this is machine annotations, False if this is human annotations                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Example usage

```python
client.upload_annotations_for_collection('my_collection', 'yolov5.0.1', '/my/file/path/file.json', False, True)
```

## 2.3. Upload Model Predictions / Annotations to Images in a Storage Path

This function uploads annotation data in the same manner as "upload_annoations_for_collection" but targets images at a specified path within storage (e.g., a folder path inside an AWS S3 bucket). It is particularly useful for handling files retrieved during initial system crawling or data import from storage.

```python
upload_annotations_by_storage_path(operation_unique_id, json_data_file_path, is_normalized, is_model_run, bucket_name)
```

Note that for the ‘image’ field in uploading a json file, the correct path in the storage. Eg: If the image is in folder /folder/subfolder, then the 'image' should be '/folder/subfolder/image_name.jpg'.

## Parameters

| Parameter             | Data type | Default | Description                                                                                                                                                                        |
| --------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operation_unique_id` | string    | -       | The ID of the relevant model run or annotation project                                                                                                                             |
| `json_data_file_path` | string    | -       | Absolute path of the json file having annotation data                                                                                                                              |
| `Is_normalized`       | boolean   | -       | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the Data Lake backend. |
| `is_model_run`        | boolean   | -       | True if this is machine annotations, False if this is human annotations                                                                                                            |
| `bucket_name`         | string    | None    | The name of the bucket which images are located. If this not given, then the default bucket is assumed.                                                                            |

## Example usage

```python
client.upload_annotations_by_storage_path(“yolov5.0.1”, ‘/my/file/path/file.json’, False, True, 'img_bucket_2')
```

## JSON format example

```json
{
   "images": [
       {
        "image": "/path/in/bucket/image_file_name.jpg",
        "annotations": [
          {
            "type": "rectangle",
            "bbox": [
               358`,
               239,
               45,
               16
            ],
            "confidence": 0.53,
            "label": "<label_name>",
            "metadata": {

            }
          }
       }
   ]
}
```

## 2.4. Upload Model Predictions / Annotations to Images by Unique Name

This function uploads annotation data in the same way as 'upload_annotations_for_collection', but the images are referenced by the 'Unique Name', a metadata attribute generated by the DataLake. It is specifically useful for handling files contained in a virtual collection, where the 'upload_annotations_for_collection' function is not applicable.

```python
upload_annotations_by_unique_name(operation_unique_id, json_data_file_path, is_normalized, is_model_run)
```

Note that when uploading a JSON file, the 'Unique Name' of the relevant image should be specified in the ‘image’ field. If you download the files from DataLake, the file name will be set to match the 'Unique Name'

## Parameters

| Parameter             | Data type | Default | Description                                                                                                                                                                        |
| --------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operation_unique_id` | string    | -       | The ID of the relevant model run or annotation project                                                                                                                             |
| `json_data_file_path` | string    | -       | Absolute path of the json file having annotation data                                                                                                                              |
| `Is_normalized`       | boolean   | -       | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the Data Lake backend. |
| `is_model_run`        | boolean   | -       | True if this is machine annotations, False if this is human annotations                                                                                                            |

## Example usage

```python
client.upload_annotations_by_unique_name(“yolov5.0.1”, ‘/my/file/path/file.json’, False, True)
```

## JSON format example

```json
{
   "images": [
       {
        "image": "collection-name_image.jpg",
        "annotations": [
          {
            "type": "rectangle",
            "bbox": [
               330,
               102,
               20,
               32
            ],
            "confidence": 0.53,
            "label": "<label_name>",
            "metadata": {

            }
          }
       }
   ]
}
```

## 2.5. Upload Model Predictions / Annotations to Images by file upload job id

You can feed the Data Lake with a json file having model run output (machine) or ground truth (human) annotations for frames associated with a specific file upload job.

```python
upload_annotations_by_job_id(job_id, operation_unique_id, json_data_file_path, is_normalized, is_model_run)
```

Note that the correct file name should be set to the ‘image’ field in uploading a json file. The format of the json file depends on the shape type of the annotations.

## JSON format for 'rectangle’

```json

{
    "images": [
       {
        "image": "image_file_name.jpg",
        "annotations": [
          {
            "type": "rectangle",
            "bbox": [
               <top1_left_x(number)>,
               <top1_left_y(number)>,
               <width1(number)>,
               <height1(number)>
            ],
            "confidence": 0.53,
            "label": "<label_name>",
            "metadata": {
              "<optional_meta_field1>": "<metadata_value1>",
              "<optional_meta_field2>": "<metadata_value2>"
            },
            "attributes": {
              "<optional_attribute_name1>": [
                {
                  "value": "<attribute_value1>",
                  "confidence": 0.35,
                  "metadata": {
                    "<optional_attribute_value1_metadata_field1>": "<attribute_metadata_value3>",
                    "<optional_attribute_value1_metadata_field2>": "<attribute_metadata_value4>"
                  }
                },
                {
                  "value": "attribute_value2",
                  "confidence": 0.33,
                  "metadata": {
                  }
                }
              ],
              "<optional_attribute_name2>": [
                {
                  "value": "<attribute_value3>",
                  "confidence": 0.23,
                  "metadata": {

                  }
                }
              ]
            }
          }
        ]
      }
    ]
}

```

## JSON format for ‘polygon’

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "polygon",
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}
```

## JSON format for ‘line'

```json
{
   "images":[
      {
         "image":"image_file_name.jpg",
         "annotations":[
            {
               "type": "line",
               "line":[
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
               "label":"<label_name>",
               "confidence": 0.53,
               "metadata":{
                  "<meta_field_name1>":"<metadata_value1>"
               }
            }
         ]
      }
   ]
}

```

## Parameters

| Parameter             | Data type | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `job_id`              | string    | -       | The id for the MetaLake job associated with the file upload                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `operation_unique_id` | string    | -       | The ID of the relevant model run or annotation project. This is a unique identifier that is used to distinguish between different sets of annotations. This ID is important in both human and machine annotations because it ensures that annotations from different sources are not mixed up. If the same ID is used for multiple API calls, the previous annotations will be replaced by the new ones. However, if a different ID is used, the new annotations will be added to the MetaLake. |
| `json_data_file_path` | string    | -       | Absolute path of the json file having annotation data                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Is_normalized`       | boolean   | -       | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the MetaLake backend.                                                                                                                                                                                                                                                                                                               |
| `is_model_run`        | boolean   | -       | True if this is machine annotations, False if this is human annotations                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Example usage

```python
client.upload_annotations_by_job_id('654c5167a467d18f9fdb767c', 'yolov5.0.1', '/my/file/path/file.json', False, True)
```

## 2.6. Upload Model Predictions / Annotations -- Deprecated

You can feed the Data Lake with a json file having model run output (machine) or ground truth (human) annotations for frames in a given image collection.

```python
upload_annoations_for_folder(collection_name, operation_unique_id, json_data_file_path, shape_type, is_normalized, is_model_run, destination_project_id)
```

Note that the correct file name should be set to the ‘image’ field in uploading a json file. The format of the json file depends on the shape type of the annotations.

### ⚠️ **Deprecation Warning**

> The function `upload_annoations_for_folder` is **deprecated** and will be removed in a future version.
>
> We recommend transitioning to one of the following functions based on your needs:
>
> 1. `upload_annotations_for_collection`
> 2. `upload_annotations_by_storage_path`
> 3. `upload_annotations_by_unique_name`
> 4. `upload_annotations_by_job_id`
>
> Please update your existing code to these new functions to avoid potential issues.

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

| Parameter                          | Data type | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_name`                  | string    | -       | Name of the existing image collection                                                                                                                                                                                                                                                                                                                                                                                                    |
| `operation_unique_id`              | string    | -       | This is a unique identifier that is used to distinguish between different sets of annotations. This ID is important in both human and machine annotations because it ensures that annotations from different sources are not mixed up. If the same ID is used for multiple API calls, the previous annotations will be replaced by the new ones. However, if a different ID is used, the new annotations will be added to the Data Lake. |
| `json_data_file_path`              | string    | -       | Absolute path of the json file having annotation data                                                                                                                                                                                                                                                                                                                                                                                    |
| `shape_type`                       | string    | -       | Type of the annotations - can be rectangle, polygon, or line.                                                                                                                                                                                                                                                                                                                                                                            |
| `Is_normalized`                    | boolean   | -       | True if normalized values for coordinates and dimensions are provided instead of real pixel values in the image. If this is True, conversion will happen at the Data Lake backend.                                                                                                                                                                                                                                                       |
| `is_model_run`                     | boolean   | -       | True if this is machine annotations, False if this is human annotations                                                                                                                                                                                                                                                                                                                                                                  |
| `destination_project_id`(optional) | string    | None    | If this is given then annotations are copied to the given studio project - this can be used for attaching auto annotations to studio projects                                                                                                                                                                                                                                                                                            |

## Example usage

###### 1. For a model run

```python
client.upload_annoations_for_folder(‘my_collection’, “yolov5.0.1”, ‘/my/file/path/file.json’, ‘polygon’, False, True)
```

###### 2. For a human annotation (Upload annotations to an existing project)

```python
client.upload_annoations_for_folder(‘my_collection’, “<annotation_project_id>”, ‘/my/file/path/file.json’, ‘polygon’, False, False)
```

## 2.7. Download a Collection with Annotations

This function can be used for downloading annotation data for a list of any human or machine annotation operations from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data and images.

```python
download_collection(collection_id, annotation_type, operation_id_list, custom_download_path, is_media_include)
```

## Parameters

| Parameter                         | Data type | Default | Description                                                                                                                                                                                                                                  |
| --------------------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`                   | string    | -       | The image collection id in the Data Lake                                                                                                                                                                                                     |
| `annotation_type`(Optional)       | string    | all     | Type of annotation to download - available values are: 'human', 'machine' or 'all'. Note that this is applicable only when operation_id_list is not given or empty.                                                                          |
| `operation_id_list`(Optional)     | string    | []      | List of required annotation operation ids - This can be project id in case of human annotations or model id in case of machine annotations.                                                                                                  |
| `custom_download_path` (Optional) | string    | empty   | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path.                                                         |
| `is_media_include` (Optional)     | boolean   | True    | If the value of this field is set to True, the system will download both the annotation data and the associated media files. If the value is set to False, only the annotation data will be downloaded, and the media files will be skipped. |

## Returns

The function creates a new directory with a specific name and saves a JSON file inside it containing annotations for the collection for all required annotation operations.
Next, it downloads specific frames related to the collection and saves them in a directory called "data" within the newly created directory.

## Example usage

```python
client.download_collection("<collection_id>", "human", ["project1_id", "project2_id"], "/my/custom/path")
```

## 2.8. Download Annotations of a Collection -- Deprecated

We can download annotation data from a given image collection. It will dump the annotations as JSON format - the same format we use for uploading annotations data and images. You need to supply the collection id which can be viewed from metadata inside the collection in the Data Lake frontend.

```python
download_annotations(collection_id, model_id)
```

### ⚠️ **Deprecation Warning**

> This function, `download_annotations(collection_id, model_id)`, is deprecated and will be removed in a future version. Please use the `download_collection` function instead for future developments and consider updating existing code to avoid issues when this function is eventually removed.

## Parameters

| Parameter       | Data type   | Default | Description                                                                                                                                           |
| --------------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id` | string      | -       | The image collection id in the Data Lake                                                                                                              |
| `model_id`      | string/None | -       | If this is present the system fetches the annotations belonging to that model run, otherwise (if None) the ground truth data will be fetched instead. |

## Returns

The function creates a new directory with a specific name and saves a JSON file inside it containing annotations for a collection of data.
Next, it downloads specific frames related to the collection and saves them in a directory called "data" within the newly created directory.

## Example usage

```python
client.download_annotations(“63579fa0f7eb5e0e62d4705”, None)
```

## 2.9. Get Downloadable Url for a File

This function retrieves the URL of any file within the Data Lake, enabling its download.

```python
get_downloadable_url(file_key)
```

## Parameters

| Parameter  | Data type | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `file_key` | string    | -       | File unique name in the MetaLake |

## Returns

A signed URL is provided, enabling direct downloading of the corresponding file from storage. Please be aware that this URL has a limited lifespan, and it is crucial that your application does not reuse it.

## Example usage

```python
client.get_downloadable_url("my_file_unique_name_1.jpeg")
```

## 2.10. Trash Items from a Collection

With this SDK function, all or a subset of items in a given collection can be moved to the trash.

```python
trash_objects_from_collection(collection_id, query, filter)
```

## Parameters

| Parameter           | Data type | Default | Description                                                                                                                                                                                                                                                                                       |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`     | string    | -       | Collection ID                                                                                                                                                                                                                                                                                     |
| `query` (Optional)  | string    | -       | The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend )                                                                                                                                                                  |
| `filter` (Optional) | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified in the filter object as shown here:\n { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> } |

## Returns

```python
{
    'message': '[success_count] objects successfully trashed, [failed_count] objects failed to trash',
    'isSuccess': 'True or False'
}
```

## 2.11. Trash Items from DataLake

Given items in DataLake can be trashed without specifying a collection, choosing a set of items using a query string and filters.

```python
trash_objects_from_datalake(datalake_query, datalake_filter, content_type)
```

## Parameters

| Parameter                    | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ---------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datalake_query` (Optional)  | string    | -       | The search query that filters items in the collection. This is the same query format that we use in the Data Lake frontend.                                                                                                                                                 |
| `datalake_filter` (Optional) | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `content_type`               | string    | "image" | Type of items that needs to be trashed: “image” or “video”                                                                                                                                                                                                                  |

## Returns

```python
{
    'message': '[success_count] objects successfully trashed, [failed_count] objects failed to trash',
    'isSuccess': 'True or False'
}
```

## 2.13. Update metadata for a collection

This function can be used for updating metadata for a given collection. By default, the metadata will be applied for all the files under that collection too.

```python
upload_metadata_for_collection(collection_name, content_type, metadata_obj, is_apply_to_all_files)
```

## Parameters

| Parameter                          | Data type  | Default | Description                                                                                                 |
| ---------------------------------- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `collection_name`                  | string     | -       | Name of the collection in the MetaLake                                                                      |
| `content_type`                     | string     | -       | Type of files in the collection. "image" for image files, "video" for video files and "other" for all other |
| `metadata_obj`                     | dictionary | {}      | Custom metadata field and value pairs to be applied to the collection.                                      |
| `is_apply_to_all_files` (Optional) | boolean    | True    | If this is False, then given metadata will be applied only to the collection head                           |

## Returns

```python
{
    'message': 'Error message if there is any',
    'isSuccess': 'True or False'
}
```

## Example usage

```python
client.upload_metadata_for_collection("my_collection", "image", {
    "Captured Location": "Winnipeg",
    "Camera Id": "CAM_0001",
    "Tags": [
        "#retail"
    ]
})
```

## 2.14. Update metadata for files of a specific file upload

This function is used to update metadata for all or a set of files associated with a specific file upload job.

```python
upload_metadata_by_job_id(job_id, json_data_file_path )
```

Note that the correct file name should be set to the 'file' field in uploading a json file.

## JSON format for metadata file

```json
{
  "files": [
    {
      "file": "dog_1.jpeg",
      "metadata": {
        "field1": "data1",
        "field2": "data2",
        "Tags": ["retail", "night", "skip"]
      }
    },
    {
      "file": "dog_2.jpeg",
      "metadata": {
        "field1": "data2",
        "Tags": ["night"]
      }
    },
    {
      "file": "flower3.jpg",
      "metadata": {
        "fileSize": 30
      }
    },
    {
      "file": "Dog_3.jpeg",
      "metadata": {
        "field3": "data4",
        "field1": "data3",
        "Tags": ["morning", "testing", "skip"]
      }
    }
  ]
}
```

## Parameters

| Parameter                  | Data type | Default | Description                                                                    |
| -------------------------- | --------- | ------- | ------------------------------------------------------------------------------ |
| `job_id`                   | string    | -       | The id for the MetaLake job associated with the file upload                    |
| `file_meta_data_json_path` | string    | -       | Path to the JSON file containing metadata for the each file in the collection. |

## Returns

```python
{
    'message': 'Error message if there is any',
    'isSuccess': 'True or False'
}
```

## Example usage

```python
client.upload_metadata_by_job_id("654c5167a467d18f9fdb767c", "/path/to/my/file_metadata.json")
```

## 2.15. Update metadata for files in a Storage Path

This function updates metadata by targeting images at a specified path within storage (e.g., a file path inside an AWS S3 bucket). It is particularly useful for handling files retrieved during initial system crawling or data import from storage.

```python
upload_metadata_by_storage_path(json_data_file_path, bucket_name)
```

Note that for the 'file' field in json file should be the correct file path of the file in the storage. Eg: If an image is in folder /folder/subfolder, then the 'file' should be 'folder/subfolder/image_name.jpg'.

## JSON format for metadata file

```json
{
  "files": [
    {
      "file": "folder/subfolder/image_name_1.jpeg",
      "metadata": {
        "field1": "data1",
        "field2": "data2",
        "Tags": ["retail", "night", "skip"]
      }
    },
    {
      "file": "folder/subfolder/image_name_2.jpeg",
      "metadata": {
        "field3": "data4",
        "field1": "data3",
        "Tags": ["morning", "testing", "skip"]
      }
    }
  ]
}
```

## Parameters

| Parameter                  | Data type | Default | Description                                                                                             |
| -------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `file_meta_data_json_path` | string    | -       | Path to the JSON file containing metadata for the each file in the collection.                          |
| `bucket_name` (optional)   | string    | None    | The name of the bucket which images are located. If this not given, then the default bucket is assumed. |

## Returns

```python
{
    'message': 'Error message if there is any',
    'isSuccess': 'True or False'
}
```

## Example usage

```python
client.upload_metadata_by_storage_path("654c5167a467d18f9fdb767c", "/path/to/my/file_metadata.json")
```

## 2.16. Update metadata for files by unique name

Uploads metadata for a file to the MetaLake using the file's 'Unique Name' as a reference.
The 'Unique Name' is a unique identifier for each file, generated by the MetaLake.

```python
upload_metadata_by_unique_name(json_data_file_path)
```

Note that when uploading a JSON file, the 'Unique Name' of the relevant image should be specified in the 'file' field. If you download the files from DataLake, the file name will be set to match the 'Unique Name'

## JSON format for metadata file

```json
{
  "files": [
    {
      "file": "collection_image_name_1.jpeg",
      "metadata": {
        "field1": "data1",
        "field2": "data2",
        "Tags": ["retail", "night", "skip"]
      }
    },
    {
      "file": "collection_image_name_2.jpeg",
      "metadata": {
        "field3": "data4",
        "field1": "data3",
        "Tags": ["morning", "testing", "skip"]
      }
    }
  ]
}
```

## Parameters

| Parameter                  | Data type | Default | Description                                                                    |
| -------------------------- | --------- | ------- | ------------------------------------------------------------------------------ |
| `file_meta_data_json_path` | string    | -       | Path to the JSON file containing metadata for the each file in the collection. |

## Returns

```python
{
    'message': 'Error message if there is any',
    'isSuccess': 'True or False'
}
```

## Example usage

```python
client.upload_metadata_by_storage_path("654c5167a467d18f9fdb767c", "/path/to/my/file_metadata.json")
```

## 2.17. Update metadata for given set of individual files in a collection

This function is used to update metadata for all or a set of files in a given collection.

```python
upload_metadata_for_files(collection_name, content_type, file_meta_data_json_path )
```

Note that the correct file name should be set to the 'file' field in uploading a json file.

#### Limitations

This function is designed to update metadata exclusively for files uploaded for a collection after the initial extraction of data from storage. Note that it is only compatible with files directly uploaded to the given collection. If files are added to the collection using the 'Add to collection' option, this function will not support them.

## JSON format for metadata file

```json
{
  "files": [
    {
      "file": "dog_1.jpeg",
      "metadata": {
        "field1": "data1",
        "field2": "data2",
        "Tags": ["retail", "night", "skip"]
      }
    },
    {
      "file": "dog_2.jpeg",
      "metadata": {
        "field1": "data2",
        "Tags": ["night"]
      }
    },
    {
      "file": "flower3.jpg",
      "metadata": {
        "fileSize": 30
      }
    },
    {
      "file": "Dog_3.jpeg",
      "metadata": {
        "field3": "data4",
        "field1": "data3",
        "Tags": ["morning", "testing", "skip"]
      }
    }
  ]
}
```

## Parameters

| Parameter                  | Data type | Default | Description                                                                                                 |
| -------------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `collection_name`          | string    | -       | Name of the collection in the MetaLake                                                                      |
| `content_type`             | string    | -       | Type of files in the collection. "image" for image files, "video" for video files and "other" for all other |
| `file_meta_data_json_path` | string    | -       | Path to the JSON file containing metadata for the each file in the collection.                              |

## Returns

```python
{
    'message': 'Error message if there is any',
    'isSuccess': 'True or False'
}
```

## Example usage

```python
client.upload_metadata_for_files("my_collection", "image",  "/path/to/my/file_metadata.json")
```

## 2.18. Upload Files -- Deprecated

You can upload a single file or files in a directory to the Data Lake with custom metadata. Only one type of content (either image or video) can be uploaded in a single API call.

```python
file_upload(path, collection_type, collection_name, meta_data_object, override)
```

## Parameters

| Parameter          | Data type  | Default | Description                                                                                                                                                     |
| ------------------ | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | string     | -       | directory or file path (should be an absolute path) - the SDK automatically identifies whether its a directory or single file based on path                     |
| `content_type`     | integer    | -       | 5 for image 4 for video                                                                                                                                         |
| `collection_name`  | string     | -       | A name given for collection, if an existing collection name is given, then files will be added to that collection.                                              |
| `meta_data_object` | dictionary | -       | custom metadata field and value pairs                                                                                                                           |
| `override`         | boolean    | -       | If the value is set to True, the new file will override the existing file with the same name. Otherwise, the upload process will skip files with the same name. |

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

## 2.19. Download files from MetaLake

Download files from MetaLake based on specified criteria and pagination details.

```python
client.download_files_from_metalake(
            item_type,
            custom_download_path,
            page_index,
            page_size,
            query,
            filter
        )
```

## Parameters

| Parameter               | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_type`             | string    | 'image' | One of the following: "image", "video" or "other".                                                                                                                                                                                                                          |
| `custom_download_path`  | string    | -       | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path.                                                                                        |
| `page_index` (Optional) | integer   | 0       | The index of the page, starting from 0.                                                                                                                                                                                                                                     |
|                         |
| `page_size` (Optional)  | integer   | 20      | The size of the page. The maximum allowed value is 1000.                                                                                                                                                                                                                    |
| `query` (Optional)      | string    | -       | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |

## Returns

A dictionary with a boolean success flag and an optional message.

```python
{
    "is_success":True/False,
    "message":<optinal_message>
}
```

if no more pages to download

```python
{
   "is_success": False,
   "message": "No more pages to download"
}
```

## Example Usage

```python
client.download_files_from_metalake(
        "image",
        "/home/download_folder",
        0,
        20
        "annotation.label=Bird",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2022-08-02",
            "to_date": "2023-01-19",
        }

)
```

## 2.20. Download files from a MetaLake collection

Download files from a MetaLake collection based on specified criteria and pagination details.

```python
client.download_files_from_collection(
            collection_id,
            custom_download_path,
            page_index,
            page_size,
            query,
            filter
)
```

## Parameters

| Parameter               | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`         | string    | -       | The ID of the collection                                                                                                                                                                                                                                                    |
| `custom_download_path`  | string    | -       | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path.                                                                                        |
| `page_index` (Optional) | integer   | 0       | The index of the page, starting from 0.                                                                                                                                                                                                                                     |
|                         |
| `page_size` (Optional)  | integer   | 20      | The size of the page. The maximum allowed value is 1000.                                                                                                                                                                                                                    |
| `query` (Optional)      | string    | -       | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |

## Returns

A dictionary with a boolean success flag and an optional message.

```python
{
    "is_success":True/False,
    "message":<optinal_message>
}
```

if no more pages to download

```python
{
   "is_success": False,
   "message": "No more pages to download"
}
```

## Example Usage

```python
client.download_files_from_collection(
        "65004ce4365f0510adb2f649",
        "/home/download_folder",
        0,
        20,
        "annotation.label=Bird",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2022-08-02",
            "to_date": "2023-01-19",
        }
)
```
