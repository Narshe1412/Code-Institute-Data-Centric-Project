# Timesheet Helper

[![Build Status](https://travis-ci.com/Narshe1412/Code-Institute-Data-Centric-Project.svg?branch=master)](https://travis-ci.com/Narshe1412/Code-Institute-Data-Centric-Project) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Narshe1412_Code-Institute-Data-Centric-Project&metric=alert_status)](https://sonarcloud.io/dashboard?id=Narshe1412_Code-Institute-Data-Centric-Project) [![Project Version](https://img.shields.io/github/package-json/v/Narshe1412/Code-Institute-Data-Centric-Project?color=gree)](https://github.com/Narshe1412/Code-Institute-Data-Centric-Project)
[![License](https://img.shields.io/github/license/Narshe1412/Code-Institute-Data-Centric-Project?color=g)](https://github.com/Narshe1412/Code-Institute-Interactive-Frontend-Algorithms/blob/master/LICENSE)

As per my daily job, we're required to track the time we invest in each assigned task and upload weekly to an Excel summary provided by management. It is very easy to forget when did you started each task, the exact amount of time invested, hard to manage when you're multitasking two or more tasks, etc...

This causes, not only frustration to the employee but also to management, as they cannot trust the values they're gathering as they're not 100% accurate.

This project attempts to solve this problem by also providing the end-user a better way to self-manage work and rest times by using the famous [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique), if he or she wishes to abide to it.

## Update August 2019

This project was initially designed to be my User Centric project however as I started developing I realized that it was getting too much out of scope so I decided to leave it on the shelf as my project to be for the data centric project. I didn't know at that time that the project example that Code Institute will provide is also a task manager application.

However, after discussing this with my mentor, we've considered this to be complex enough as follows:

- The original project was server side rendered with Flask as render engine. This project uses Flask as the data access layer piece providing RESTful APIs that will be consumed by a frontend app.
- The original app is not a Single Page Application and needs to re-render on each user action. This application use ReactiveX module to handle state changes and provide a seemless experience to the user without navigating away.

## UX

The intended audience of this website is a person who is going to be doing a job that can be separated into tasks and where time needs to be tracked, either for management request, or to ensure the user that enough breaks are taken for both content assimilation or avoiding interrumptions.

An example of such tasks are:

    - Software Development
    - Studying
    - Physical work
    - Exercising
    - House chores
    - ...

By adding a mobile-first design approach we allow the user to not have to rely in a computer to track the time and remaining tasks to do.

### User Stories

#### Must Haves

- As a user, I want to be able to start and stop the timer, so that I can track the time spent on each task assigned.
- As a user, I want to be able to record tasks in the app, so that I can better organize my time an plan ahead.
- As a user, I want to be able to choose the type of timer between Pomodoro timer and regular timer so I can pick the best that suit my needs regarding the task at hand.
- As a user, I want to be able to change the state of the tasks, so that I can mark those that I complete and tag those that were not completed with some useful information.

#### Should haves

- As a user, I want to be able to store the application data, so time and task completion are not lost after the web is closed.
- As a user, I want to be able to visualize a summary of the time spent using a variety of charts, so that I can have a better picture of the time spent for my own records or for management reporting.

#### Could haves

- As a user, I want to be able to import multiple tasks from a file or a structured string format, so I don't spend too much time adding new tasks to the system.
- As a user, I want to be able to export the data of the application, so I can use it in different applications or send it as a report to my supervisors.

#### Won't haves

- At this point further API integration is out of scope. In the future, it would be great if this can be integrated with other task management tools like Trello, project management tools like JIRA or even software development tools like Github or Visual Studio.

---

### Mockups and Diagrams

Initial Paper Mockup:
![Initial Mockup made on paper](docs/img/initial-mockup.jpg "Initial Mockup made on paper")

Basic Wireframe Setup for Mobile view and Desktop View
![Mobile first design](docs/img/mobile.png "Mobile first design")
![Desktop design](docs/img/desktop.png "Desktop design")

State Machine for Timer Functionality
![State Machine for Timer](docs/img/sbm-timer.png "State Machine for Timer")

State Machine for Task Status
![State Machine for Task](docs/img/sbm-task.png "State Machine for Task")

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

### Existing Features

- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement

- Another feature idea

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Angular](https://angular.io/)

  - The project structure was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.
  - This includes several libraries adopted by the Angular framework to ease the programming experience, code quality and end to end deployment of the product such as Typescript, Karma for testing, SASS stylesheets, Webpack bundling and minifying, etc...

- [Angular Material](https://material.angular.io/)

  - The project uses Material design components from the Angular official repository, as well as the themes provided by this library. This ensures that the site follows a mobile first approach, with focus on the UX dictated by the **Material design** principles and guidelines from [Google](https://material.io/design/).

- [Travis CI](https://travis-ci.com/)

  - I'm using Travis to automate Continuous Integration in the project, making sure that all tests are properly executed before deploying and facilitating a future implementation of Continuous Deployment to either Heroku or Github Pages.

- [Highcharts](https://www.highcharts.com/)
  - I'm using this charting library as opposed to D3 as it will be benefitial to my day to day job to gain more exposure with it. Although Highcharts normally requires a license, it is free to use for non-comercial purposes. An option to disable charting feature will be given for those who want to use this project for their own company. Future releases will include a D3 version if time permits.

## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:

- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Credits

### Content

- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media

- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
- Favicon provided by <a href="https://icons8.com/icon/25717/task">Icons8 - Task icon</a>
