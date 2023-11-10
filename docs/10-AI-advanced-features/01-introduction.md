
# Introduction to AI Advanced features Of Layernext

Layernext offers advanced AI features designed to enhance and streamline user workflows.These features are specifically tailored to address key applications within Layernext. The features include:

01. Auto Tagging : Managing, versioning, searching, and overseeing data in Layernext is primarily accomplished through the allocation of Metadata Tags for images, videos, or entire collections. Manually tagging vast quantities of images or videos, especially to denote specific objects, can become a cumbersome endeavor. Enter our Auto Tagging feature: designed to effortlessly assign metadata tags to specified collections automatically, pinpointing objects within images or videos. Harness this feature to enhance data management and elevate efficiency.

02. Embedding Generation : Image Embeddings stand as one of the most distinct feature descriptors within the realm of computer vision. With Layernext, you're empowered to generate embeddings automatically for a designated collection of images. Harnessing these image embeddings offers streamlined efficiency for tasks like similarity assessments, dataset evaluations, cluster analyses, and more. Dive in and explore the potential these embeddings bring to Layernext.

03. Auto Annotation : Annotating images for tasks such as object detection and segmentation often becomes a labor-intensive phase in the machine learning pipeline. With our Auto Annotation feature, we alleviate this burden, automating the annotation process within your project. Experience a smoother, hands-off approach to image annotation, streamlining your workflow further.

# Default Models and Custom Models 

All these applications are set to run through the backbone of a Machine learning Models.We at Layernext have developed default models for each application and configured them to the system so that users can use them whenever needed. These default Models are developed based on popular pretrained models such as YOLOv8 trained on COCO dataset for auto tagging,Resnet50 trained on ImageNet Dataset for embedding generation and Facebooks's LANG SAM model for auto annotation application.

If the users want, they can use different custom models according to their use case. All they have to do is make the model files according to guidelines provided by Layernext and register the model beforehand to the system through the SDK provided by us. Then users can use that model for the above applications without any problem. 


For more information and guidelines about custom model registration see our documentation about Model Registration(add the link here).


# Using different Inference Platforms 

We offer the capability to perform Advanced AI feature inferencing both locally and through AWS SageMaker.
With the local inferencing option, Layernext utilizes a hosted Virtual Machine instance to establish the inference endpoint. This endpoint is subsequently deleted once the inference process is complete. In the case of AWS SageMaker, the AWS facility is leveraged to create an endpoint for the specified model. Similar to the local option, this endpoint is also removed after each inference session.
Using SageMaker accelerates the inference process by employing a GPU machine, but it incurs additional costs for the duration of its use. On the other hand, local inferencing, while more time-consuming, does not add extra costs to the operation.
The choice of inferencing platform can be configured in the deployment environment of Layernext under the INFERENCE_PLATFORM environment variable. This should be set to either 'local' or 'aws', depending on your preference. If you encounter any issues or need assistance, please reach out to our support engineers for guidance.



