## @kamp-n/gads-preview
### Translation keys
headline
description
long_headline
business_name
button.open
flag.ad


## Test
```bash
ng test <project>
```

*exemple: ng test ng-logger*

*NB: see angular.json for the list of projects*

## Locally test package
 
1) Build the package and watch for changes
```bash
ng build <project> --configuration <configuration> --watch
```

2) Link the built package
```bash
cd dist/<project>
npm link
```

3) From your **application** (which uses the package), link the package
```bash
cd <my-application>
npm link @kamp-n/<project>
```

*exemple: npm link @kamp-n/ng-logger*

4) Cleaning up
```bash
my-application> npm unlink @kamp-n/<project> --no-save
dist/project> npm rm -g @kamp-n/<project>
```
*exemple: npm unlink @kamp-n/ng-logger --no-save*

## Sources
[How to develop Angular libraries locally](https://medium.com/@aleksanderkolata/how-to-develop-angular-libraries-locally-ed8e1fd16892)
