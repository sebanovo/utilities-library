import { Data } from '../binarysearchtree/binarysearch.node';
import Stack from '../stack';
import { DEFAULT_GRADE } from '../mwaytree/mway.node';
import MWayTree from '../mwaytree/mway.tree';
import BTreeNode from './b.node';

/**
 * Clase que representa un arbol B tree y proporciona métodos para manipularlo.
 * referencia de youtube:
 * - No soporta claves repetidas como el B+ Tree
 * - Es balanceado, pero el grado tiene que ser mayor que 2 para serlo
 * Ojo:
 * Esta implementación en realidad crear un nodo de (grado + 1) hijos y grado claves para
 * poder usar temporalmente esos comodines
 * https://youtu.be/JKg99kepIiY?si=1IvcQxsYDN7_kRsj
 * https://youtu.be/Fu7kVWTcH5Y?si=p5X7EPcb_Jk2L3fC
 * https://youtu.be/Cqtc81Iee08?si=lYoiIM3cpyDBqtbY
 * Para el arbol B+:
 * https://youtu.be/kbbHTXvylqY?si=hKZ1JaYegIBtJ2Ej
 */
export default class BTree<T> extends MWayTree<T> {
  private MAXIMUM_NUMBER_OF_KEYS: number;
  private MINIMUM_NUMBER_OF_KEYS: number;
  /** minimo número de hijos (punteros) que tiene un nodo a la mitad  */
  private MINIMUM_NUMBER_OF_CHILDS: number;

  constructor(degree: number = DEFAULT_GRADE) {
    if (degree <= 2) {
      throw new Error('El grado debe ser mayor que 2');
    }
    super(degree);
    this.MAXIMUM_NUMBER_OF_KEYS = degree - 1;
    this.MINIMUM_NUMBER_OF_CHILDS = Math.ceil(degree / 2);
    this.MINIMUM_NUMBER_OF_KEYS = this.MINIMUM_NUMBER_OF_CHILDS - 1;
  }

  /**
   * Copia el nodo destino al nodo destino
   */
  private copyNode(sourceNode: BTreeNode<T>, targetNode: BTreeNode<T>): void {
    for (let i = 0; i < sourceNode.countData(); i++) {
      targetNode.setData(i, sourceNode.getData(i));
      targetNode.setChild(i, sourceNode.getChild(i));
    }
    targetNode.setChild(targetNode.countData(), sourceNode.getChild(sourceNode.countData()));
  }
  /**
   * Copia un rango de datos e hijos de un nodo.
   */
  private splitRange(
    node: BTreeNode<T>,
    startDataPosition: number,
    endDataPosition: number
  ): BTreeNode<T> {
    const nodeCopied = new BTreeNode<T>(this.degree);
    for (let i = startDataPosition; i < endDataPosition; i++) {
      nodeCopied.setData(nodeCopied.countData(), node.getData(i));
      const child = node.getChild(i);
      if (child !== null) {
        nodeCopied.setChild(nodeCopied.countChildren(), child);
      }
    }
    const extraChild = node.getChild(endDataPosition);
    if (extraChild !== null) {
      nodeCopied.setChild(nodeCopied.countChildren(), extraChild);
    }
    return nodeCopied;
  }

  /**
   * Divide un nodo en dos alrededor de la posición central.
   * Devuelve [leftNode, rightNode].
   */
  private splitNode(node: BTreeNode<T>): [BTreeNode<T>, BTreeNode<T>] {
    const leftNode = this.splitRange(node, 0, this.MINIMUM_NUMBER_OF_KEYS);
    const rightNode = this.splitRange(node, this.MINIMUM_NUMBER_OF_KEYS + 1, node.countData());
    return [leftNode, rightNode];
  }

