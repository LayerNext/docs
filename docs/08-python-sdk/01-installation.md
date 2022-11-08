---
---

# Installation

The Python SDK provides necessary functions to use LayerX platform for your machine learning needs such as uploading annotations, downloading datasets and downloading annotations.

It is available as pip installable package where you get it to your Python program by:

```bash
pip install layerx-sdk
```

You need your LayerX API key and secret to use the Python SDK. Those can be found and copied from the ‘API Keys’ section of the frontend (See screenshot below).

The first thing is to create a LayerX API client with security credentials as below. Please note that you should give the base url of the LayerX API depending on your customer sub domain.

```
url = 'https://api.[customer_sub_domain].layerx.ai'
client = layerx.LayerxClient(api_key, secret, url)
```

Then with the created API client, you can access all the available functions in Python SDK reference. For further information regarding Python AP client, please refer to the relevant github repository: https://github.com/LayerX-AI/layerx-python-sdk
