---
---

# 4. System Labels

## 4.1. List all system Labels

The list of all available system labels can be retrieved using this function:

```python
get_all_labels()
```

## Returns

A list of objects that includes the system label's name, description, and key(ID).

## 4.2 Create System Label

To create a new label to the sytem, following function can be used.
```python
create_system_label(label)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `label`     | dictionary | - | Dictionary having all the configurations for the label (See the format below) |

## Format for 'label'

```python
{
    "className": "class_name",
    "description": "Description of class",
    "attributes": [
        {
            "attributeName": "attribute_1",
            "values": [
                {
                    "valueName": "value_1_of_attribute_1",
                    "description": "Description of value"
                },
                {
                    "valueName": "value_2_of_attribute_1",
                    "description": "Description of value"
                }
            ]
        },
        {
            "attributeName": "attribute_2",
            "values": [
                {
                    "valueName": "value_1_of_attribute_2",
                    "description": "Description of value"
                },
                {
                    "valueName": "value_2_of_attribute_2",
                    "description": "Description of value"
                }
            ]
        }
    ]
}
```

Note: If one of the label class names given here are already existing or nearly similar ones already there (eg: try to add 'Vehicle' when 'vehicle' is already there), then an error is given.

### Example usage1: create a label with no attributes

```python
label_data = {
    "className": "Vehicle",
    "description": "Vehicle travelling or parked on the road",
}
client.create_system_label(label_data)

```

### Example usage2: create a label with one attribute

```python
label_data = {
    "className": "Vehicle",
    "description": "Vehicle travelling or parked on the road",
    "attributes": [
        {
            "attributeName": "vehicle_type",
            "values": [
                {
                    "valueName": "car",
                    "description": "Car"
                },
                {
                    "valueName": "truck",
                    "description": "Truck"
                }
            ]
        }
    ]
}

client.create_system_label(label_data)

```

## 4.3. Create Label Group

To create a new ontology(label) group, use the function below:

```python
create_label_group(group_name, label_ids)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `group_name`     | string | - | The name of ontology group |
| `label_ids`     | array | - | List of label keys required to be included in the group |

## Returns

Id of the created label group

## Example Usage

```python
client.create_label_group("Ontology-Group-1", ["bdff4719-1eaa-4b92-90ba-a1959579e621", "4e47644c-043f-4b4b-8874-4f7ac1399cd1" ])
```

## 4.4. List the Label Groups

The list of all available ontology(label) groups can be obtained using:

```python
get_all_label_groups()
```

## Returns

A list of objects containing the Id and the name of each group

## 4.5. Add Labels to a Group

This function attaches a list of labels to an existing ontology group:

```python
attach_labels_to_group(group_id, label_ids)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `group_id`     | string | - | Label group Id |
| `label_ids`     | array | - | List of label keys required to be included in the group |


## 4.6. Remove Labels from Group

This function detaches a given list of labels from an ontology group:

```python
detach_labels_to_group(group_id, label_ids)
```

## Parameters

| Parameter          | Data type         | Default          | Description        |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `group_id`     | string | - | Label group Id |
| `label_ids`     | array | - | List of label keys required to be included in the group |

















