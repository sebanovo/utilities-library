import MWayTreeNode, { DEFAULT_GRADE } from '../mwaytree/mway.node';

export default class BTreeNode<T> extends MWayTreeNode<T> {
  constructor(degree: number = DEFAULT_GRADE) {
    super(degree);
  }
}
