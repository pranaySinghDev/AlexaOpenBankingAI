# Alexa Open Banking AI
This project gets the data from Hsbc's open API for developers integrate it with Alexa AI & Amazons Cloud services. 

This project is broadly categorized in 3 parts:

1.HSBC Open banking API to get ATM details:

Target URL: GET /open-banking/v1.0/locations/atms/country/{country}

This API will return data about all ATMs in the specified country. Data is only available for the United Kingdom (ISO country codes ENG, WLS, SCT, NIR).

2.Creating an Alexa Skill Set

3.Providing reference to Node.js lamda function code to perform the task of fetchind data from HSBC API

#Alexa skill Name:
Hsbc data

#HSBC API 
In this project we are going to focus on 'ENG' region only
Target URL: https://api.hsbc.com/open-banking/v1.0/locations/atms/country/ENG

#Sample Utterances:
HsbcDataIntent Get Details of {AtmId}

HsbcDataIntent what is the location of {AtmId}

#Test
Utterances:
Hsbc data get details of Abingdon
![Alt text](relative/path/to/AlexaRequest.PNG?raw=true "Title")

Response:
Your bank is located at 6 High Street postcode OX14 5AZ Latitude 51.669979 Longitute -1.282277
![Alt text](relative/path/to/AlexaResponse.PNG?raw=true "Title")
