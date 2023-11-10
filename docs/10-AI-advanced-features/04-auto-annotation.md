# Why Auto Annotation?

Image annotation for object detection and segmentation tasks is a crucial step in the computer vision pipeline, as accurate image annotations are directly linked to the final performance of any machine learning model. Moreover, it is often the most time-intensive task within the workflow. Recognizing the need for efficiency and simplification in this process, we have developed an auto-annotation capability in Layernext.

Our auto-annotation application streamlines this meticulous process by enabling the annotation of objects and the creation of polygons(segmentation tasks) or bounding boxes(object detection tasks)for segmentation with a straightforward SDK call, guided by a descriptive text prompt. This not only accelerates the development cycle but also enhances consistency and reduces the likelihood of human error, resulting in more reliable model training and ultimately superior performance of the machine learning models. Auto-annotation is instrumental in transforming the laborious task of manual annotation into a more manageable, accurate, and cost-effective process.

# How  it works

Our application employs Facebook's "Segment Anything" model as the foundational model. At its core, the model takes a text prompt as input and generates raw annotation results that correspond to the input prompt. For instance, to annotate people who are running in an image, one would provide a clear and straightforward text prompt such as 'humans running', 'humans who are running', or 'running people'. The effectiveness of the model's output hinges on the clarity and simplicity of the provided text prompt.

We have seamlessly integrated this core model into LayerNext, enabling users to execute it on annotation projects through an easy-to-use SDK. Upon running the SDK, the annotations, which align with your text prompt, will be updated on the images in Datalake, labeled according to your specifications. 
This integration not only simplifies the annotation process but also enhances the accuracy and efficiency of the data preparation stage for machine learning models, leading to better performance and more streamlined project workflows.

### Bounding Boxes or Polygons

In computer vision, bounding boxes and polygons stand as the primary annotation types utilized for object detection and segmentation tasks, respectively. Recognizing the distinct needs of these tasks, our platform offers the flexibility to select the desired annotation type for a given project. Users are encouraged to specify the annotation type—bounding boxes for detection or polygons for segmentation—within the SDK call to align with their project requirements. This feature ensures that the annotations are tailored to the precise needs of the users, facilitating a more focused and efficient machine learning model training.

## Input Text Prompt 

The input text prompt is a critical parameter in the auto annotation process, as it determines the specificity and accuracy of the annotations. Within our LayerNext SDK, the format for the input text prompt is structured to capture detailed descriptions, ensuring that the annotations generated are precise and relevant to the given imagery. It is essential to craft these prompts thoughtfully to guide the annotation tool effectively.

input prompt format : 
[{‘label’: ‘label of object1’ , ‘description’: ‘description of object1’}, {‘label’: ‘label of object2’ , ‘description’: ‘description of object2’}, {‘label’: ‘label of object3’ , ‘description’: ‘description of object3’}]

The input text prompt for auto annotation in our LayerNext SDK is a Python list composed of dictionaries. Each dictionary contains two key-value pairs: one for the label ('label' parameter) and another for the description of the object to annotate ('description' parameter). Users have the flexibility to include one or multiple dictionaries in a single input text prompt, allowing for diverse and detailed annotations. The following example will illustrate this structure clearly.


input prompt example : 
[{‘label’:’ human’  , ‘description’:’people who are standing’ }, {‘label’:’cat’  , ‘description’:’cat’ }, {‘label’:’ dog’  , ‘description’:’white dogs’ }]

What is 'label' key : The 'label' parameter defines the specific identifier that will be assigned to the corresponding annotation within Metalake. Essentially, this label is how the annotation will be recognized or categorized in Metalake's system

What is the 'description' key : The 'description' key serves as the text prompt for the model during inference, dictating which objects to annotate. The precision of the annotation is directly influenced by the clarity of this description. To ensure accuracy, it is advisable to use concise and straightforward prompts. Experience has shown that lengthy and complex descriptions tend to increase the error rate, so simplicity is key.

Tip : Although our system is fully capable of processing multiple labels for annotation in a single SDK run—achieved by including more than one dictionary—it has been observed that reducing the number of dictionaries can enhance the performance of the auto-annotation. For optimal results, running the SDK with a single dictionary entry per session is recommended. However, this approach may require more time and resources, presenting a trade-off between efficiency and performance. Ultimately, the choice of how to balance these factors should align with the specific needs and constraints of your application.

#### confidence threshold

The confidence threshold is a crucial parameter in Auto Annotation, as it determines the confidence level at which the model identifies an object. This threshold can be set to any floating-point value between 0 and 1. The default setting for our system is 0.5. A higher confidence threshold means that only objects identified with a high probability will be tagged, while a lower threshold allows for more objects to be tagged, even if the model is less certain.

Depending on the specific needs and context of your application, you may find it beneficial to adjust this value to fine-tune your annotation results. To modify the confidence threshold, users can easily update this parameter within the SDK as required for their use case.

## How to Auto Annotate

To begin using our SDK for Auto Annotation (insert link here), start by completing the Layernext client initialization process. Once Layernext client is initialized, you can proceed by providing the necessary parameters to Auto Annotation SDK: Annotation Project ID, and optionally, model ID,input prompt,annotation type and confidence threshold. 

Important : Annotation projects should be created beforehand which includes the images you need to annotate. That project Id should be given in the above parameter. 

After setting these parameters, run the SDK to start the auto annotation process. The SDK will provide updates on the status of the operation. Please note that the duration of the process may vary based on the computational environment, so we ask for your patience.

Upon completion of the SDK's auto-annotation operation, you can verify the application of annotations within the meta lake on the specified images of the annotation project. 

Should you encounter any issues or require assistance, our support team is readily available to help(insert link here).

