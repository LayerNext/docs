---
---

# 7. Automatic Analysis

## 7.1. Register Models for Automatic Analysis applications

Users have the capability to register model files packaged in .tar.gz format, designed for automatic analysis tasks such as auto tagging and embedding generation. Once a model is successfully registered, it becomes available for all subsequent analytical operations, eliminating the need for repeated registrations.

```python
register_model(path,  model_name,  application)
```

## Parameters

| Parameter     | Data type | Default | Description                                                                                                                                                                                                                                                   |
| ------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`        | string    | -       | path to the directory containing files designated for automatic analysis. Ensure that these files adhere to the prescribed folder structure for optimal inference processing.                                                                                 |
| `model_id`    | string    | -       | A distinct name which should be assigned to the model you're registering. Users will need to reference this name when utilizing the registered model in subsequent applications.                                                                              |
| `application` | string    | -       | Specify the application for which the model is designed: either auto tagging or embedding generation. There are two distinct input options available: "auto_tagging",”auto_annotation” and "embedding." Each input corresponds to its respective application. |

### Input Directory Folder Structure

The input directory should adhere to the specific folder hierarchy to ensure consistent and error-free processing. Users have to familiarize themselves with this structure and maintain uniformity.

#### Folder Structure for Autotagging

```
Main folder: (Path to this folder should be given in the SDK)
│
├── code: (A sub-folder named "code")
│   ├── inference.py (Python code which includes custom inference script)
│   └── requirements.txt (Requirement file which includes requirements to be installed at the time of inference)
├── label_list.yaml: (YAML file that lists the class labels of the model. Ensure
│                     that the class names are arranged in the same sequence as
│                     during training. Furthermore, these class names should
│                     match the desired tag names for autotagging)
└── yolov8l.pt: (Trained object detection model saved in .pt format)

```

#### Folder Structure for Embedding Generation

```
Example folder: (Main folder | path to this folder should be given in the SDK)
│
├── code: (A sub-folder named "code")
│   ├── inference.py (Python code which includes custom inference script)
│   └── requirements.txt (Requirement file which includes requirements to be installed at the time of inference)
```

#### Example Usage:

```python
client.register_model('/home/user/model_example_folder', 'test_yolov8', 'autotagging')

```

## Structure of the `inference.py` File

The `inference.py` file should be a Python file that includes the following specific functions which will be used to inference the model and provide a prediction. To ensure `inference.py` functions properly, the structure below needs to be adhered to.

### Imports:

Begin with importing necessary libraries. Any library which needs to function the processes in the functions below should be imported.

### Model Initialization (`model_fn`):

- **Parameters:**
  - `model_dir`: Directory where model artifacts are stored.
- **Returns:**
  - Initialized model for inference.
- **Purpose:** This function is to initialize and return the model. The internal specifics may vary based on the architecture and dataset being used.

### Input Processing (`input_fn`):

- **Parameters:**
  - `request_body`: Body of the inference request.
  - `request_content_type`: Content type of the inference request.
- **Returns:**
  - Processed input data suitable for prediction.
- **Purpose:** This function processes the incoming request to format the data into a form compatible with the model. It should handle various content types and convert them into a consistent input format for the model.

### Prediction (`predict_fn`):

- **Parameters:**
  - `input_data`: Processed input data from the `input_fn`.
  - `model`: Initialized model from the `model_fn`.
- **Returns:**
  - Prediction or embedding result.
- **Purpose:** Given the processed input data and initialized model, this function will generate a prediction or embedding.

### Output Formatting (`output_fn`):

- **Parameters:**
  - `prediction_output`: Output from the `predict_fn`.
  - `content_type`: Expected content type for the output.
- **Returns:**
  - Formatted response to be returned to the client.
- **Purpose:** This function formats the prediction into a client-readable format, often converting tensors into lists or JSON format for easy interpretation.

## Usage of System Registered Models

The Layernext system proactively provides a system-generated default model tailored for each Automatic Analysis application. Users seeking to leverage these models within their applications can seamlessly do so by refraining from specifying any model ID within the SDKs.

### Default Models Descriptions:

- **Auto tagging default Model:** This model leverages the YOLOv8 backbone architecture and is trained on the COCO dataset. It offers object tagging services encompassing all classes present within the COCO object detection dataset.
- **Embedding default Model:** This process produces robust feature embeddings for any image utilizing the pre-trained ResNet50 architecture.
- **Auto annotation default Model:** This model is derived from the "Segment Anything" language model which allows users to input a text prompt and receive predictions based on it. For optimal performance ensure that the language used in the text input descriptions is concise and straightforward. Additionally, providing fewer labels in the input prompt can further enhance the auto-annotation performance.

## 7.2. Auto tagging a Specified Collection

Autotagging empowers users to automatically assign tags to a designated collection using a chosen inference model. The selected model dictates the types of tags generated. For instance, if a user intends to tag only the breeds of dogs within a collection, they should opt for a model specifically trained to recognize dog breeds. Such models can be pre-registered in the meta-lake using the `register_model` function.

LayerNext offers a selection of pre-registered models in addition to those registered by users. If a default model's tag list aligns with a user's specific application needs, they can opt to utilize these default models for autotagging purposes, ensuring a seamless and efficient tagging process. Users have the capability to use queries and filters in order to filter out specific image and video sets out of collection. 

```python
auto_tag_collection(collection_id, model_name, input_resolution, confidence_threshold, query, filter, inference_platform)
```

#### Parameters:

| Parameter              | Data Type               | Default    | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection_id`        | string                  | -          | The ID of the collection you wish to autotag. The collection can consist of either images or videos. Ensure that the provided ID corresponds to the intended collection for accurate tagging.                                                                                                                                                   |
| `model_id`    (Optional)      | string                  | ‘default’  | Optional: A unique name from either user-registered models or system-pre-registered models. Ensure that the selected model aligns with your intended application. It's imperative to provide the precise name of the already registered model for accurate processing. If a name is not provided, system-generated default models will be used. |
| `input_resolution` (Optional)     | tuple                   | (300, 300) | Optional: Specify the desired resolution for images or video frames before they are input into the inference model. Adjusting the resolution can optimize processing speed and accuracy based on the model's requirements.                                                                                                                      |
| `confidence_threshold` (Optional)  | Float (between 0 and 1) | 0.5        | Optional: Specify the desired confidence threshold which the objects should be detected in the process.    |                                                                                                                 
| `query` (Optional)      | string     | -                                    | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend. Use this query to filter out data which needs to be auto tagged as you need.  |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |                                                                                      
| `inference_platform` (Optional)     | string     |  'use_env'                                                          | specify which inference platform whcih the autotagging feature should run on , 'aws' or 'local' . If no parameter is given the system will take the inference platform specified in the user environment |                                                                                                                   


