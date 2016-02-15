Angular 1.x/Browserify component and app Yeoman generator

#Usage

Install Yeoman

```
npm install -g yo
```

<<<<<<< HEAD
Install the generator

```
npm install -g generator-angular-browserify
```

Run the component sub generator using:
=======
Install this generator via npm:

```
npm install --global generator-angular-browserify
```

Try running the component sub generator locally:
>>>>>>> master

```
yo angular-browserify:component my-new-component
```

Using the argument as a name, this command will create a new directory and boilerplate files for your component:

```
my-new-component/
    my-new-component.html
    my-new-component.js
    my-new-component.less
```

#Options

###Components

When creating a new component, you will be prompted with two questions:

* Would you like to include a LESS file? (self explanatory...)
* What would you like to call the main function in this component?

This will name the outer wrapper function of the component, and construct the name of the controller function within the component.

###Services

When creating a new service, you will be prompted with two questions:

* What would you like to call the service? (Default: *NewService*)
* What is the output subdirectory? (Default: *services*)

This will name the outer wrapper function of the service, and create the service file in the specified subdirectory.

###State (Redux)
When creating state slices for using Redux, you will be prompted with two questions:

* Create state slice in its own folder in state/? (Default: *Yes*)
* Add new slice to state/index.js (if it already exists)? (Default: *Yes*)

This will create reducer and actions files. If there's no current state folder, it will create one with an index.js file
that requires the newly created reducer, and adds an empty action-names.js file.

If you choose yes to the first question, the reducer and actions files will be created in a subfolder of state/

If you choose yes to the second question, it will attempt to update the existing index.js file in state/ to include
the new reducer.
* 

#License

The MIT License (MIT)

Copyright (c) 2016 Buildium

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