  private split(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>): void {
    // dividir el nodo en nodo izquierdo y derecho
    const [leftNode, rightNode] = this.splitNode(node);

    const middleData = node.getData(this.MINIMUM_NUMBER_OF_KEYS);
    // caso especial: el nodo era la raiz, osea pila vacia
    if (stack.isEmpty()) {
      const newRoot = new BTreeNode<T>(this.degree);
      newRoot.setData(0, middleData);
      newRoot.setChild(0, leftNode);
      newRoot.setChild(1, rightNode);
      this.root = newRoot;
    } else {
      // clonar los datos e hijos al nodo temporal
      const originalParent = stack.pop()!;
      const temporalParentNode = new BTreeNode<T>(this.degree + 1);
      this.copyNode(originalParent, temporalParentNode);
      temporalParentNode.insertDataOrdered(middleData!);

      // Insertar hijo izquierdo
      const leftFirstKey = leftNode.getData(0)!.key;
      let leftInsertPos = temporalParentNode.findGreaterKeyIndex(leftFirstKey);
      temporalParentNode.setChild(leftInsertPos, leftNode);

      // Insertar hijo derecho (desplazar y luego insertar)
      const rightFirstKey = rightNode.getData(0)!.key;
      let rightInsertPos = temporalParentNode.findGreaterKeyIndex(rightFirstKey);

      // Desplazar hijos a la derecha y luego insertar
      for (let i = temporalParentNode.countData() - 1; i >= rightInsertPos; i--) {
        temporalParentNode.setChild(i + 1, temporalParentNode.getChild(i));
      }
      temporalParentNode.setChild(rightInsertPos, rightNode);

      if (temporalParentNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
        this.split(temporalParentNode, stack);
      } else {
        originalParent.clear();
        this.copyNode(temporalParentNode, originalParent);
      }
    }
  }

