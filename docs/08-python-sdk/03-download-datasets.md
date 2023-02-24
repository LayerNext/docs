---
---

# 3. Working with Annotation Projects

LayerNext SDK provides functionality for managing Annotation Studio projects, including creating, updating, downloading, and deleting them.

## 3.1. Create Annotation Project from Collection

With this SDK function, an annotation project can be created from all or a subset of frames in a given collection in DataLake.

```python
create_annotation_project_from_collection(project_name, collection_id, query, filter, fps, frames_per_task, assign_project_to_annotation)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_name`     | string | - | Project name (should be non-empty) |
| `collection_id`     | string | - | Collection ID |
| `query` (Optional)     | string | - | The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified in the filter object as shown here { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> |
| `fps` (Optional)     | integer | 4 | Number of frames per second in case of video projects. If 0 is given, then all frames are taken. Note that this parameter has no effect for the projects created from images. |
| `frames_per_task` (Optional)     | integer | 120 | Specifies number of frames or images attached to the each annotation task. |
| `is_assign_annotators` (Optional)     | boolean | False | If True, all annotators will be assigned to the project, otherwise none will be assigned. |


## Returns

Id of the project that was created and the corresponding job id.

```python
{
    'id': '<Id of the project created / updated >', 
    'job_id': '<Job Id of the operation>'
}
```

## Example Usage

To create a project from images having the Meta Tag “water” and containing human annotations from a given collection

```python
project_res = client.create_annotation_project_from_collection("My Project”, "<collection id>”, "MetaData.Tags=water", {“annotation_types”: [“human”]}, 4, 10, True )
proj_job_id = project_res['job_id']

#Wait until all tasks are created in the project
client.wait_for_job_complete(proj_job_id)
```

## 3.2. Create Annotation Project without a collection

An annotation project can be created without specifying a collection, but choosing a set of items by query and filter.

```python
create_annotation_project_from_datalake(project_name, Data Lake_query, Data Lake_filter, content_type:, fps, frames_per_task, is_assign_annotators)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_name`     | string | - | Project name (should be non-empty) |
| `Data Lake_query` (Optional)     | string | - | The search query that filters items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `datake_filter` (Optional)     | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> |
| `content_type`     | string | - | “image” or “video” |
| `fps` (Optional)     | integer | 4 | Number of frames per second in case of video projects. If 0 is given, then all frames are taken. |
| `frames_per_task` (Optional)     | integer | 120 | Specifies the number of images or frames attached to each annotation task. |
| `is_assign_annotators` (Optional)     | boolean | False | If True, all annotators will be assigned to the project, otherwise none will be assigned. |


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

## 3.4. Set Label (Ontology) Group to a Project

To set labels to a project, we can attach an existing group of ontology(labels). To create a group of labels, please refer to the function for label group creation.

```python
attach_label_group_to_annotation_project(project_id, group_id)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`             | string | - | Id of the project which labels are updating |
| `group_id`             | string | - | Label group Id |


## Example Usage

```python
client.attach_label_group_to_annotation_project( “<project_id>”, “<label_group_id>”)
```

## 3.5. Download Annotations for Project

This function is designed to download specific frames with annotations that belong to a particular annotation project.The downloaded frames can be stored in a local folder for easy access and use.

```python
download_project_annotations(project_id, task_status_list, is_annotated_only, custom_download_path)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`     | string | - | ID of the project |
| `task_status_list` (Optional)     | array | [] | To filter the images by status of the relevant task, we can give a list of status values. The valid values are: “in_progress”, “completed”, “accepted”, “qa_completed”. By default, no filtering of tasks applied (all tasks included). |
| `Is_annotated_only` (Optional)     | boolean | False | if this is True, then only the annotated images are downloaded. |
| `custom_download_path` (Optional)     | string | empty | If this is given then, the images are downloaded to this location, otherwise it’s downloaded to a directory within the current directory. Note that this requires the absolute path. |

The downloaded JSON data format is the same as download annotations from collection.


## Example Usage

To download only the completed or accepted tasks

```python
client.download_project_annotations(<project_id>, [’completed’,’accepted’])
```

## 3.6. Add Files to a Project from a Collection

In addition to creating new annotation projects from collections, we can also add an existing collection to a pre-existing annotation project. We can specify certain query and filter parameters to only include a specific subset of files within the collection, rather than including all of the files.

```python
add_files_to_annotation_project_from_collection(project_id, collection_id, query, filter, fps)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`             | string | - | ID of the project |
| `collection_id`             | string | - | Collection ID |
| `query` (Optional)             | string | - | the search query that filters items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)             | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below                 { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> |
| `fps` (Optional)             | integer | - | No of frames per second in case of video projects. If 0 is given, then all the frames are taken(default) |


## 3.7. Add Files to Project without a collection

This function enables you to add files to an existing project from many collections in the Data Lake, but choosing a set of items via query and filter.

```python
add_files_to_annotation_project_from_Data Lake(project_id, query, filter, content_type, fps)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `project_id`             | string | - | Project ID |
| `query` (Optional)             | string | - | the search query that filters items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)             | object | - | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below { “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\> |
| `content_type`             | string | - | “image” or “video” |
| `fps` (Optional)             | integer | - | No of frames per second in case of video projects. If 0 is given, then all the frames are taken(default). |



















