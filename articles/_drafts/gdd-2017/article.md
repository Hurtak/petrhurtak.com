Google Developer Days (GDD) are global events showcasing the latest developer products and platforms from Google to help you quickly develop high quality apps, grow & retain an active user base, and tap into tools to earn more.

## Day 1

### Day 1 Keynote

10:00-11:00 Jason Titus, Tal Oppenheimer, Francis Ma, Sara Robinson, Daniel Galpin, Tilke Judd

- Number of european developers is bigger than number of American and Canadian developers combined.

Android Instant Apps we also mentioned as major feature of Android ecosystem, they allow users to run your apps instantly, without installation. This is not done automatically, you need to organize your project into feature modules, and these features are then downloaded on demand, and then you can use the same code in the instant app and installable app.

First class Kotlin support in the Android ecosystem got
    - Kotlin support build into Android Studio
    - big applause.

ARCore
    - SDK preview
    - Googles ARKit

Android auto
    - partnership with 50 brands
    - on its way to became standard feature en every new car
    - Audi and Volvo close partnership, so they should be getting Android Auto first

Machine learning
    - Number of products using machine learning has grown dramatically in Google
    - as an example they shoved Google Vision API
        - you put in image it tells you what it can see
        - what are significant landmarks or buildings
        - are there any faces, and if there are what are their facial expressions
        - text or documents on the image, if there is it will try to convert it to structured text
        - safe search (adult, spoof, medical, violence)
        - JSON api
        - https://cloud.google.com/vision/
    - Tensorflow
        - Google machine learning framework
        - Most popular ML framework on Github with 64k start
        - example with playground.tensorflow.org
    - Tensor Processing Unit (TPU), ASIC build for tensorflow, order of magnitude better performance per wat for ML

Chrome
    - overview of new APIs and features
    - webVR
    - AMP
        - 900K Domains
        - Amazon uses them
    - PWA
        - make the web app feel closer to native app
    - Lighthouse
        - Audit your site speed, accessibility
        - Chrome Extensions
        - Since Chrome 60 Lighthouse integrated into Chrome dev tools

Firebase
    - Acquired by Google 2015
    - Cloud functions - competitor to AWS
    - Performance monitoring, error logging, google analytics for firebase

Extending Udacity partnership
    - Scholarshit to Android developers
    - expanding the scope to include both Android and Web development

### Progressive Web Apps: What, why and how?

11:30-12:15 Sam Dutton

- Number of apps average user installs per month: ZERO
- Payment request API
- Reliability means never show the dinosaur (chrome page displayed when user is offline)
- Cache API https://developer.mozilla.org/en-US/docs/Web/API/Cache
- push notifications
- prompt to add to homescreen
- integrated into os - native uninstall buttons and so on
- "by 2020 pwa will have replaced 50% of general-purpose consumer facing apps"
- approaches
    - from the ground up
    - a simple version
        - airberlin - mainly the the boarding pass section
    - a single feature
        - The Company Weather - only weather notifications

### Android Things: The IoT Platform for Everyone

12:15-13:00 Rebecca Franks

Extension of the mobile plpatform for IOT and mobile devices
Probably something similar to Windows 10 IoT Core
Subset of android
    - Android apps like Launcher, Phone, Contacts removed
    - Application frameworks - some removed like Notifications and Wallpapers
    - Libraries, Android runtiome and Linux Kernel stays

### From website to Progressive Web App

13:00-13:45 Ewa Gasperowicz

- use lighthouse since it has PWA reports
- workbox.org
    - offline caching
    - offline analytics
    - background sync
- Some actions happen when user is offline so you should account for that, eg analytics needs to work offline (eg batch the tracked events and send them when the connection is back up)
- images by function
    - navigation and action
        - important, inline
    - branding and priority
        - also important, precache
    - decorative
        - cache at runtime with some limitation about how many KB or how many images should be stored
    - informative
        - fallback/placeholder images
- pwa.rocks

### In record time: How we quickly built a serverless, modern app with Firebase and Flutter

14:45-15:30 Seth Ladd, David DeRemer

- Flutter What is:
    Flutter is different than most other options for building mobile apps because Flutter uses neither WebView nor the OEM widgets that shipped with the device. Instead, Flutter uses its own high-performance rendering engine to draw widgets.

    In addition, Flutter is different because it only has a thin layer of C/C++ code. Flutter implements most of its system (compositing, gestures, animation, framework, widgets, etc) in Dart (a modern, terse, object-oriented language) that developers can easily approach read, change, replace, or remove. This gives developers tremendous control over the system, as well as significantly lowers the bar to approachability for the majority of the system.
- Shown on some agency story that build app for Hamilton
- They worked closely with Flutter team so they listened to the team needs and quickly fixed critical bugs and added features
- Live reload
- Probably not ready for use since they lanched app in august and they needed direct Flutter team help to fix critical bugs and add features.

