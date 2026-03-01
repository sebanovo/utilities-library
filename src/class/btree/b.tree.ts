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
    siblingNode: BTreeNode<T>,
    isRightSibling: boolean
  ): void {
    // CASO 1: El hermano está a la DERECHA (presta su PRIMERA clave)
    const underflowPosition = parent.getIndexOfChild(underflowNode);
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
            const remainingChild = siblingNode.getChild(i + 1);
            underflowNode.displaceChildsToRight(i);
            underflowNode.setChild(i, remainingChild);
          }
          // El último espacio del hermano queda vacío
          siblingNode.setChild(siblingNode.countData() + 1, null);
        }
      }
    }
    // CASO 2: El hermano está a la IZQUIERDA (presta su ÚLTIMA clave)
    else {
      // 2.1 Bajar la clave del padre al nodo con underflow
      const parentKey = parent.getData(underflowPosition);
      parent.displaceDatasToLeft(underflowPosition);
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
    }
  }

  /**
   * Se fusiona con su hermano
   */
  private mergeWithSibling(
    parent: BTreeNode<T>,
    underflowNode: BTreeNode<T>,
    siblingNode: BTreeNode<T>
  ) {
    const siblingPosition = parent.getIndexOfChild(siblingNode);
    const underflowPosition = parent.getIndexOfChild(underflowNode);
    // hacemos un for para copiar los datos del hermano al nodoQueDebeFusionarse
    for (let i = 0; i < siblingNode.countData(); i++) {
      const claveDelHermano = siblingNode.getData(i);
      underflowNode.insertDataOrdered(claveDelHermano!);
    }
    /*
     * ahora verificamos si hay clave en la posicionDeNodoQueDebeFusionarse
     * y copiamos los datos del padre
     */
    if (parent.getData(underflowPosition) !== null) {
      const claveDelPadre = parent.getData(underflowPosition);
      underflowNode.insertDataOrdered(claveDelPadre!);
      // una vez copiado los datos los borramos del nodoPadre
      parent.displaceDatasToLeft(underflowPosition);
    } else {
      // si no le restamos 1 a la posicion para tener sus datos
      const claveDelPadre = parent.getData(underflowPosition - 1);
      underflowNode.insertDataOrdered(claveDelPadre!);
      // una vez copiado los datos los borramos del nodoPadre
      parent.displaceDatasToLeft(underflowPosition - 1);
    }
    // vemos si el nodoHermano no es una hoja
    if (!siblingNode.isLeaf()) {
      // si no es hacemos un for y vamos viendo sus hijos
      for (let i = 0; i <= siblingNode.countData(); i++) {
        // verificamos si el hijo del nodoHermano no esta vacio
        if (siblingNode.getChild(i) !== null) {
          /*
           * sacamos su hijo y vemos en donde inserarlo en el
           * nodoQueDebeFusionarse
           */
          const hijoDelNodoHermano = siblingNode.getChild(i);
          const claveDelHijoDelNodoHermano = hijoDelNodoHermano?.getData(0);
          const posicionAInsertarNuevoHijo = underflowNode.findGreaterKeyIndex(
            claveDelHijoDelNodoHermano?.key!
          );
          if (underflowNode.getChild(posicionAInsertarNuevoHijo) === null) {
            underflowNode.setChild(posicionAInsertarNuevoHijo, hijoDelNodoHermano);
          } else {
            underflowNode.displaceChildsToRight(posicionAInsertarNuevoHijo);
            underflowNode.setChild(posicionAInsertarNuevoHijo, hijoDelNodoHermano);
          }
        }
      }
    }
    //verificamo si mi hermano es de la anterior posicion o siguiente */
    if (siblingPosition < underflowPosition) {
      /*
       * en caso de que su hermano sea de la posicion anterior el nodoquefusiona
       * lo movemos donde su hermano y en su antigua posicion ponemos un nodVacio
       */
      parent.setChild(siblingPosition, underflowNode);
      parent.setChild(underflowPosition, null);
    } else {
      /*
       * caso contrario el hermano era de la posicion siguiente y vemos si
       * hay hermaos
       */
      if (parent.hasChildToAfter(siblingPosition)) {
        // en esta parte no usar displaceChildsToLeft ni displaceChildsToRight (antipatron)
        for (let i = siblingPosition; i < parent.countData() + 1; i++) {
          const hijosMasAdelante = parent.getChild(i + 1);
          parent.setChild(i, hijosMasAdelante);
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
      const underFlowPosition = parent.getIndexOfChild(underflow);
      /*
       * hay tres casos que note cuando hice las pruebas y fueron:
       * 1) si el hijo que rompe las reglas es el del inicio
       * 2) si el hijo que rompe las reglas es el del medio
       * 3) si el hijo que rompe las reglas es el ultimo que tiene el padre
       */
      const hasRightSibling = parent.hasChildToAfter(underFlowPosition);
      const hasLeftSibling = parent.getChild(underFlowPosition - 1) !== null;

      // CASO 1: El nodo es el PRIMER hijo (solo puede tener hermano derecho)
      if (hasRightSibling && underFlowPosition === 0) {
        const rightSiblingPosition = underFlowPosition + 1;
        const rightSibling = parent.getChild(rightSiblingPosition)!;

        if (rightSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(
            parent,
            underflow,
            rightSibling,
            true // hermano derecho
          );
        } else {
          this.mergeWithSibling(parent, underflow, rightSibling);
          if (parent.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
            this.handleUnderflow(parent, ancestors);
          }
        }
      }
      // CASO 2: El nodo es un hijo INTERMEDIO (tiene hermanos en ambos lados)
      else if (hasRightSibling && hasLeftSibling) {
        const rightSiblingPosition = underFlowPosition + 1;
        const rightSibling = parent.getChild(rightSiblingPosition)!;

        if (rightSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(
            parent,
            underflow,
            rightSibling,
            true // hermano derecho
          );
        } else {
          const leftSiblingPosition = underFlowPosition - 1;
          const leftSibling = parent.getChild(leftSiblingPosition)!;

          if (leftSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
            this.borrowFromSibling(
              parent,
              underflow,
              leftSibling,
              false // hermano izquierdo
            );
          } else {
            this.mergeWithSibling(parent, underflow, rightSibling);
            if (parent.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
              this.handleUnderflow(parent, ancestors);
            }
          }
        }
      }
      // CASO 3: El nodo es el ÚLTIMO hijo (solo puede tener hermano izquierdo)
      else if (!hasRightSibling && hasLeftSibling) {
        const leftSiblingPosition = underFlowPosition - 1;
        const leftSibling = parent.getChild(leftSiblingPosition)!;

        if (leftSibling.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          this.borrowFromSibling(
            parent,
            underflow,
            leftSibling,
            false // hermano izquierdo
          );
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
    }
    // CASO 5: La raíz tiene al menos 1 clave, no necesita acción
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