#### Example Usage:

```python
client.auto_tag_collection(
                            "64f962e14f228f79e7806de6", 
                            "test_yolov8", 
                            (480, 480),
                            0.6,
                            "annotation.label=Bird",
                          {
                              "annotation_types": ["human", "machine"],
                              "from_date": "2022-08-02",
                              "to_date": "2023-01-19",
                          },
                          'aws' 
                          )
```

## 7.3. Autotagging MetaLake Population

The primary aim here is to enable autotagging across the entirety of MetaLake's content, encompassing both image and video files. Users have the flexibility to autotag all image files or all video files according to their preferences. As with collection-specific autotagging, it's essential that the model selected aligns with the user's desired outcomes and categorization preferences. Users have the capability to use queries and filters in order to filter out specific image sets out of the metalake population

```python
generate_auto_tags_to_metalake(content_type, model_name, input_resolution, confidence_threshold, query, filter, inference_platform)
```

#### Parameters

| Parameter              | Data Type               | Default    | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_type`         | string                  | -          | Indicate the type of content population you wish to autotag. Acceptable values are 'image' or 'video'. It's imperative to use one of these specific terms for accurate processing. |
| `model_id` (Optional)           | string                  | ‘default’  | Optional: A unique name from either user-registered models or system-pre-registered models. Ensure that the selected model aligns with your intended application. It's imperative to provide the precise name of the already registered model for accurate processing. If a name is not provided, system-generated default models will be used. |
| `input_resolution` (Optional)    | tuple                   | (300, 300) | Optional: Specify the desired resolution for images or video frames before they are input into the inference model. Adjusting the resolution can optimize processing speed and accuracy based on the model's requirements.|
| `confidence_threshold` (Optional)| Float (between 0 and 1) | 0.5        | Optional: Specify the desired confidence threshold at which the objects should be detected in the process. |
| `query` (Optional)      | string     | -                                                          | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend. Use this query to filter out data which needs to be auto tagged as you need. |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |                                                                                      
| `inference_platform` (Optional)     | string     |  'use_env'                                                          | specify which inference platform whcih the autotagging feature should run on , 'aws' or 'local' . If no parameter is given the system will take the inference platform specified in the user environment | 

#### Example Usage

```python
client.generate_auto_tags_to_metalake(
                            "image", 
                            "test_yolov8", 
                            (480, 480),
                            0.5,
                          "annotation.label=Bird",
                          {
                              "annotation_types": ["human", "machine"],
                              "from_date": "2022-08-02",
                              "to_date": "2023-01-19",
                          },
                          'aws' 
                              )
```

## 7.4. Embedding Generation for Specified Collection

The `generate_embeddings_for_collection` function facilitates the generation of image embeddings for a specified image collection. These embeddings can then be stored and utilized for various machine learning applications and analytical tasks.Users have the capability to use queries and filters in order to filter out specific image sets out of the collection. 

```python
generate_embeddings_for_collection(collection_id, model_name, query, filter, inference_platform)
```

#### Parameters:

| Parameter       | Data Type | Default   | Description                                                                                                               |
| --------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `collection_id` | string    | -         | The ID of the collection for which you want to generate embeddings. The collection should consist of images.|
| `model_id`   (Optional)     | string    | ‘default’ | Optional. The name of the model to use for generating embeddings. If not provided, the system will use the default model. |
| `query` (Optional)      | string     | -                                                          | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend. Use this query to filter out data which needs to be auto tagged as you need. |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |                                                                                      
| `inference_platform` (Optional)     | string     |  'use_env'                                                          | specify which inference platform whcih the autotagging feature should run on , 'aws' or 'local' . If no parameter is given the system will take the inference platform specified in the user environment |                                                                                                                     

#### Example Usage:

```python
client.generate_embeddings_for_collection(
                        "64f962e14f228f79e7806de6", 
                        'test_resnet50',
                          "annotation.label=Bird",
                        {
                            "annotation_types": ["human", "machine"],
                            "from_date": "2022-08-02",
                            "to_date": "2023-01-19",
                        },
                        'aws'                          
                      )

