import JSDOMGlobal from 'jsdom-global'
import ssr from '@riotjs/ssr/register'
import {mount, register, install} from 'riot'
import {expect, use} from 'chai'
import sinonChai from 'sinon-chai'
import {spy} from 'sinon'
import withJSS from '../'

describe('riot-jss', () => {
  before(() => {
    JSDOMGlobal()
    use(sinonChai)
    ssr()
  })

  it('it injects required instance variables', () => {
    const MyComponent = require('./components/my-component.riot').default
    register('my-component', MyComponent)
    
    const root = document.createElement('div')

    document.body.appendChild(root)
    const instance = mount(root, {}, 'my-component') [0]
    withJSS(instance, {})
    
    expect(typeof instance.jss).to.be.equal('function')
    expect(typeof instance.setStyles).to.be.equal('function')

    instance.setStyles({
      bodyClass: {
        background: 'black'
      }
    })
    expect(typeof instance.styles).to.be.equal('object')
    expect(typeof instance.classes).to.be.equal('object')
    expect(typeof instance.classes.bodyClass).to.be.equal('string')
    expect(instance.jss({bodyClass: true})).to.include('bodyClass-')
  })

  it('it works as a plugin', () => {
    const MyComponent = require('./components/with-jss-global.riot').default

    install(function(componentInstance){
      withJSS(componentInstance)
    })

    register('with-jss-global', MyComponent)
    const root = document.createElement('div')

    document.body.appendChild(root)
    const instance = mount(root, {}, 'with-jss-global') [0]
    
    expect(typeof instance.jss).to.be.equal('function')
    expect(typeof instance.setStyles).to.be.equal('function')
    expect(typeof instance.styles).to.be.equal('object')
    expect(typeof instance.classes).to.be.equal('object')

  })

  it('it works as DI on a component exports', () => {
    const MyComponent = require('./components/with-jss-global.riot').default

    withJSS(MyComponent.exports)

    register('with-jss-global2', MyComponent)
    const root = document.createElement('div')

    document.body.appendChild(root)
    const instance = mount(root, {}, 'with-jss-global2') [0]
    
    expect(typeof instance.jss).to.be.equal('function')
    expect(typeof instance.setStyles).to.be.equal('function')
    expect(typeof instance.styles).to.be.equal('object')
    expect(typeof instance.classes).to.be.equal('object')

  })

  it('it works as a decorator', () => {
    const MyComponent = require('./components/with-jss.riot').default
    register('with-jss', MyComponent)
    const root = document.createElement('div')

    document.body.appendChild(root)
    const instance = mount(root, {}, 'with-jss') [0]
    
    expect(typeof instance.jss).to.be.equal('function')
    expect(typeof instance.setStyles).to.be.equal('function')
    expect(typeof instance.styles).to.be.equal('object')
    expect(typeof instance.classes).to.be.equal('object')

  })

})