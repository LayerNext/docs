---
---

# 3. Annotation Projects

The LayerNext SDK provides functionality for managing Annotation Studio projects, including creating, updating, downloading, and deleting them.

## 3.1. Create an Annotation Project from a Collection

With this SDK function, an annotation project can be created from all or a subset of frames in a given collection in the DataLake.

```python
create_annotation_project_from_collection(project_name, collection_id, query, filter, fps, frames_per_task, assign_project_to_annotation, send_email)
```

## Parameters

| Parameter                    | Data type | Default | Description                                                                                                                                                                                                                                                                                       |
| ---------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_name`               | string    | -       | Project name (should be non-empty)                                                                                                                                                                                                                                                                |
| `collection_id`              | string    | -       | Collection ID                                                                                                                                                                                                                                                                                     |
| `query` (Optional)           | string    | -       | The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend )                                                                                                                                                                  |
| `filter` (Optional)          | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified in the filter object as shown here:\n { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> } |
| `fps` (Optional)             | integer   | 4       | For video projects: the number of frames per second. If 0 is provided then all frames are taken. For image projects: this parameter has no effect.                                                                                                                                                |
| `frames_per_task` (Optional) | integer   | 120     | Specifies the number of frames or images attached to the each annotation task.                                                                                                                                                                                                                    |
| `assign_to_all` (Optional)   | boolean   | False   | If True, all annotators will be assigned to the project, otherwise none will be assigned.                                                                                                                                                                                                         |
| `send_email` (Optional)      | boolean   | False   | This is applicable if assign_to_all is True - If this flag is True, then emails are sent to the assigned annotators                                                                                                                                                                               |

## Returns

Id of the project that was created and the corresponding job id.

```python
{
    'id': '<Id of the project created / updated >',
    'job_id': '<Job Id of the operation>'
}
```

## Example Usage

To create a project from images having the Meta Tag “water” and containing human annotations from a given collection:

```python
project_res = client.create_annotation_project_from_collection("My Project”, "<collection id>”, "MetaData.Tags=water", {“annotation_types”: [“human”]}, 4, 10, True )
proj_job_id = project_res['job_id']

#Wait until all tasks are created in the project
client.wait_for_job_complete(proj_job_id)
```

## 3.2. Create an Annotation Project without a collection

An annotation project can be created without specifying a collection, choosing a set of items using a query string and filters.

```python
create_annotation_project_from_datalake(project_name, Data Lake_query, Data Lake_filter, content_type:, fps, frames_per_task, is_assign_annotators, send_email)
```

## Parameters

| Parameter                     | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ----------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_name`                | string    | -       | Project name (should be non-empty)                                                                                                                                                                                                                                          |
| `Data Lake_query` (Optional)  | string    | -       | The search query that filters items in the collection. This is the same query format that we use in the Data Lake frontend.                                                                                                                                                 |
| `Data Lake_filter` (Optional) | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `content_type`                | string    | -       | “image” or “video”                                                                                                                                                                                                                                                          |
| `fps` (Optional)              | integer   | 4       | Number of frames per second in case of video projects. If 0 is given, then all frames are taken.                                                                                                                                                                            |
| `frames_per_task` (Optional)  | integer   | 120     | Specifies the number of images or frames attached to each annotation task.                                                                                                                                                                                                  |
| `assign_to_all` (Optional)    | boolean   | False   | If True, all annotators will be assigned to the project, otherwise none will be assigned.                                                                                                                                                                                   |
| `send_email` (Optional)       | boolean   | False   | This is applicable if assign_to_all is True - If this flag is True, then emails are sent to the assigned annotators                                                                                                                                                         |

## Returns

Id of the project that was created and the corresponding job id.

```python
{
    'id': '<Id of the project created / updated >',
    'job_id': '<Job Id of the operation>'
}
```

## Example Usage

```python
project_res = client.create_annotation_project_from_datalake("My Project", "metadata.Tags=water", {}, "image" )
proj_job_id = project_res['job_id']

#Wait until all tasks are created in the project
client.wait_for_job_complete(proj_job_id)
```

## 3.3. List All Projects

Use the following function to get a list of all annotation projects.

```python
get_annotation_project_list()
```

