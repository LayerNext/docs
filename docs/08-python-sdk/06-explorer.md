---
---

# 6. Explorer

## 6.1. Get details of a MetaLake object

You can get the details of a MetaLake object by calling this function.

```python
get_file_details(unique_file_name, fields_filter)
```

## Parameters

| Parameter                  | Data type  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique_file_name`         | string     | -       | 'Unique Name' of the relevant file                                                                                                                                                                                                                                                                                                                                                                |
| `fields_filter` (Optional) | dictionary | None    | This filter can be specify what kind of fields need to return including custom field. if you not specify fields_filter the defaults fields will be retrieved. Defaults fields are id, name, uniqueName and url. In addition to default fields you can retrieve fileSize, frameCount, frameRate, resolution, storagePath, Tags, createdAt, bucketName, updatedAt fields and custom metadata fields |

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

## 6.2. Get details of a MetaLake collection

You can get the details of a MetaLake collection by calling this function.

```python
get_collection_details(collection_id, fields_filter)
```

## Parameters

| Parameter                  | Data type  | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`            | string     | -       | id of the relevant collection                                                                                                                                                                                                                                                                                                                 |
| `fields_filter` (Optional) | dictionary | None    | This filter can be specify what kind of fields need to return including custom field. if you not specify fields_filter the defaults fields will be retrieved. Defaults fields are id, name and contentType. In addition to default fields you can retrieve fileSize, frameCount, Tags, createdAt, updatedAt fields and custom metadata fields |

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

## 6.3. List items from MetaLake

You can list items from MetaLake by calling this function.

```python
client.get_item_list_from_datalake(
            item_type,
            query,
            filter,
            page_index,
            page_size
        )
```

## Parameters

| Parameter               | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_type`             | string    | 'image' | "image", "video", "other", "image_collection", "video_collection" or "other_collection"                                                                                                                                                                                     |
| `query` (Optional)      | string    | -       | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `page_index` (Optional) | integer   | 0       | index of the page. It will starts from 0                                                                                                                                                                                                                                    |
| `page_size` (Optional)  | integer   | 20      | Size of the page. Maximum value should be 1000                                                                                                                                                                                                                              |

## Returns

List of items in the MetaLake.

```python
[{
    'id': '<Id of the object>',
    'name': '<name of the object>',
    'url': '<url of the object>',
}]
```

## Example Usage

```python

res = client.get_item_list_from_datalake(
        "image",
        "annotation.label=Balloon",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2020-01-01",
            "to_date": "2020-12-31",
        },
        0,
        20
)
```

## 6.4. List items from a MetaLake collection

You can list items from a MetaLake collection by calling this function.

```python
client.get_item_list_from_collection(
            collection_id,
            query,
            filter,
            page_index,
            page_size
)
```

## Parameters

| Parameter               | Data type | Default | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`         | string    | -       | id of the collection                                                                                                                                                                                                                                                        |
| `query` (Optional)      | string    | -       | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object    | -       | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `page_index` (Optional) | integer   | 0       | index of the page. It will starts from 0                                                                                                                                                                                                                                    |
| `page_size` (Optional)  | integer   | 20      | Size of the page. Maximum value should be 1000                                                                                                                                                                                                                              |

## Returns

list of items of the given collection.

```python
[{
    'id': '<Id of the object>',
    'name': '<name of the object>',
    'url': '<url of the object>',
}]
```

## Example Usage

```python

res = client.get_item_list_from_collection(
        "65004ce4365f0510adb2f649",
        "annotation.label=Balloon",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2020-01-01",
            "to_date": "2020-12-31",
        },
        0,
        20
)
```