  override insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new BTreeNode<T>(this.degree);
      newNodo.setData(0, data);
      this.root = newNodo;
      return this;
    }
    const stack = new Stack<BTreeNode<T>>();
    let x = this.root;
    while (x !== null) {
      // Caso 1: clave ya existe (actualizar)
      const index = x.getIndexOfData(data.key);
      if (index !== -1) {
        x.setData(index, data);
        break;
      }

      // Caso 2: hoja (insertar)
      if (x.isLeaf()) {
        const temporalNode = new BTreeNode<T>(this.degree + 1);
        this.copyNode(x, temporalNode);
        temporalNode.insertDataOrdered(data);

        if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.split(temporalNode, stack);
        } else {
          x.clear();
          this.copyNode(temporalNode, x);
        }
        break;
      }

      // Caso 3: seguir buscando
      let posicionDondeBajar = x.findGreaterKeyIndex(data!.key);
      stack.push(x);
      x = x.getChild(posicionDondeBajar)!;
    }
    return this;
  }

  override insertR(data: Data<T>): this {
    const rec = (node: BTreeNode<T> | null, data: Data<T>, stack: Stack<BTreeNode<T>>): void => {
      // Caso base 1: árbol vacío
      if (node === null) {
        const newNode = new BTreeNode<T>(this.degree);
        newNode.setData(0, data);
        this.root = newNode;
        return;
      }

      // Buscar si la clave ya existe en el nodo actual
      const index = node.getIndexOfData(data.key);
      if (index !== -1) {
        node.setData(index, data);
        return;
      }

      // Caso base 2: es hoja
      if (node.isLeaf()) {
        const temporalNode = new BTreeNode<T>(this.degree + 1);
        this.copyNode(node, temporalNode);
        temporalNode.insertDataOrdered(data);

        if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.split(temporalNode, stack);
        } else {
          node.clear();
          this.copyNode(temporalNode, node);
        }
        return;
      }

      // Caso recursivo: seguir buscando
      const posicionDondeBajar = node.findGreaterKeyIndex(data.key);
      stack.push(node);
      rec(node.getChild(posicionDondeBajar)!, data, stack);
    };
    rec(this.root, data, new Stack<BTreeNode<T>>());
    return this;
  }

  /**
   * Encuentra el nodo donde se encuentra la clave y sus predecessores
   * Si no existe arbol retorno child = null y la pila de parents vacia
   * Si el arbol solo tiene una hoja:
   *  - Si existe el elmeento retorna el nodo sino existe retorna null
   * Sino siempre retorna el child que encuentre y la pila de parents
   * @param key clave a buscar
   */
  findNodeAndParents(key: number): { child: BTreeNode<T> | null; parents: Stack<BTreeNode<T>> } {
    let x = this.root;
    const parents = new Stack<BTreeNode<T>>();
    if (x === null) {
      return { child: null, parents };
    }
    if (x.isLeaf()) {
      if (x.getIndexOfData(key) !== -1) {
        return { child: x, parents };
      } else {
        return { child: null, parents };
      }
    }
    while (x !== null) {
      const index = x.getIndexOfData(key);
      if (index !== -1) {
        return { child: x, parents };
      }
      parents.push(x);
      x = x.getChild(x.findGreaterKeyIndex(key));
    }
    return { child: x, parents };
  }

  /**
   * Transfiere una clave desde un nodo hermano (sibling) al nodo con underflow.
   *
   * Cuando un nodo hermano tiene claves de sobra, puede "prestar" una al nodo
   * que tiene underflow. El proceso implica:
   * - Bajar una clave del padre al nodo con underflow
   * - Subir una clave del hermano al padre
   * - Transferir un hijo si los nodos no son hojas
   *
   * @param parent - Nodo padre de ambos nodos
   * @param underflowNode - Nodo que tiene déficit de claves (recibe la clave)
   * @param siblingNode - Nodo hermano que tiene claves de sobra (presta la clave)
   * @param underflowPosition - Posición del underflowNode en el arreglo de hijos del padre
   * @param isRightSibling - Indica si el hermano está a la derecha (true) o izquierda (false)
   */
  private borrowFromSibling(
    parent: BTreeNode<T>,
    underflowNode: BTreeNode<T>,
    siblingNode: BTreeNode<T>
  ): void {
    const underflowPosition = parent.getIndexOfChild(underflowNode);
    const siblingPosition = parent.getIndexOfChild(siblingNode);
    const isRightSibling = siblingPosition > underflowPosition;
    const isLeftSibling = siblingPosition < underflowPosition;
    // CASO 1: El hermano está a la DERECHA (presta su PRIMERA clave)
    if (isRightSibling) {
      // 1.1 Bajar la clave del padre al nodo con underflow
      const parentKey = parent.getData(underflowPosition);
      parent.displaceDatasToLeft(underflowPosition);
      underflowNode.insertDataOrdered(parentKey!);

      // 1.2 Subir la primera clave del hermano al padre
      const siblingKey = siblingNode.getData(0)!;
      siblingNode.displaceDatasToLeft(0);
      parent.insertDataOrdered(siblingKey);

      // 1.3 Si el hermano no es hoja, transferir también su primer hijo
      if (!siblingNode.isLeaf()) {
        // Obtener el primer hijo del hermano
        const siblingChild = siblingNode.getChild(0);
        const childFirstKey = siblingChild?.getData(0)!.key;

        // Encontrar posición correcta para insertar el hijo en underflowNode
        const insertPosition = underflowNode.findGreaterKeyIndex(childFirstKey!);

        // Insertar el hijo en underflowNode (desplazando si es necesario)
        underflowNode.displaceChildsToRight(insertPosition);
        underflowNode.setChild(insertPosition, siblingChild);

        // Reorganizar los hijos restantes del hermano
        if (siblingNode.hasChildToAfter(0)) {
          // Desplazar todos los hijos del hermano una posición a la izquierda
          for (let i = 0; i < siblingNode.countData() + 1; i++) {
            // no usar el codigo comentado
            // const remainingChild = siblingNode.getChild(i + 1);
            // siblingNode.displaceChildsToRight(i);
            // siblingNode.setChild(i, remainingChild);
            siblingNode.setChild(i, siblingNode.getChild(i + 1));
          }
          // El último espacio del hermano queda vacío
          siblingNode.setChild(siblingNode.countData() + 1, null);
        }
      }
    }
    // CASO 2: El hermano está a la IZQUIERDA (presta su ÚLTIMA clave)
    else if (isLeftSibling) {
      // 2.1 Bajar la clave del padre al nodo con underflow
      const parentKey = parent.getData(underflowPosition - 1);
      parent.displaceDatasToLeft(underflowPosition - 1);
      underflowNode.insertDataOrdered(parentKey!);

      // 2.2 Subir la última clave del hermano al padre
      const siblingKey = siblingNode.getData(siblingNode.countData() - 1);
      siblingNode.displaceDatasToLeft(siblingNode.countData() - 1);
      parent.insertDataOrdered(siblingKey!);

      // 2.3 Si el hermano no es hoja, transferir también su último hijo
      if (!siblingNode.isLeaf()) {
        // Obtener el último hijo del hermano
        // Nota: countData() + 1 es la posición del último hijo (n+1 hijos para n claves)
        const siblingChild = siblingNode.getChild(siblingNode.countData() + 1);
        const childFirstKey = siblingChild?.getData(0)!.key;

        // Encontrar posición correcta para insertar el hijo en underflowNode
        const insertPosition = underflowNode.findGreaterKeyIndex(childFirstKey!);

        // Insertar el hijo en underflowNode (desplazando si es necesario)
        underflowNode.displaceChildsToRight(insertPosition);
        underflowNode.setChild(insertPosition, siblingChild);

        // El hermano pierde su último hijo (queda vacío en esa posición)
        siblingNode.setChild(siblingNode.countData() + 1, null);
      }
    } else {
      // CASO 3: El hermano esta en la misma posición (si entra aqui es un error)
    }
  }

  /**
   * Fusiona un nodo con underflow con su nodo hermano.
   *
   * Este método se utiliza cuando un nodo tiene menos claves del mínimo permitido (underflow)
   * y su hermano no puede prestarle una clave. La fusión combina ambos nodos en uno solo,
   * bajando una clave del padre como separador.
   *
   * El proceso de fusión sigue estos pasos:
   * 1. Copia todas las claves del hermano al nodo con underflow
   * 2. Baja la clave apropiada del padre al nodo fusionado
   * 3. Transfiere todos los hijos del hermano al nodo fusionado (si no es hoja)
   * 4. Elimina la referencia al hermano del padre y reorganiza los hijos restantes
   *
   * @param parent - Nodo padre que contiene ambos nodos
   * @param underflowNode - Nodo que tiene déficit de claves (conserva su identidad)
   * @param siblingNode - Nodo hermano que se fusionará con underflowNode (desaparecerá)
   */
  private mergeWithSibling(
    parent: BTreeNode<T>,
    underflowNode: BTreeNode<T>,
    siblingNode: BTreeNode<T>
  ) {
    const siblingPosition = parent.getIndexOfChild(siblingNode);
    const underflowPosition = parent.getIndexOfChild(underflowNode);
    // PASO 1: Copiar todas las claves del hermano al nodo con underflow
    for (let i = 0; i < siblingNode.countData(); i++) {
      underflowNode.insertDataOrdered(siblingNode.getData(i)!);
    }

    // PASO 2: Bajar la clave separadora del padre al nodo fusionado
    // La clave a bajar depende de la posición del nodo con underflow
    if (parent.hasChildToAfter(underflowPosition)) {
      // Caso: el hermano está después (existe un hijo después de underflowPosition)
      // La clave en underflowPosition es la que separa ambos nodos
      const parentKey = parent.getData(underflowPosition);
      underflowNode.insertDataOrdered(parentKey!);
      parent.displaceDatasToLeft(underflowPosition);
    } else {
      // si no le restamos 1 a la posicion para tener sus datos
      const parentKey = parent.getData(underflowPosition - 1);
      underflowNode.insertDataOrdered(parentKey!);
      // una vez copiado los datos los borramos del nodoPadre
      parent.displaceDatasToLeft(underflowPosition - 1);
    }
    // vemos si el hermano tiene hijo osea no es hoja
    if (!siblingNode.isLeaf()) {
      // si no es hacemos un for y vamos viendo sus hijos
      for (let i = 0; i <= siblingNode.countData(); i++) {
        // verificamos si el hijo del nodoHermano no esta vacio
        if (siblingNode.getChild(i) !== null) {
          // sacamos su hijo y vemos en donde inserarlo en el underflow
          const childOfSibling = siblingNode.getChild(i);
          const firstDataOfChildOfSibling = childOfSibling?.getData(0);
          const insertPosition = underflowNode.findGreaterKeyIndex(firstDataOfChildOfSibling?.key!);
          if (underflowNode.getChild(insertPosition) === null) {
            underflowNode.setChild(insertPosition, childOfSibling);
          } else {
            underflowNode.displaceChildsToRight(insertPosition);
            underflowNode.setChild(insertPosition, childOfSibling);
          }
        }
      }
    }
    //verificamo si mi hermano es de la anterior posicion o siguiente
    if (siblingPosition < underflowPosition) {
      // en caso de que su hermano sea de la posicion anterior el nodoquefusiona lo movemos donde su hermano y en su antigua posicion ponemos un nodVacio
      parent.setChild(siblingPosition, underflowNode);
      parent.setChild(underflowPosition, null);
    } else {
      // caso contrario el hermano era de la posicion siguiente y vemos si  hay hermaos
      if (parent.hasChildToAfter(siblingPosition)) {
        for (let i = siblingPosition; i < parent.countData() + 1; i++) {
          // no usar el codigo comentado
          // const remainingChild = parent.getChild(i + 1);
          // parent.displaceChildsToRight(i);
          // parent.setChild(i, remainingChild);
          parent.setChild(i, parent.getChild(i + 1));
        }
        parent.setChild(parent.countData() + 1, null);
      } else {
        parent.setChild(siblingPosition, null);
      }
    }
  }

  /**
   * Maneja el underflow (déficit de claves) en un nodo del árbol B
   * Cuando un nodo tiene menos claves del mínimo permitido, intenta:
   * 1. Tomar prestada una clave de un hermano (si tiene una de sobra)
   * 2. Fusionarse con un hermano (si ninguno puede prestar)
   *
   * @param underflow - Nodo que tiene menos claves del mínimo permitido
   * @param ancestors - Pila de ancestros del nodo (el tope es el padre)
   */
  private handleUnderflow(underflow: BTreeNode<T>, ancestors: Stack<BTreeNode<T>>) {
    if (!ancestors.isEmpty()) {
      const parent = ancestors.pop()!;
      /*
       * hay tres casos que note cuando hice las pruebas y fueron:
       * 1) si el hijo que rompe las reglas es el del inicio
       * 2) si el hijo que rompe las reglas es el del medio
       * 3) si el hijo que rompe las reglas es el ultimo que tiene el padre
       */
      const underflowPosition = parent.getIndexOfChild(underflow);
      const hasLeftSibling = parent.hasChildToBefore(underflowPosition);
      const hasRightSibling = parent.hasChildToAfter(underflowPosition);

      // CASO 1: El nodo es el PRIMER hijo (solo puede tener hermano derecho)
      if (!hasLeftSibling && hasRightSibling) {
        // if (underFlowPosition === 0 && hasRightSibling) {
        const rightSiblingPosition = underflowPosition + 1;
        const rightSibling = parent.getChild(rightSiblingPosition)!;

        if (rightSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(parent, underflow, rightSibling);
        } else {
          this.mergeWithSibling(parent, underflow, rightSibling);
          if (parent.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
            this.handleUnderflow(parent, ancestors);
          }
        }
      }
      // CASO 2: El nodo es un hijo INTERMEDIO (tiene hermanos en ambos lados)
      else if (hasLeftSibling && hasRightSibling) {
        const rightSiblingPosition = underflowPosition + 1;
        const rightSibling = parent.getChild(rightSiblingPosition)!;

        if (rightSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(parent, underflow, rightSibling);
        } else {
          const leftSiblingPosition = underflowPosition - 1;
          const leftSibling = parent.getChild(leftSiblingPosition)!;

          if (leftSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
            this.borrowFromSibling(parent, underflow, leftSibling);
          } else {
            this.mergeWithSibling(parent, underflow, rightSibling);
            if (parent.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
              this.handleUnderflow(parent, ancestors);
            }
          }
        }
      }
      // CASO 3: El nodo es el ÚLTIMO hijo (solo puede tener hermano izquierdo)
      else if (hasLeftSibling && !hasRightSibling) {
        const leftSiblingPosition = underflowPosition - 1;
        const leftSibling = parent.getChild(leftSiblingPosition)!;

        if (leftSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(parent, underflow, leftSibling);
        } else {
          this.mergeWithSibling(parent, underflow, leftSibling);
          if (parent.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
            this.handleUnderflow(parent, ancestors);
          }
        }
      }
      // CASO 4: La raíz está vacía
    } else if (this.root!.countData() < 1) {
      const newRoot = this.root!.getChild(this.root!.countData());
      this.root = newRoot;
    } else {
      // CASO 5: La raíz tiene al menos 1 clave, no necesita acción
    }
  }

  override delete(keyToDelete: number) {
    const { child, parents } = this.findNodeAndParents(keyToDelete);
    if (child === null) {
      throw new Error('No existe la clave en el arbol');
    }

    let indexToNode = child.getIndexOfData(keyToDelete);
    if (child.isLeaf()) {
      // eliminar elemento del nodo
      for (let i = indexToNode; i < child.countData() - 1; i++) {
        child.setData(i, child.getData(i + 1));
      }
      child.setData(child.countData() - 1, null);
      if (child.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
        if (parents.isEmpty()) {
          if (child.countData() === 0) {
            this.root = null;
          }
        } else {
          this.handleUnderflow(child, parents);
        }
      }
    } else {
      // siempre vamos agregando los padres al stack al recorrer
      parents.push(child);
      // buscamos el nodo del predecessor InOrder
      let x = child.getChild(indexToNode);
      while (x !== null) {
        parents.push(x);
        x = x.getChild(x.countData())!;
      }
      const predeccesorInOrder = parents.pop()!;
      const dataPredeccesorInOrder = predeccesorInOrder?.getData(
        predeccesorInOrder.countData() - 1
      );
      // predecesor siempre es hoja eliminamos su ultimo elemento y lo reemplazamos en su succesor
      predeccesorInOrder.setData(predeccesorInOrder.countData() - 1, null);
      child.setData(indexToNode, dataPredeccesorInOrder);

      if (predeccesorInOrder.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
        this.handleUnderflow(predeccesorInOrder, parents);
      }
    }
    return this;
  }
}
