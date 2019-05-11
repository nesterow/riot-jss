# riot-jss
[JSS](https://cssinjs.org/) plugin for RiotJS.

JSS is CSS-in-JS. It allows you to write styles in javascript object syntax.


![Status](https://img.shields.io/badge/Status-Beta-green.svg)
![version](https://img.shields.io/badge/Version-1.0.0beta.3-green.svg)
![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)


## Installation

```bash
npm i -S riot-jss
```


## Usage
This plugin provides following functionality in a component scope:
1. Object `classes` - a map of original class names to compiled css classes. 
2. Method `jss({ className: true})` - switches classes based on a condition.
3. Method `setStyles({...styles})` - set new styles and update component

#### Global plugin initialization

Install the plugin globbaly:
```javascript
import {install} from 'riot'
import withJSS from 'riot-jss'
install(withJSS)
//
```
#### Local plugin initialization
Decorate component's exports:
```html
<with-jss>
  <div class={jss({ myClass: true })}>
    Black Background
  </div>
  <script>
    import styles from './with-jss.js'
    import withJSS from 'riot-jss'
    export default withJSS({
      styles,
      state: {},
    })
  </script>
</with-jss>
``` 

#### Writing styles
In order to make the JSS work in scope of a riot component, just add a property called `styles` into your component exports.
Property `styles` must be [a valid JSS object](https://cssinjs.org/jss-syntax).
```javascript
export default{
  styles,
  ...
}
```

#### An example

```html
<my-comonent>
  <div class={jss({ myClass: true })}>
    Black background class
    <p class={classes.text}>white text class</p>
  </div>
</my-component>
```
```javascript
import styles from './my-component.jss'
export default {
  styles,
  state: {...}
}
```
`my-compoent.jss` 
```javascript
export default {
  myClass: {
    background: 'black'
  },
  text: {
    color: 'white'
  }
}
```

#### Licence
MIT