```

## 7.3. Embedding Generation to MetaLake Population

The primary aim here is to enable embedding generation across the entirety of MetaLake's content, encompassing image files. Users have the flexibility to generate embeddings to all image files according to their preferences.Users have the capability to use queries and filters in order to filter out specific image sets out of the metalake population.  As with collection-specific embedding generation, it's essential that the model selected aligns with the user's desired outcomes and categorization preferences.

```python
generate_embeddings_to_metalake(content_type, model_name, input_resolution, confidence_threshold, query, filter, inference_platform)
```

#### Parameters

| Parameter              | Data Type               | Default    | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_type`         | string                  | -          | Indicate the type of content population you wish to autotag. Acceptable values are 'image' or 'video'. It's imperative to use one of these specific terms for accurate processing.|
| `model_id` (Optional)           | string                  | ‘default’  | Optional: A unique name from either user-registered models or system-pre-registered models. Ensure that the selected model aligns with your intended application. It's imperative to provide the precise name of the already registered model for accurate processing. If a name is not provided, system-generated default models will be used. |
| `query` (Optional)      | string     | -                                                          | The search query that filters items in the MetaLake. This is the same query format that we use in the MetaLake frontend. Use this query to filter out data which needs to be generate embeddings as you need.   |
| `filter` (Optional)     | object     | -                                                          | Additional criteria, such as annotation type and uploaded date range, can be specified as shown below \n{ “annotation_types”: [“<comma separated list of types out of: “raw”, “human” and “machine”>], “from_date”: “\<start date string\>, “to_date”: \<end date string\>} |                                                                                   
| `inference_platform` (Optional)     | string     |  'use_env'                                                          | specify which inference platform whcih the autotagging feature should run on , 'aws' or 'local' . If no parameter is given the system will take the inference platform specified in the user environment | 

#### Example Usage

```python
client.generate_embeddings_to_metalake( 
                                  "image", 
                                  "test_resnet50",
                                  "annotation.label=Bird",
                                {
                                    "annotation_types": ["human", "machine"],
                                    "from_date": "2022-08-02",
                                    "to_date": "2023-01-19",
                                },
                                'aws'  
                                  )
```


## 7.5. Embedding Insertion for Batch

The `insert_image_embeddings_batch` function facilitates the insert of image embeddings for a specified image uniqueNames.

```python
insert_image_embeddings_batch(embedding_list, model_name, vector_dimension, session_id)
```

#### Parameters:

| Parameter       | Data Type | Default   | Description                                                                                                               |
| --------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `embedding_list` | List    | -         | Embedding uniqueName and vector dictionary list |
| `model_name`      | string    | - | The name of the model |
| `vector_dimension`      | string    | - | Dimension of the embedding vector |
| `session_id`      | string    | "" | session id for metalake job creation purpose |

#### Example Usage:

```python
client.insert_image_embeddings_batch([{
            "uniqueName": "example_collection_example_image.jpg",
            "embeddings": [0.23,0.56,....]
        }], 
        'Resnet50', 
        [2048], 
        ""
      )
```

## 7.6. Embedding Insertion

The `insert_image_embeddings` function facilitates the insert of image embeddings for a specified image uniqueNames.

```python
insert_image_embeddings(embedding_list, model_name, vector_dimension)
```

#### Parameters:

| Parameter       | Data Type | Default   | Description                                                                                                               |
| --------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `embedding_list` | List[dict]    | -         | Embedding uniqueName and vector dictionary list |
| `model_name`      | string    | - | The name of the model |
| `vector_dimension`      | string    | - | Dimension of the embedding vector |

#### Example Usage:

```python
client.insert_image_embeddings(
  [{
    "uniqueName": "example_collection_example_image.jpg",
    "embeddings": [0.23,0.56,....]
  }], 
  'Resnet50', 
  [2048]
)
```

## 7.7. Get Embedding Vector for given unique name

The `get_embedding_vector` function facilitates the get the embedding vectors for given unique name list

```python
get_embedding_vector(unique_names, model_name)
```

#### Parameters:

| Parameter       | Data Type | Default   | Description                                                                                                               |
| --------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `unique_names` | List[str]    | -         | unique name of the required embeddings |
| `model_name`   | string       | -         | model name of the required embeddings |

#### Example Usage:

```python
client.get_embedding_vector(["example_collection_example_image.jpg"], 'Resnet50')
```
