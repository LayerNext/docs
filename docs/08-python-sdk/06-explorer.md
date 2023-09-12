---
---

# 6. Explorer

## 6.1. Get details of a MetaLake object

You can get the details of a MetaLake object by calling this function.

```python
get_file_details(unique_file_name, fields_filter)
```

## Parameters

| Parameter          | Data type  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique_file_name` | string     | -       | 'Unique Name' of the relevant file                                                                                                                                                                                                                                                                                                                                                                |
| `fields_filter`    | dictionary | None    | This filter can be specify what kind of fields need to return including custom field. if you not specify fields_filter the defaults fields will be retrieved. Defaults fields are id, name, uniqueName and url. In addition to default fields you can retrieve fileSize, frameCount, frameRate, resolution, storagePath, Tags, createdAt, bucketName, updatedAt fields and custom metadata fields |

## Example usage

```python
client.get_file_details(
    'image collection_pexels-athena-2582937.jpg',
    {
        name: False,
        storagePath: True,
        bucketName: True,
        my_custom_field_1: True,
        Tags: True,
        my_custom_field_2: True,
    }
 )
```

## 6.1. Get details of a MetaLake collection

You can get the details of a MetaLake collection by calling this function.

```python
get_collection_details(collection_id, fields_filter)
```

## Parameters

| Parameter       | Data type  | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id` | string     | -       | id of the relevant collection                                                                                                                                                                                                                                                                                                                 |
| `fields_filter` | dictionary | None    | This filter can be specify what kind of fields need to return including custom field. if you not specify fields_filter the defaults fields will be retrieved. Defaults fields are id, name and contentType. In addition to default fields you can retrieve fileSize, frameCount, Tags, createdAt, updatedAt fields and custom metadata fields |

## Example usage

```python
client.get_collection_details(
    '64e4330130b4f6a0360bf2b3',
    {
        contentType: False,
        frameCount: True,
        my_custom_field_1: True,
        Tags: True,
        my_custom_field_2: True,
    }
 )
```
