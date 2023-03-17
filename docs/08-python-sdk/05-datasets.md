---
---

# 5. Datasets

## 5.1. Downloading Datasets

You can use the "download_dataset" method in the Python SDK to download the datasets that were created in the Dataset Manager App. The following information is needed:

###### 1. Id of the dataset version: `version_id`
###### 2. Dataset export format: `export_type`

You can easily copy these values from the LayerNext Dataset Manager tool by accessing the ‘Download dataset using the Python SDK’ as shown below:

![Product UI showing steps to download the dataset](img/download-datasets-01.png)

```python
download_dataset(version_id, export_type)
```

## Example Usage

```python
client.download_dataset("635eafbec1a605ab795d2768", "YOLO Darknet")
```

## 5.2. Create a Dataset from a Collection

With this SDK function, a dataset can be created from all or a subset of frames in a given collection in the DataLake.


```python
create_dataset_from_collection(dataset_name: str, collection_id: str, split_info:dict, labels:list, export_types:list,  query: str, filter:dict)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_name`     | string | - | Dataset name (should be non-empty) |
| `collection_id`     | string | - | Collection ID from which data is input to create the dataset |
| `split_info`     | dictionary | - | Percentage of frames assigned for each of the portions of dataset: train, test and validation. Should be given as dictionary with train/test/validation as key and percentage as value. |
| `labels`     | list | - | The labels belong to the dataset. At least one label should be given. |
| `export_types` (Optional)     | list | [] | List of formats to which the exports should be generated. Available export types are "RAW", "YOLO Darknet", "Semantic Segmentation"  |
| `query` (Optional)     | string | empl| The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria can be specified in the filter object as similar to annotation project creation |

## Example Usage

```python
#This will create a dataset called "Balloons Dataset" from all frames in a collection and export to RAW and Semantic Segmentation
client.create_dataset_from_collection("Balloons Dataset", "<datalake_collection_id>", {"train":100, "test":0, "validation":0}, ["Balloon"], ["RAW","Semantic Segmentation"])
```

## 5.3. Create a Dataset Without Giving a Collection

With this SDK function, a dataset can be created from a subset of frames in the DataLake without specifying a collection.


```python
create_dataset_from_datalake(dataset_name: str, split_info:dict, labels:list, export_types:list, item_type:str,  query: str, filter:dict)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_name`     | string | - | Dataset name (should be non-empty) |
| `split_info`     | dictionary | - | Percentage of frames assigned for each of the portions of dataset: train, test and validation. Should be given as dictionary with train/test/validation as key and percentage as value. |
| `labels`     | list | - | The labels belong to the dataset. At least one label should be given. |
| `export_types` (Optional)     | list | [] | List of formats to which the exports should be generated. Available export types are "RAW", "YOLO Darknet", "Semantic Segmentation"  |
| `item_type`     | string | image | Valid values are “image” or "image_collection" or "dataset" |
| `query` (Optional)     | string | empl| The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria can be specified in the filter object as similar to annotation project creation |

## Example Usage

```python
#This will create a dataset called "Balloons Dataset - V2" from all images with Balloon annotations and export to Semantic Segmentation
client.create_dataset_from_datalake("Balloons Dataset - V2", {"train":100, "test":0, "validation":0}, ["Balloon"], ["Semantic Segmentation"], "image", "annotation.label=Balloon")
```

## 5.4. Update a Dataset Version with Images from a Collection

To update an existing dataset with new data from a given collection, this SDK function can be used.

```python
update_dataset_version_from_collection(dataset_id: str, version_id:str, collection_id: str, split_info:dict, labels:list, export_types:list,  query: str, filter:dict, is_new_version_required:bool)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_id`     | string | - | Dataset ID |
| `version_id`     | string | - | ID of the current dataset version (source version) |
| `collection_id`     | string | - | Collection ID from which data is input to update the dataset |
| `split_info`     | dictionary | - | Percentage of frames assigned for each of the portions of dataset: train, test and validation. Should be given as dictionary with train/test/validation as key and percentage as value. |
| `labels`     | list | - | The labels belong to the dataset. At least one label should be given. |
| `export_types` (Optional)     | list | [] | List of formats to which the exports should be generated. Available export types are "RAW", "YOLO Darknet", "Semantic Segmentation"  |
| `query` (Optional)     | string | {} | The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria can be specified in the filter object as similar to annotation project creation |
| `is_new_version_required` (Optional)     | boolean | - | True if new version of dataset to be created |

## Example Usage

```python
#This will update an existing a dataset from all frames in a collection and create a new version
client.create_dataset_from_collection("<dataset_id>", "<current_dataset_version_id>", "<datalake_collection_id>", {"train":100, "test":0, "validation":0}, ["Balloon"], ["RAW","Semantic Segmentation"], "", {}, True)
```


## 5.5. Update a Dataset Version from frames Without Giving a Collection

With this SDK function, a dataset can be updated from a subset of frames in the DataLake without specifying a collection.


```python
update_dataset_version_from_datalake(dataset_id: str, version_id:str, split_info:dict, labels:list, export_types:list, item_type:str,  query: str, filter:dict, is_new_version_required: bool)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_id`     | string | - | ID of the dataset |
| `version_id`     | string | - | ID of the current dataset version (source version) |
| `split_info`     | dictionary | - | Percentage of frames assigned for each of the portions of dataset: train, test and validation. Should be given as dictionary with train/test/validation as key and percentage as value. |
| `labels`     | list | - | The labels belong to the dataset. At least one label should be given. |
| `export_types` (Optional)     | list | [] | List of formats to which the exports should be generated. Available export types are "RAW", "YOLO Darknet", "Semantic Segmentation"  |
| `item_type`     | string | image | Valid values are “image” or "image_collection" or "dataset" |
| `query` (Optional)     | string | empl| The search query that filters the items in the collection (This is the same query format that we use in the Data Lake frontend ) |
| `filter` (Optional)     | object | - | Additional criteria can be specified in the filter object as similar to annotation project creation |
| `is_new_version_required` (Optional)     | boolean | - | True if new version of dataset to be created |

## Example Usage

```python

```