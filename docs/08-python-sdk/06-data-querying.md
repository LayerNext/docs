---
---

# 6. Data Querying

## 6.1. Get details of a MetaLake object

Retrieve the metadata of a MetaLake object by invoking the following function:

```python
get_file_details(unique_name, fields_filter)
```

The 'unique name' serves as a specific identifier for each file within the MetaLake environment and is generated during the file upload process to MetaLake. Unlike a regular file name, which may be duplicated or reused, a unique name is a distinct string that ensures the individual identification of each object within the system.

## Parameters

| Parameter                  | Data type  | Default | Description                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique_name`              | string     | -       | 'unique name' of the relevant file                                                                                                                                                                                                                                                                                                          |
| `fields_filter` (Optional) | dictionary | None    | Use this filter to specify which fields to return, including custom fields. If not specified, default fields will be retrieved. These are id, name, uniqueName, and url. Additionally, you can request fileSize, frameCount, frameRate, resolution, storagePath, Tags, createdAt, bucketName, updatedAt fields, and custom metadata fields. |

## Example usage

```python
client.get_file_details(
    'image_collection_pexels-athena-2582937.jpg',
    {
        'name': False,
        'storagePath': True,
        'bucketName': True,
        'my_custom_field_1': True,
        'Tags': True,
        'my_custom_field_2': True,
    }
)

```

## 6.2. Get details of a MetaLake collection

Retrieve the metadata of a MetaLake collection using the following function:

```python
get_collection_details(collection_id, fields_filter)
```

## Parameters

| Parameter                  | Data type  | Default | Description                                                                                                                                                                                                                                                                                  |
| -------------------------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`            | string     | -       | The ID of the relevant collection.                                                                                                                                                                                                                                                           |
|                            |
| `fields_filter` (Optional) | dictionary | None    | Use this filter to specify which fields to return, including custom fields. If not specified, default fields like id, name, and contentType will be retrieved. Additional fields such as fileSize, frameCount, Tags, createdAt, updatedAt, and custom metadata fields can also be retrieved. |

## Example usage

```python
client.get_collection_details(
    '64e4330130b4f6a0360bf2b3',
    {
        'contentType': False,
        'frameCount': True,
        'my_custom_field_1': True,
        'Tags': True,
        'my_custom_field_2': True,
    }
)

```

## 6.3. List items from MetaLake

This function supports fetching items from MetaLake based on your specified criteria, including query, filter, pagination, and sorting.

```python
client.get_item_list_from_datalake(
            item_type,
            query,
            filter,
            page_index,
            page_size,
            sort_order
        )
```

## Parameters

| Parameter               | Data type  | Default                                                    | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | ---------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_type`             | string     | 'image'                                                    | One of the following: "image", "video", "other", "image_collection", "video_collection", or "other_collection".                                                                                                                                                             |
| `query` (Optional)      | string     | -                                                          | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `page_index` (Optional) | integer    | 0                                                          | The index of the page, starting from 0.                                                                                                                                                                                                                                     |
|                         |
| `page_size` (Optional)  | integer    | 20                                                         | The size of the page. The maximum allowed value is 1000.                                                                                                                                                                                                                    |
| `sort_order` (Optional) | dictionary | { "sort_by_field": "date_modified", "sort_order": "DESC" } | Specifies the sorting order of the returned items. Format: { "sort_by_field": "date_modified"/"date_created"/"name"/"size"/"video_index", "sort_order": "ASC"/"DESC" }.                                                                                                     |

## Returns

Returns a list of items in MetaLake. The unique name and URL of the files will be returned only when listing files.

```python
[
    {
        'id': '<Id of the object>',
        'name': '<file name or collection name>',
        'uniqueName': '<unique name of the object>',
        'url': '<url of the object>',
    }
]
```

## Example Usage

```python

res = client.get_item_list_from_datalake(
        "image",
        "annotation.label=Bird",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2022-08-02",
            "to_date": "2023-01-19",
        },
        0,
        20,
        {"sort_by_field": "date_created", "sort_order": "ASC"}
)
```

## 6.4. List items from a MetaLake collection

This function supports fetching items from a specific MetaLake collection based on your specified criteria, including query, filter, pagination, and sorting.

```python
client.get_item_list_from_collection(
            collection_id,
            query,
            filter,
            page_index,
            page_size,
            sort_order
)
```

## Parameters

| Parameter               | Data type  | Default                                                    | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | ---------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`         | string     | -                                                          | The ID of the collection                                                                                                                                                                                                                                                    |
| `query` (Optional)      | string     | -                                                          | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend.                                                                                                                                                    |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |
| `page_index` (Optional) | integer    | 0                                                          | The index of the page, starting from 0.                                                                                                                                                                                                                                     |
|                         |
| `page_size` (Optional)  | integer    | 20                                                         | The size of the page. The maximum allowed value is 1000.                                                                                                                                                                                                                    |
| `sort_order` (Optional) | dictionary | { "sort_by_field": "date_modified", "sort_order": "DESC" } | Specifies the sorting order of the returned items. Format: { "sort_by_field": "date_modified"/"date_created"/"name"/"size"/"video_index", "sort_order": "ASC"/"DESC" }.                                                                                                     |

## Returns

Returns a list of items from the specified collection.

```python
[
    {
        'id': '<Id of the object>',
        'name': '<file name of the object>',
        'uniqueName': '<unique name of the object>',
        'url': '<url of the object>',
    }
]
```

## Example Usage

```python

res = client.get_item_list_from_collection(
        "65004ce4365f0510adb2f649",
        "annotation.label=Bird",
        {
            "annotation_types": ["human", "machine"],
            "from_date": "2022-08-02",
            "to_date": "2023-01-19",
        },
        0,
        20,
        {"sort_by_field": "date_created", "sort_order": "ASC"}
)
```
