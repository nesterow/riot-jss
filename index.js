const JSS = require('jss').default
const jssPreset = require('jss-preset-default').default
const jssPluginNested = require('jss-plugin-nested').default
JSS.setup(jssPreset())
JSS.use(jssPluginNested)

const getClasses = (jssObject) => {
  const {classes} = JSS.createStyleSheet(jssObject).attach()
  return classes
}

const jss = function(obj) {
  if (!this.classes) {
    this.classes = {}
  }
  return Object.keys(obj)
      .filter((e)=> this.classes[e] && obj[e])
      .map((e) => this.classes[e])
      .join(' ')
}

module.exports = function(riotInstance, initialStyles) {

  riotInstance.jss = jss.bind(riotInstance)

  if (initialStyles) {
    riotInstance.styles = getClasses(initialStyles)
  }
  if (riotInstance.styles) {
    riotInstance.classes = getClasses(riotInstance.styles)
  }

  riotInstance.setStyles = function(jssObj) {
    this.styles = getClasses(jssObj)
    this.classes = getClasses(this.styles)
    this.update()
  }
  .bind(riotInstance)
  
  return riotInstance
}