A list of all project id-name pairs in the system will be returned.

## 3.4. Set Label (Ontology) Group for a Project

To set labels for a project, we can attach an existing group of ontology(labels). To create a group of labels, please refer to the function for label group creation.

```python
attach_label_group_to_annotation_project(project_id, group_id)
```

## Parameters

| Parameter    | Data type | Default | Description                                        |
| ------------ | --------- | ------- | -------------------------------------------------- |
| `project_id` | string    | -       | Id of the project in which labels shall be updated |
| `group_id`   | string    | -       | Label group Id                                     |

## Example Usage

```python
client.attach_label_group_to_annotation_project( “<project_id>”, “<label_group_id>”)
```

## 3.5. Download Annotations for Projects

This function is designed to download specific frames with annotations that belong to a particular annotation projects.The downloaded frames can be stored in a local folder for easy access and use.

```python
download_annotation_projects(project_id_list, task_status_list, is_annotated_only, custom_download_path, is_media_include)
```

## Parameters

| Parameter                         | Data type | Default | Description                                                                                                                                                                                                                                                                                                          |
| --------------------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id_list`                 | array     | []      | ID of the project                                                                                                                                                                                                                                                                                                    |
| `task_status_list` (Optional)     | array     | []      | To filter the images by status of the relevant task, we can give a list of status values. The valid values are: “in_progress”, “completed”, “accepted”, “qa_completed”, "rejected", "fixed", "fixing", "not_started", "qa_rejected", "qa_in_review". By default, no filtering of tasks applied (all tasks included). |
| `Is_annotated_only` (Optional)    | boolean   | False   | if this is True, then only the annotated images are downloaded.                                                                                                                                                                                                                                                      |
| `custom_download_path` (Optional) | string    | empty   | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path.                                                                                                                                 |
| `is_media_include` (Optional)     | boolean   | True    | If the value of this field is set to True, the system will download both the annotation data and the associated media files. If the value is set to False, only the annotation data will be downloaded, and the media files will be skipped.                                                                         |

The downloaded JSON data format is the same as download annotations from collection.

## Example Usage

To download only the completed or accepted tasks:

```python
client.download_annotation_projects([<project_id>,<project_id>], [’completed’,’accepted’])
```

## 3.6. Download Annotations for Project -- Deprecated

This function is designed to download specific frames with annotations that belong to a particular annotation project.The downloaded frames can be stored in a local folder for easy access and use.

```python
download_project_annotations(project_id, task_status_list, is_annotated_only, custom_download_path, is_media_include)
```

### ⚠️ **Deprecation Warning**

> This function, `download_project_annotations(project_id, task_status_list, is_annotated_only, custom_download_path, is_media_include)`, is deprecated and will be removed in a future version. Please use the `download_annotation_projects` function instead for future developments and consider updating existing code to avoid issues when this function is eventually removed.

## Parameters

| Parameter                         | Data type | Default | Description                                                                                                                                                                                                                                                                                                          |
| --------------------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`                      | string    | -       | ID of the project                                                                                                                                                                                                                                                                                                    |
| `task_status_list` (Optional)     | array     | []      | To filter the images by status of the relevant task, we can give a list of status values. The valid values are: “in_progress”, “completed”, “accepted”, “qa_completed”, "rejected", "fixed", "fixing", "not_started", "qa_rejected", "qa_in_review". By default, no filtering of tasks applied (all tasks included). |
| `Is_annotated_only` (Optional)    | boolean   | False   | if this is True, then only the annotated images are downloaded.                                                                                                                                                                                                                                                      |
| `custom_download_path` (Optional) | string    | empty   | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path.                                                                                                                                 |
| `is_media_include` (Optional)     | boolean   | True    | If the value of this field is set to True, the system will download both the annotation data and the associated media files. If the value is set to False, only the annotation data will be downloaded, and the media files will be skipped.                                                                         |

The downloaded JSON data format is the same as download annotations from collection.

## Example Usage

To download only the completed or accepted tasks:

```python
client.download_project_annotations(<project_id>, [’completed’,’accepted’])
```

## 3.7. Add Files to a Project from a Collection

