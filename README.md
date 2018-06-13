# NumberTransmutation

A simple app that transmutates numbers into their representing words.Al
Counting system based on `https://www.mathsisfun.com/numbers/counting-names-1000.html` (UK version)

## Requirements

You will need `nodejs` and `npm` installed in your machine to run this. And a working internet connection.

## How To Use

The app will immediately take you to the `transmutation` route. All you need to do is enter any number in the input and hit enter. The results will show below the input.

Please note that the app accepts only inputs consisting of the negative sign (-) and any ammount of digits. Commas, colons, dots, letters and everything else is considered a bad input. 

An optional `configure` route can be accesed using the right-hand link called 'configure' in the navigation bar.
Here you can view the system limit and optionally enter your own limit.

## How To Run

### Run in Production mode

Run `npm start`. 
Navigate to `http://localhost:4200/`

### Run in Dev mode

Run `npm i && ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm i && ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).