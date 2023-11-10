# Model Registration

Model registration provides users with the flexibility to employ custom models for advanced AI features. This functionality enables users to train models tailored to their specific requirements. However, it is essential for users to comply with the guidelines and formats specified by Layernext for model registration. This ensures seamless integration and optimal performance of the custom models within the Layernext ecosystem.

For custom models to function correctly, please follow our guidelines on the required folder structure and data formats given below.

For model registering users have to give model files and related files arranged in the below described folder hierarchy. 

The main folder must follow this specific structure. It should contain a subfolder named "code," which houses two important files: 'inference.py', containing the model's inference code, and 'requirements.txt', listing all the necessary dependencies for running 'inference.py' without issues. For detailed instructions on structuring the 'inference.py' file, please refer to our guidelines (insert link here). Alongside the "code" subfolder, within the main directory, include any additional resource files required for your specific application. The type of resource files may differ depending on the application. For guidance on which resource files are necessary for each application, please consult our documentation (add the link).


## Example Input Directory Folder Structure


The input directory should adhere to the specific folder hierarchy to ensure consistent and error-free processing.Users have to familiarize themselves with this structure and maintain uniformity.


Folder structure for Auto Tagging 

Example folder :    (Main folder | path to this folder should be given in the SDK) 
                          | 
  |--- code  : (A sub folder named “code”)
                          |               |
                          |               |---inference.py (python code which includes custom inference script)
                          |               |---requirements.txt (requirement file which includes requirements to     
                          |                    be installed at the time of inference)
                          |--- label_list.yaml : (YAML file that lists the class labels of the model. Ensure 
                                                           that the class names are arranged in the same sequence as 
                                                           during training. Furthermore, these class names should 
                                                           match the desired tag names for auto tagging)
                          |---yolov8l.pt         : (trained object detection model saved in .pt format)

+ Main folder/(path to this folder should be given in the SDK)
  * code/(A sub folder named “code”)
      - inference.py (python code which includes custom inference script)
      - requirements.txt (requirement file which includes requirements to be installed at the time of inference) 
  * label_list.yaml  (YAML file that lists the class labels of the model. Ensure that the class names are arranged in the same sequence as during training.                       Furthermore, these class names should  match the desired tag names for auto tagging. Needed only for autotag for the moment)
  * yolov8l.pt (trained inference model saved in .pt format)

+ root_folder/
    * subfolder1/
        - file1.txt
        - file2.txt
    * subfolder2/
        - anotherfile.txt
    * file_in_root.txt

Folder structure for Embedding Generation 

Example folder :    (Main folder | path to this folder should be given in the SDK) 
                          | 
  |--- code  : (A sub folder named “code”)
                          |               |
                          |               |---inference.py (python code which includes custom inference script)
                          |               |---requirements.txt (requirement file which includes requirements to     
                          |                    be installed at the time of inference)

Once you have arranged the files as per the specified folder structure, you can proceed to register your model with the LayerNext system using our model registration SDK (link to be inserted). Upon successful registration, your model will appear in the 'Other Collections' section within Metalake, specifically under the 'Automatic Analysis Models' collection, saved in a tar.gz compressed format. Should you require, the model can be downloaded and extracted to access the individual files.


#### inference.py script structure

The inference.py file should be a python file which includes the following specific functions which will be used to inference the model and provide a prediction. To inference.py to function properly below provided structure needed to be adhered to- properly. 

Imports:
Begin with importing necessary libraries.Any library which needs to function the processes in below functions should be imported. 
Model Initialization (model_fn):
Parameters:
model_dir: Directory where model artifacts are stored.
Returns:
Initialized model for inference.
The purpose of this function is to initialize and return the model. The internal specifics may vary based on the architecture and dataset being used.


Input Processing (input_fn):
Parameters:
request_body: Body of the inference request.
request_content_type: Content type of the inference request.
Returns:
Processed input data suitable for prediction.
This function processes the incoming request to format the data into a form compatible with the model. It should handle various content types and convert them into a consistent input format for the model.


Prediction (predict_fn):
Parameters:
input_data: Processed input data from the input_fn.
model: Initialized model from the model_fn.
Returns:
Prediction or embedding result.
Given the processed input data and initialized model, this function will generate a prediction or embedding.


Output Formatting (output_fn):
Parameters:
prediction_output: Output from the predict_fn.
content_type: Expected content type for the output.
Returns:
The structure and format of the response returned to the client are tailored to suit the specific application and depend on the chosen inference platform. Each application may require a unique response format, which varies based on the inferencing method used, whether it's local inferencing or through AWS SageMaker. For detailed guidance on how these formats should be adapted according to your application and inference platform, please click here (insert link) to learn more.


## Formats of the output from the output_fn
The output returned by the output_fn function must adhere to the specific format outlined here, as deviations may result in malfunction during the inference process.
For both AWS SageMaker inference and local inference, the fundamental output format is a dictionary. In the case of local inference, this dictionary should be returned as-is. However, for SageMaker inference, the dictionary should be converted into a JSON format using a command like the one shown in the following code snippet:


```python
import json
#output generation code here
json.dumps(output)
```

Next, let's delve into the specific dictionary keys that need to be included as key-value pairs in this output dictionary.

For Auto Tagging: 

Output_dictionary = {‘boxes’:’bounding boxes of identified objects’, ‘masks’:’mask of identified objects, ‘probs’;’probabilities of identified objects’} 

For Embedding Generation : 

Output_dictionary = {‘embedding’:’embedding of the inferenced payload’} 

For Auto Annotation : 

Output_dictionary = {‘boxes’:’bounding boxes of identified objects’, ‘masks’:’mask of identified objects, ‘logits’;’probabilities of identified objects’,’phrases’:’phrase each object is identified as’} 
It's crucial to use the precise keys and corresponding values as specified, as any discrepancies can lead to errors. Should you require any assistance or encounter issues, please do not hesitate to reach out to our support engineers for help.(add the link here)