- Used firebase and firebase functions instead of fully fledged backed
- Written in nodejs, typescript respectively (did not mention why Dart was not considered)

- Unlike with React/React Native it does not support web
- Was not convinced
- Dart reallny not used anywhere outside of Google

## Introducing ARCore: Augmented Reality at Android Scale

17:00-17:45 Tom Salter

ARCore is Google’s new Android SDK that brings Augmented Reality capabilities to millions of mobile devices. In this talk, we will introduce the main concepts of ARCore, walk through building your first AR app and how to make the most of the ARCore SDK.

- Motion tracking - as your mobile device moves through the world, arco combines visual data from the dfevice cameeare and IMU to estimate position and orientation of the camere relative to the world over time.
- plane finding
- light estimation

- WebXR
    - real web standards for AR do not exist yet
    - avaliable in experimental browsers of Chrome for ios and Android.

## Day 2

### Day 2 Keynote

10:00 - 10:45 Mícheál Ó Foghlú, Ewa Macias, Behshad Behzadi

- tom cruise movie
- health questions webmd
- can i swin in lake of zurich
- pictures of thomas - kontext
how many calories does it have - camera points at apple
- how much is it in swiss frank
- noise reduction with machine learning
- probably biggest applause at the conference

# TODO images

### Machine Learning with TensorFlow

11:00-11:45 Andrew Gasparovic

graphical debugger
most popular machine learning repository on github
open source - external contributors - additional hardware support and language  drivers
- used in google translate improved translations up to 80%
    - replaced lots tens of thousands of hand tuned code with linguists
- google photos - search in photos
tensorflow light on android - on device inference tasks
- machine learning for diagnosing medical conditions
    - computer vision model - as good or even slightly better as average doctor

### Containers, Kubernetes and Google Cloud

12:30 - 13:15 Robert Kubis, Steffen Hanikel

raspberry pi cluster

docker multistage build

### The Year Ahead in Global Tech Policy

13:15 - 13:45 Danielle Osler

Very broad and general

3 main areas
- internet of things
    - lawmakers consider regulations because of the amount of recent hacks of IoT devices
- Fragmentation on android
- Fair USD of API
    - debate weather API should be copyrightable

### Frameworks and Tools for Progressive Web Apps

14:15-15:00 Stephen Fluin

### What's next for the Web

15:00-15:45 Thomas Steiner

- probably the most packed event I have seen in the conference (or at least on par with day 1 opening keynote), on the other hand it was in the 2nd biggest room
- pwa
    - https://paperplanes.world/
    - fullscrenn for PWA
    - improved add to homescreen experience
        - you can search it and find in app drawer
    - web share API - native share dialog
        navigator.share
    - push notifications
        - macOS notifications center - you can integrate there
    - one tam sign up API
        - new way to create accounts on mobule web
        - supports automatic returning user sign in
        - smartlock.retrieve and smartlock.hint
    - storage estimations
        - navigator.storage.estimete() - promise
    - shape detection API
        - detect faces, read barcodes, run OCR
    - media session API
    - WebVR
    - performance related API
        - network information
            - realtime network information
            - navigator.connection.type
            - navigator.connection.downlinkMaxs
            - navigator.connection.addEventListener('chagne', () => {})
            - usecase - dynamically requiest low-res asset on slow network, potentionally contradiction media queries
        - navigation timing API
        - client hints
            - size of memory
            - new http header Accept-CH = Device-Memory
            - navigator.deviceMemory, navigator.hardwareConcurrency
        - WebBluetooth
            - Comunicate securely with nearby Bluetooth
            - Lets websites diccover and comminicate with devices over the Bluetooth4 wirelesst standard
            - Partially implemented on Chrome
        - WebUSB
            - Access specifically designed for the web devices - device need to be specifically designed foth use on the web, this is not about exsposing all USD devices
        - Stay up to date developers.google.com/web/updates
    - Lots new API only avaliable on https

### Intro to DeepMind

16:30-17:15 Juan Silveira

- A quick overview of the work DeepMind's been doing.
- Trained on classical games
- AlphaGo
- 15% improvement on Google highly optimized datacenters

### Closing Keynote

17:15-18:00 Dirk Primbs, Sowmya Subramanian

- Only the second talk was interesting
- There was like 15 min break because the were not able to play video on fullscreen
- From the Engineering Director, YouTube.
- which target audience portion can you do more for? gender, ethnic, disability, age...)
- first airbags killed more women and kids, as the dummies used during crash tests were tall men
- problem with different skin colors in the photo
    - black color skin is not reckognized in the camera
- engineers/technology are not racists, it is just that it was not tested properly on all target demographics.
- youtube for kids
- emoji in different skin colors

## Other Observations

- Everytime they shoved some small example code that was not related ot the main topic of the presentation (eg, in the Kubernetes file they shoved code of small http server, or with the Firebase functions they shoved what they are running there), there were several nodejs code, one typescript and one go. No Python.
- Lots of emphatsis on PWA, 3 talks, and 2 training courses
