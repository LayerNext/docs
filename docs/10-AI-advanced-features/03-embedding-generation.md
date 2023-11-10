# Why Embeddings?

Image embeddings are a crucial aspect, often considered the cornerstone, of feature representation in computer vision. They serve as compact yet informative summaries of the visual content of an image and are instrumental in a wide range of computer vision tasks.

In layernext as of now embeddings can be used in below applications. 

Analysis of Image Datasets :  By transforming high-dimensional data into a lower-dimensional space and making it computationally more manageable while retaining essential information and more representable in graphical format. This will allow you to cluster and analyze images using embeddings.

Similarity Search: Embeddings enable the measurement of semantic similarity between images. Images that are visually or contextually similar will have closer embeddings in the feature space.This will allow you to find out similar images to a certain image. 

Dataset Curation by Anomaly Detection: By learning the normal pattern of embeddings in a dataset, it is possible to detect outliers or anomalies which can be used to curate datasets by removing outliers and further analytics as well. 

Search and Retrieval: Image embeddings can be represented in a scatter plot allowing the user to select certain types of clusters or any certain images and retrieve that has the selected embedding. This will create the facility of identifying patterns in the dataset or collection. 

## How it Works

It is clear that image embeddings play a vital role in the computer vision work pipeline. So it is crucial to understand how it works properly. 
The embedding generation pipeline in Layernext operates utilizing pre-trained deep learning architectures, which have been developed using specific datasets. 
For instance, the EfficientNet50 architecture can be trained on the ImageNet dataset until it achieves satisfactory performance. Subsequently, the final fully connected layer is removed, and the preceding trained weights and biases are utilized for inference purposes. 
In this context, the layer utilized for inference serves as the embedding layer, which is also referred to as the image embeddings.

## Default Model

Our default model pipeline is designed using the ImageNet dataset, leveraging the ResNet50 deep learning architecture. By omitting the final fully connected layer, we utilize the remaining layers' weights to infer and create image embeddings. According to our performance testing, these embeddings are effective for applications such as similarity search and cluster search. 
However, if there is a need to use an alternative pipeline for generating embeddings, users have the option to develop their own architecture and weights. Once developed, they can register their model in accordance with our provided guidelines and subsequently use this model with our embedding generation SDK.



## How to Generate Embeddings for an Image Collection or Dataset Collection

To begin using our SDK for Generate Embeddings(insert link here), start by completing the Layer Next client initialization process. Once Layernext client is initialized, you can proceed by providing the necessary parameters to generate embeddings SDK: collection ID, and optionally, model ID.Here for collection ID you can use either a ID of an image collection or a ID of a dataset collection. 

After setting these parameters, run the SDK to start the embedding generation process. The SDK will provide updates on the status of the operation. Please note that the duration of the process may vary based on the computational environment, so we ask for your patience.

Upon completion of the SDK's embedding generation operation, you can verify the application of embeddings within the meta lake on the specified collection. Should you encounter any issues or require assistance, our support team is readily available to help(insert link here).


## Working with Generated Embeddings

Once you've successfully generated embeddings for your image collection, these can be utilized within Metalake for a range of applications, each enhancing your machine learning workflow. Detailed descriptions of these applications are provided below.

#### Viewing Embeddings of a Specified Image Set

When generating embeddings for a collection using our SDK, you can visualize these embeddings in a graph within Metalake. To do this, first select the collection for which you've generated embeddings. Then, navigate to the 'Analytics' tab located in the upper right corner. From the appearing toolbar, choose the 'Embedding Graph' icon to display your embeddings in the graph.
We store your embeddings in our vector database, maintaining the original dimensions of the generated embeddings, typically 1024-length vectors if embeddings are generated from the default model. However, for 2D graphical representation, we apply Principal Component Analysis (PCA) for dimensionality reduction. Consequently, the data visualized in these embedding graphs are the reduced-dimension versions of your original embeddings.

Let's explore the potential applications of these embeddings.

#### Cluster Analysis

Once the embeddings graph has been generated, users can select specific embedding clusters directly from the graph using the toolbox. The corresponding images for these selected clusters will then be displayed on the left side of the interface. This feature serves as an effective method for identifying images that belong to the same cluster, showcasing similar patterns as revealed by their embeddings. Additionally, users have the option to select a single point from the embedding graph to determine which image corresponds to the selected embedding. This functionality is particularly useful for uncovering patterns, anomalies, and feature distributions within the chosen collection or dataset.

#### Similarity Search

The ability to identify similar images is a crucial feature in computer vision pipelines. For instance, consider a user who wishes to filter out foggy images from a dataset to enhance its quality. Traditionally, this would require manually reviewing each image in the dataset, a process that can be extremely time-consuming.
Our similarity search feature addresses this inefficiency. It operates by allowing users to select an image directly from the embedding graph, input a query, or simply click on an image. Following this selection, users can click the 'Search Similar' button located at the bottom of the interface. This action initiates a search for images with similar characteristics within the dataset, streamlining the process of dataset cleaning and organization.

#### Dataset Curation

A thorough examination of the embeddings graph can also play a significant role in dataset curation. For instance, anomalies within a dataset can be identified by observing embeddings that do not belong to any cluster, allowing for their removal. Moreover, after selecting a specific embedding cluster, users have the option to refine their selection further by filtering based on the metadata of the images. This can be achieved using the 'MetaData' tab located in the right corner, enhancing the precision and effectiveness of dataset curation.