In addition to creating new annotation projects from collections we can also add an existing collection to a pre-existing annotation project. We can specify certain query and filter parameters to only include a specific subset of files within the collection (rather than including all of the files).

```python
add_files_to_annotation_project_from_collection(project_id, collection_id, query, filter, fps, frames_per_task, assign_to_all, send_email)
```

## Parameters

| Parameter                    | Data type | Default | Description                                                                                                                                                                                                                                                                  |
| ---------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`                 | string    | -       | ID of the project                                                                                                                                                                                                                                                            |
| `collection_id`              | string    | -       | Collection ID                                                                                                                                                                                                                                                                |
| `query` (Optional)           | string    | -       | The search query that filters items in the collection. This is the same query format that we use in the Data Lake frontend.                                                                                                                                                  |
| `filter` (Optional)          | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> } |
| `fps` (Optional)             | integer   | -       | No of frames per second in case of video projects. If 0 is given, then all the frames are taken(default)                                                                                                                                                                     |
| `frames_per_task` (Optional) | integer   | 120     | No of frames per tasks created                                                                                                                                                                                                                                               |
| `assign_to_all` (Optional)   | boolean   | False   | If this is True, project will be assigend to all annotators once its created                                                                                                                                                                                                 |
| `send_email` (Optional)      | boolean   | False   | This is applicable if assign_to_all is True - If this flag is True, then emails are sent to the assigned annotators                                                                                                                                                          |

## 3.8. Add Files to a Project without a collection

This function enables you to add files to an existing project from many collections in the Data Lake. A query string and filters select which files are added.

```python
add_files_to_annotation_project_from_datalake(project_id, query, filter, content_type, fps, frames_per_task, assign_to_all, send_email)
```

## Parameters

| Parameter                    | Data type | Default | Description                                                                                                                                                                                                                                                                   |
| ---------------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`                 | string    | -       | Project ID                                                                                                                                                                                                                                                                    |
| `query` (Optional)           | string    | -       | The search query that filters items in the collection. This is the same query format that we use in the Data Lake frontend.                                                                                                                                                   |
| `filter` (Optional)          | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below: \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> } |
| `content_type`               | string    | -       | “image” or “video”                                                                                                                                                                                                                                                            |
| `fps` (Optional)             | integer   | -       | No of frames per second in case of video projects. If 0 is given, then all the frames are taken(default).                                                                                                                                                                     |
| `frames_per_task` (Optional) | integer   | 120     | No of frames per tasks created                                                                                                                                                                                                                                                |
| `assign_to_all` (Optional)   | boolean   | False   | If this is True, project will be assigend to all annotators once its created                                                                                                                                                                                                  |
| `send_email` (Optional)      | boolean   | False   | This is applicable if assign_to_all is True - If this flag is True, then emails are sent to the assigned annotators                                                                                                                                                           |

## 3.9. Attach Model Runs to a Annotation Project

This function enables you to attach model runs to an existing project.

```python
attach_model_run_to_project(project_id, operation_id_array)
```

## Parameters

| Parameter            | Data type | Default | Description                                                                 |
| -------------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `project_id`         | string    | -       | Id of the annotation project                                                |
| `operation_id_array` | list      | -       | A list of `operation_unique_id`s relevant to model run annotations uploads. |

## Returns

A dictionary with a boolean success flag and an optional message.

```python
{
    "is_success":True/False,
    "message":<optinal_message>
}
```

## Example Usage

```python
client.attach_model_run_to_project(
        "65004ce4365f0510adb2f649",
        ["my_model_v1.0", "my_model_v1.1"]
)
```

## 4.0. Retrieve Annotation Project Name by Annotation Project ID

This function enables you to retreive annotation project name when you give the annotation project ID.

```python
get_annotation_project_name_by_id(project_id)
```

## Parameters

| Parameter    | Data type | Default | Description                  |
| ------------ | --------- | ------- | ---------------------------- |
| `project_id` | string    | -       | Id of the annotation project |

## Returns

A dictionary with a boolean success flag and an optional message.

```python
{
    "projectName": "< Name of the Project which corresponds to given ID >"
}
```

## Example Usage

```python
client.get_annotation_project_name_by_id(
        "65004ce4365f0510adb2f649",
)
```
