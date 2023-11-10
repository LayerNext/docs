---
sidebar_position: 2
---

# Microsoft Azure

The LayerNext platform is available as a self hosted service which will be hosted on your infrastructure.

LayerNext can be hosted on AWS using S3 buckets as the application's data storage. This configuration allows you to store your data in a private Azure blob storage, ensuring the security of your data.

To deploy LayerNext on your Microsoft Azure, please follow the step-by-step instructions provided below. 

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

## Configuring Cloud Storage (Microsoft Azure Blob)

To properly configure your Microsoft Azure cloud storage for the deployment of LayerNext, kindly adhere to the provided instructions.

*Sign in to your Azure Portal. If you already have a storage account and a blob container, then please proceed to access it, or alternatively, [create a new storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal) and also a [new Azure Blob Container](https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-portal#create-a-container). Please remember to have the public network access “Enabled from all networks”selected in the “Networking” section for this container.

*Select “Access Keys” within your storage account and copy the key for future use.

*To enable the upload files from the browser to LayerNext MetaLake, you need to update CORS configurations for the storage account according to this [documentation](https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/browser-file-upload-azure-storage-blob?source=recommendations&tabs=github-codespaces#7-configure-cors-for-azure-storage-resource).


#### ADD THE SAMPLE JSON HERE ####

Please keep the following parameters with you which will be required by the installation process:
*Azure storage account name
*Access key
*Azure Blob Container name in which you store data

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
