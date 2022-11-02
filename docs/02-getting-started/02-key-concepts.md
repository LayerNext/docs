---
---

# Key concepts

We conceptualized LayerNext as part of a larger computer vision and AI workflow. We want to introduce you to concepts that we developed as part of our platform and hope that this will help you identify where LayerNext fits best in your team’s workflow.

## Storage Connection

LayerNext works with existing data and object stores–such as AWS S3, Google Cloud Storage, or local Network Attached Drives–that you are using as part of your data collection workflow today. A Storage Connection refers to a read and write link established between LayerNext and one of the data stores that allows us to read and process your data stored in them.

## Data Lake

Since LayerNext can work with one or more data storage types, the Data Lake in LayerNext parlance is the entire topology of storage connected to and processed by LayerNext. Your Data Lake would consist of all images, videos and annotation files that is made available in LayerNext.

## Collections

A Collection is a logical group of images or videos that belong together. Collections typically map to individual folders, but can consist of multiple disparate folders as well. Use collections to group similar asset types together, even if they may reside in different Storage Connections within the Data Lake.

## Datasets

A dataset is a set of images or videos that can be used to train machine learning models. A dataset typically contains one or more collections, and is setup to split the assets within into training and validation sets, as well as the ability to generate augmentation. Datasets are also versioned so that models can be reproduced or compared against easily.

## Tasks

Tasks are used to denote and track in progress work within the LayerNext system. The most common form of task is an Annotation task, where designated collaborators are working on annotating data inside the system.
