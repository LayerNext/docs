---
sidebar_position: 3
---

# How LayerNext works

To better understand how LayerNext work, it may be useful to describe the core components that make up the platform.

At the heart of LayerNext is the Data Engine, which is responsible for connecting to and tracking changes inside each Storage Connection that is configured within it. The Data Engine will take all known data types that it encounters and create an index to them. The data is then made available through APIs and SDKs.

The Data Engine creates a unified interface that allows us to build useful Computer Vision and AI tools on top of them.

You can think of model training as an “application” within the LayerNext's platform as well. Our Training SDK exposes a set of prebuilt functions that make it easy to work with data in the context of machine learning.
