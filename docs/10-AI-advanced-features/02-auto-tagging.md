# Why Auto Tagging?

Adding metadata tags is a critical component of the machine learning workflow at Layernext, as it facilitates the management, versioning, searching, and oversight of data within the system. These metadata tags can be applied to individual images or videos, as well as to collections of images or videos.

Adding metadata tags to identify objects in images or videos is a valuable feature in metadata management. However, tagging each file manually is time-consuming, especially with a large number of files. For instance, if you need to tag every image in a collection with 'dog', 'cat', or 'horse' when these animals appear in the image, you would normally have to inspect each image individually. This process can be lengthy and could be better spent on more productive tasks. This is why Auto Tagging is so beneficial; it streamlines the process, saving time and effort.


The Auto Tagging feature automates this process, freeing you from the tedious task of manually tagging objects in images and videos. 

## How it Works

Object Detection Models serve as the foundational technology for this application. Essentially, our pipeline processes images or video frames by running them through an object detection model that is trained to recognize specific types of objects. When an object is detected, the corresponding tag is automatically applied to the image or video frame within the pipeline.

The performance of the Auto Tagging application largely depends on the specific object detection model being used. For example, if you employ a model that's been trained to identify classes like 'bus', 'car', 'van', and 'jeep', it won't be suitable for tagging objects such as 'human', 'table', or 'plant'. Therefore, it's crucial to select and register the appropriate model tailored to your tagging needs. For more information on registering models, please refer to the relevant page.

## Default Model

Our system includes a default model for Auto Tagging purposes. If no specific model name is provided within the Auto Tagging SDK, this default model will be utilized for inference tasks. It is trained on the COCO dataset, encompassing 80 different classes. Should your tagging requirements align with the objects categorized in the COCO dataset, this default model should suffice for your needs.

For tagging requirements that involve different classes not covered by the COCO dataset, you will need to source and register a model that has been trained on the necessary classes. Please follow our provided instructions to register your custom model with our system. 

## Collection Auto Tagging

We offer an Auto Tagging feature through our SDK (insert link here), which allows for the automated tagging of any specified image or video collection. To use this feature, simply input the collection ID of the desired collection along with the model name you wish to use for inference. In cases where a model name is not specified, our system will automatically use our default model for the inference process.


#### Confidence Threshold

The confidence threshold is a crucial parameter in Auto Tagging, as it determines the confidence level at which the model identifies an object. This threshold can be set to any floating-point value between 0 and 1. The default setting for our system is 0.5. A higher confidence threshold means that only objects identified with a high probability will be tagged, while a lower threshold allows for more objects to be tagged, even if the model is less certain.

Depending on the specific needs and context of your application, you may find it beneficial to adjust this value to fine-tune your tagging results. To modify the confidence threshold, users can easily update this parameter within the SDK as required for their use case.

#### Input Resolution

Different deep learning architectures are optimized for various input image resolutions. For this reason, it is advisable to use the same image resolution for inference that was used during the training phase. We have incorporated a feature that allows you to specify the desired input resolution to ensure the Auto Tagging process performs optimally.

It is important to consistently apply the input resolution that your models were trained with. The default values we provide correspond to the optimal resolutions for our default model. Adjusting this parameter to match the training resolution of your model can significantly enhance the effectiveness of the tagging.

## How to Auto Tag 

To begin using our SDK for Auto Tagging (insert link here), start by completing the Layer Next client initialization process. Once the Layer Next client is initialized, you can proceed by providing the necessary parameters to Auto Tagging SDK: collection ID, and optionally, model ID, confidence threshold, and input resolution. After setting these parameters, run the SDK to start the auto-tagging process. The SDK will provide updates on the status of the operation. Please note that the duration of the process may vary based on the computational environment, so we ask for your patience.

Upon completion of the SDK's auto-tagging operation, you can verify the application of tags within the data lake on the specified collection. Should you encounter any issues or require assistance, our support team is readily available to help(insert link here).



