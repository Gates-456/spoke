import Command from "../Command";

/**
 * @param object THREE.Object3D
 * @param componentName String
 * @constructor
 */

export default class SetGLTFComponentPropertyCommand extends Command {
  constructor(object, componentName, propertyName, value) {
    super();
    this.type = "SetGLTFComponentPropertyCommand";

    this.object = object;
    this.componentName = componentName;
    this.propertyName = propertyName;
    const component = this.editor.gltfComponents.get(this.componentName).getComponent(object);
    this.oldValue = component.getProperty(propertyName);
    this.newValue = value;

    this.name = `Set ${componentName}.${propertyName} on ${object.name}`;
  }

  execute() {
    const component = this.editor.gltfComponents.get(this.componentName).getComponent(this.object);
    component.updateProperty(this.propertyName, this.newValue);
    this.editor.signals.objectChanged.dispatch(this.object);
  }

  undo() {
    const component = this.editor.gltfComponents.get(this.componentName).getComponent(this.object);
    component.updateProperty(this.propertyName, this.oldValue);
    this.editor.signals.objectChanged.dispatch(this.object);
  }
}