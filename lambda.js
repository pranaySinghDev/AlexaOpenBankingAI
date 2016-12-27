var https = require('https')

exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`)
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to an Open Banking Alexa Skill, this is running on a deployed lambda function", true),
                        {}
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch(event.request.intent.name) {
                    case "HsbcDataIntent":
                        var endpoint = "https://api.hsbc.com/open-banking/v1.0/locations/atms/country/ENG" // ENDPOINT GOES HERE
                        var body = ""
                        var find=event.request.intent.slots.AtmId.value //"Nantwich"
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                response.on('end', () => {
                    var bankLocationDetails;
                var data = JSON.parse(body)
                for(var bankDetails in data){
                    if (data[bankDetails].AtmId == find )
                    {
                        postCode=data[bankDetails].Location.PostCode;
                        streetName=data[bankDetails].Location.StreetName;
                        latitude=data[bankDetails].Location.Latitude;
                        longitude=data[bankDetails].Location.Longitude;
                        console.log( postCode+": "+latitude+","+longitude+": "+streetName);
                        bankLocationDetails =streetName+" postcode "+postCode+" Latitude "+latitude+" Longitute "+longitude;
                    }
                }
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(`Your bank is located at ${bankLocationDetails}`, true),
                        {}
                    )
                )
        })
    })
        break;


    default:
        throw "Invalid intent"
    }

        break;

    case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

    default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

    } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}
