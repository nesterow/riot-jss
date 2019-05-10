# riot-jss
[JSS](https://cssinjs.org/) plugin for Riot.JS

## Installation

```bash
npm i -S riot-jss
```

## Usage

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




