# Visualization tool for People Re-ID
This project was developed for the final project of the Visualization for Machine Learning course, at the Center for Data Science, NYU.

Group Members: [Suemy Inagaki](https://github.com/suemyinagaki), [Juan Alvarado](https://github.com/Juanroalvarado) and Yichen Chi

![Tool Interface](imagens/visml-teaser.png)

## StreetAware Dataset Analysis

### Introduction
In this project, we analyze the performance of the Bot-SORT and ByteTrack people re-identification models using the [StreetAware](https://www.mdpi.com/1424-8220/23/7/3710) dataset. The StreetAware dataset is a high-resolution synchronized multimodal urban scene dataset. Our objective is to investigate scenarios where these models fail and establish metrics to compare their performances on the StreetAware dataset.

### Tool Description
Our tool's components are interactive and dynamic, updating with each new query or any update to the central component. This dynamic nature enables thorough investigation of model output data, allowing users to evaluate not only the current frame but also frames before and after the evaluated data. Our tool comprises four main components:

#### 1. Query Parameters
This component allows users to input query parameters such as number of people in the frame, and models scores (Bot-SORT or ByteTrack).

#### 2. Query Results
The query results section displays the output generated by the models based on the provided parameters. It shows detailed information about the frame, and any relevant metadata.

#### 3. Analytics Panel
The analytics panel offers interactive visualizations and insights into the patterns and characteristics of the model's output. Users can explore trends, anomalies, and other relevant data points.

![Main Component](imagens/main-component.png)

#### 4. Metrics
In this section, users can view and compare performance metrics of the Bot-SORT and ByteTrack models.

### Contributions
Our work presents two main contributions:

#### (i) Visualization Tool Development
We developed a visualization tool to explore patterns and characteristics of scenarios where the models fail. This in-depth analysis enabled us to pinpoint weaknesses in the models and devise strategies to enhance their accuracy and robustness.

#### (ii) Insights into Model Limitations
We provide valuable insights into the limitations of the BoT-SORT and ByteTrack models, particularly in specific situations of identifying people in videos. We anticipate that our analyses and findings will inspire the development of novel techniques and enhancements in people identification systems, thereby contributing to greater efficacy and security across various practical applications.
