---
sidebar_position: 3
---

# Google Cloud Platform

The LayerNext platform is available as a self hosted service which will be hosted on your infrastructure.

LayerNext can be hosted on AWS using S3 buckets as the application's data storage. This configuration allows you to store your data in a private Google storage bucket, ensuring the security of your data.

To deploy LayerNext on your GCP, please follow the step-by-step instructions provided below. 

# Deployment Guidelines

## Deployment Prerequisites

Please verify the server for these prerequisites before attempting the installation.To ensure a seamless system deployment, it's essential to comply with the specified requirements.

### Hardware

*CPUs: At least 2
*Ram: 4GB+
*Disk: 50GB+ of free space

### Software

*Ubuntu 64 bit (x86) - 18.04 and above
*Sudo enabled user who can login via SSH

### Networking 

*Public and static IP address for the server (eg: 54.83.168.141)
*HTTP and HTTPS ports open (TCP ports 80 and 443)
*SSH enabled (TCP port 22)

Typically, cloud service providers offer the choice to enable HTTP and HTTPS when creating a VM. Nevertheless, you can also configure these settings later by referring to the documentation provided by each provide.

## Configuring Cloud Storage (Google storage bucket)

To properly configure your GCP cloud storage for the deployment of LayerNext, kindly adhere to the provided instructions.

*Sign in to your [Google Cloud Console](https://console.cloud.google.com/getting-started?pli=1). If you already have a [service account](https://cloud.google.com/iam/docs/service-accounts-create) and a [Google Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets), then please proceed to access it, or alternatively, create a service account andGoogle storage bucket in order to access the Google Cloud Storage service from LayerNext.

*In the "Service account permissions" section, assign a role that has the required access for the cloud storage service (eg: “Storage Admin”).

*Next, generate a key for the service account as specified in this [document](https://cloud.google.com/iam/docs/keys-create-delete).

*Download the private key as a JSON file and save to the same directory that you will install the LayerNext platform on your Ubuntu server (eg: credentials.json). For example, if you are going to run the installation wizard in ‘/home/ubuntu/my_location’ directory, then the credentials.json file also needs to be saved to the same directory.

*To enable the upload files from the browser to LayerNext MetaLake, you need to update CORS configurations for the storage bucket that you allow the LayerNext system to access. For that, first create a JSON file as below.

In the sample JSON for the ‘Origin’ field, please input the url “https://datalake.<short_name>.layernext.ai”. 
The short_name parameter defines a unique identifier for your system. For instance, if you select "ABC123" as your short_name, the corresponding system URL will be https://datalake.ABC123.layernext.ai. Please ensure that the short_name you choose is both appropriate and agreed upon within your organization, as it will serve as a long-term identifier for your system.

#### ADD THE SAMPLE JSON HERE ####

*Refer this [documentation](https://cloud.google.com/storage/docs/cors-configurations) and update this JSON to your bucket.

Please keep the following parameters with you which will be required by the installation process:
*Google Cloud Project ID (Check [here](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) to get this id)
*Name of the private key JSON file
*Google Storage Bucket Name

## LayerNext installation on your server

If you have successfully configured the cloud storage by meeting minimum prerequisties as instructed above sections, you are ready to begin the installation of Layernext on your server.

Let’s install LayerNext on your server.
Kindly proceed with the following steps in sequence.

Step 1 : Generate a product Key. Click below to obtain a product key. Ensure you store it securely for future use. 

Step 2 : Connect to the server’s terminal via SSH.

Step 3 : Download the automated deployment wizard to the server with the follwing command.

       curl --location --request GET 'https://cms.layernext.ai/api/download/deployment/script' -o layernext-self-install.sh

Step 4 : Run the wizard by running the following

       sh layernext-self-install.sh

Step 5 : Please continue through the wizard, providing answers based on the configuration details you gathered in the previous steps. It's imperative to provide precise and accurate responses. 

Ensure that you retain or make a note of the admin email and password you input into the wizard. These credentials will serve as your primary access to the system. Select an admin email and password that are both suitable and have been mutually agreed upon within your organization.

   Note: If you see a screen like below, please press Enter.

   Special Note : When setting the Admin password: Please don’t include ‘$’ character in the password.

Step 6 : Wait till the deployment is done.It's estimated to take around 20 minutes, though the actual duration might vary depending on your server's performance.

Step 7 : Once the deployment is complete, you will see a success message and will be able to log in to the system via any browser via the system hosted link “https://datalake.<short_name>.layernext.ai”. Kindly attempt to log into the system using the admin credentials established earlier. Ensure all functionalities are operating as expected. 

In case the SSH terminal session was broken due to connection failure or any other issue while ruinng the wizard, please run the wizard again, it will continue from the last completed step in the previous attempt.


If you encounter any issues or have any questions feel free to contact us at support@.....com
