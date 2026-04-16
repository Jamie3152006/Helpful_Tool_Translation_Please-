# Project Overview:

## Objective
When asked to create a helpful tool and to think of what audience it will cater to, I thought to my own personal life experience and how I for most of my life now have had to act like a personal translator for my family. With them being immigrants and me growing up in America, when they did not understand something in English, they would ask me to explain it to them in Mandarin. This led me to think about how sometimes there are easy direct translations, but things like idioms and modern slang is a lot harder to explain, which made me think of creating this tool for my project. A translation web extenstion that will run in Chrome that will automatically scan the page for idioms or slangs, and create a pop up that holds the translation information, intended for non-native English speakers that have a hard time understanding more ambiguous phrases.  

Due to time constraints, I had to simplify the project a lot to get it to a working stage in time for the final presentation, so I reduced it to just translating slang and idioms from English to Mandarin, as opposed to all the languages of the world, and for the words that it would explain, words that my mom has personally asked me to help translate. Obviously, if I wanted this to be more widely applicable, I would include a lot more languages and have a database that would store all the definitions and words that needed to be translated, but for now, I think narrowing it down to specifically my mom made it a lot easier to make, and also adds a personal touch to this project. 


## Process of Making:
I used manifest.json and then created a separate json file that stores all the information of the pop up, such as the definition, the translation in Mandarin and then how it would be used in a sentence. Within the javaScript file, I essentially coded it where it scans for and highlights the keywords I set within the json file, and then it creates a pop up, and using the getElementByID, I was able to pull all the information over from the json file. It also enables it to run as a chrome extension, with the specifications in the manifest.json file. I then used CSS to style the specific elements and make the pop up feel more personally me. 


## How to Download:
To download this web extension, which is only Chrome compatiable right now, save the files onto your desktop, then open Chrome and navigate to their extensions page and select manage extensions. Toggle on developer mode, and when clicking on Load Unpack, navigate and select the folder that holds all the files. 

**note: this is a very hyper specific version of this tool, not super applicable to all currently**
