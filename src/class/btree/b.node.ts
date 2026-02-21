import MWayTreeNode, { DEFAULT_GRADE } from '../mwaytree/mway.node';

export default class BTreeNode<T> extends MWayTreeNode<T> {
  constructor(degree: number = DEFAULT_GRADE) {
    if (degree < 3) {
      throw new Error('El grado debe ser mayor o igual 3');
    }
    super(degree);
  }
}
