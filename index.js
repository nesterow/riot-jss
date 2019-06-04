const JSS = require('jss').default
const jssPreset = require('jss-preset-default').default
const jssPluginNested = require('jss-plugin-nested').default
JSS.setup(jssPreset())
JSS.use(jssPluginNested)

const getClasses = (jssObject) => {
  const Styles = JSS.createStyleSheet(jssObject)
  const {classes} = Styles
  if (typeof window !== 'undefined') Styles.attach();
  return [classes, Styles]
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

  riotInstance.classes = riotInstance.classes || {} 
  riotInstance.styles = riotInstance.styles || initialStyles || {}
  riotInstance.jss = jss.bind(riotInstance)

  if (riotInstance.styles) {
    const [classes = {}, stylesheet = {}] = getClasses(riotInstance.styles)
    riotInstance.classes = classes
    riotInstance.stylesheet = stylesheet
  }

  riotInstance.setStyles = function(jssObj) {
    this.styles = jssObj
    const [classes = {}, stylesheet = {}] = getClasses(this.styles)
    this.classes = classes
    this.stylesheet = stylesheet
    this.update()
  }
  .bind(riotInstance)
  
  return riotInstance
}

