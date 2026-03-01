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

  private separarNodo(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>): void {
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
      return;
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

      // Insertar hijo derecho
      const rightFirstKey = rightNode.getData(0)!.key;
      let rightInsertPos = temporalParentNode.findGreaterKeyIndex(rightFirstKey);

      // Desplazar hijos a la derecha y luego insertar
      for (let i = temporalParentNode.countData() - 1; i >= rightInsertPos; i--) {
        temporalParentNode.setChild(i + 1, temporalParentNode.getChild(i));
      }
      temporalParentNode.setChild(rightInsertPos, rightNode);

      if (temporalParentNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
        this.separarNodo(temporalParentNode, stack);
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
      const index = x.indexOf(data.key);
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
          this.separarNodo(temporalNode, stack);
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
      const index = node.indexOf(data.key);
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
          this.separarNodo(temporalNode, stack);
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
      if (x.indexOf(key) !== -1) {
        return { child: x, parents };
      } else {
        return { child: null, parents };
      }
    }
    while (x !== null) {
      const index = x.indexOf(key);
      if (index !== -1) {
        return { child: x, parents };
      }
      parents.push(x);
      x = x.getChild(x.findGreaterKeyIndex(key));
    }
    return { child: x, parents };
  }

  private buscarPosicionDelHijo(nodoPadre: BTreeNode<T>, nodoHijo: BTreeNode<T>) {
    for (let i = 0; i < nodoPadre.countData(); i++) {
      const hijoDelPadre = nodoPadre.getChild(i);
      if (hijoDelPadre?.countData() == nodoHijo.countData()) {
        return i;
      }
    }
    return nodoPadre.countData();
  }

  private insertarHijoOrdenado(
    nodoActual: BTreeNode<T>,
    posicionAInsertar: number,
    nodoAInsertar: BTreeNode<T>
  ) {
    /*
     * hacemos un for desde el nro de claves no vacias del nodoActual hasta que
     * deje de ser mayor a la posicionAInsertar
     */
    for (let i = nodoActual.countData(); i > posicionAInsertar; i--) {
      /* guardamos en una variable el hijo de la posicion i-1 */
      const hijoDelNodoActual = nodoActual.getChild(i - 1);
      if (hijoDelNodoActual !== null) {
        const claveDelHijoDelNodoActual = hijoDelNodoActual.getData(
          hijoDelNodoActual.countData() - 1
        );
        const posicionParaInsertar = nodoActual.findGreaterKeyIndex(
          claveDelHijoDelNodoActual?.key!
        );
        nodoActual.setChild(posicionParaInsertar, hijoDelNodoActual);
      }
    } // fin del for
    /*
     * una vez terminado el for podemos insertar el nodo en la posicion especifica
     */
    nodoActual.setChild(posicionAInsertar, nodoAInsertar);
  }
  // este metodo elimina una clave y por consecuencia su valor
  private eliminarClaveDeNodoDePosicion(nodoActual: BTreeNode<T>, posicionDelDato: number) {
    // borrarmos la clave y el valor que estaban en esa posicion
    nodoActual.setData(posicionDelDato, null);
    // enonces partimos de la posicion del datos que borramos hasta las claves
    // no vacia que tenga el nodo
    for (let i = posicionDelDato; i < nodoActual.countData(); i++) {
      // verificamos que la clave de la posicion i es vacio para cambiar
      if (nodoActual.getData(i) === null) {
        const claveDeLaSiguientePosicion = nodoActual.getData(i + 1);
        // movemos el vacio a la siguiente posicion
        nodoActual.setData(i, claveDeLaSiguientePosicion);
        nodoActual.setData(i + 1, null);
      }
    }
  }

  private prestar(
    nodoPadre: BTreeNode<T>,
    nodoQueDebePrestarse: BTreeNode<T>,
    nodoQuePresta: BTreeNode<T>,
    posicionDeNodoQueDebePrestarse: number,
    posicionDeNodoQuePresta: number,
    prestarse: boolean
  ) {
    /* vemos si tiene que prestarse del hermano de adelante o de hermano de atras */
    if (prestarse) {
      /*
       * en claso que fuera el hermano de adelante sacamos el primer dato del
       * hermano y lo borramos del nodoHermano y lo insertamos al padre
       */
      const dataDelPadre = nodoPadre.getData(posicionDeNodoQueDebePrestarse);
      this.eliminarClaveDeNodoDePosicion(nodoPadre, posicionDeNodoQueDebePrestarse);
      nodoQueDebePrestarse.insertDataOrdered(dataDelPadre!);

      const dataDelNodoQuePresta = nodoQuePresta.getData(0)!;
      this.eliminarClaveDeNodoDePosicion(nodoQuePresta, 0);
      /* luego lo insertamos en el nodoQueDebePrestarse */
      nodoPadre.insertDataOrdered(dataDelNodoQuePresta);
      /*
       * sacamos el dato del padre en la posicion del nodoQueDebePresta
       * lo borramos y lo insertamos en el nodoQueDebePrestarse
       */

      /*
       * en el caso que no fuera una hoja el nodo que presta este le da tambien
       * su hijo al que presta
       */
      if (!nodoQuePresta.isLeaf()) {
        // obtenemos el hijo que sera el de la posicion 0
        const hijoDelNodoQuePresta = nodoQuePresta.getChild(0);
        // obtenemos su clave del hijo
        const claveDelHijoDelNodoQuePresta = hijoDelNodoQuePresta?.getData(0)!;
        /* y vemos en que posicion lo va a insertar ese nuevo hijo */
        const posicionAInsertar = nodoQueDebePrestarse.findGreaterKeyIndex(
          claveDelHijoDelNodoQuePresta.key
        );
        // llamamos aun metodo que inserta ordenado un hijo que le demos
        // desde una posicion
        this.insertarHijoOrdenado(nodoQueDebePrestarse, posicionAInsertar, hijoDelNodoQuePresta!);
        // mientras en el nodo que presto su clave debe mover sus hijos
        // a sus nuevas posiciones
        if (super.hasChildToAfter(nodoQuePresta, 0)) {
          // este if opcional
          // hacemos un ciclo para ir moviendo a los hijos
          for (let i = 0; i < nodoQuePresta.countData() + 1; i++) {
            const hijosMasAdelante = nodoQuePresta.getChild(i + 1);
            this.insertarHijoOrdenado(nodoQuePresta, i, hijosMasAdelante!);
          }
          // al final el ultimo hijo lo ponemos vacio ya que fue copiado una posicion -
          nodoQuePresta.setChild(nodoQuePresta.countData() + 1, null);
          // nodoQuePresta.setChild(nodoQuePresta.countData(), null); // puede ser este o no (investigar)
        }
      }
    } else {
      /*
       * en claso que no fuera el hermano de adelante sacamos el ultimo dato del
       * hermano y lo borramos del nodoHermano y lo insertamos al padre
       */
      // /*
      //  * sacamos el dato del padre en la posicion del nodoQueDebePrestarse
      //  * lo borramos y lo insertamos en el nodoQueDebePrestarse
      //  */
      const claveDelPadre = nodoPadre.getData(posicionDeNodoQueDebePrestarse);
      this.eliminarClaveDeNodoDePosicion(nodoPadre, posicionDeNodoQueDebePrestarse);
      nodoQueDebePrestarse.insertDataOrdered(claveDelPadre!);

      const claveDelNodoQuePresta = nodoQuePresta.getData(nodoQuePresta.countData() - 1);
      this.eliminarClaveDeNodoDePosicion(nodoQuePresta, nodoQuePresta.countData() - 1);
      nodoPadre.insertDataOrdered(claveDelNodoQuePresta!);
      /*
       * en el caso que no fuera una hoja el nodo que presta este le da tambien
       * su hijo al que presta
       */
      if (!nodoQuePresta.isLeaf()) {
        // en el caso del hermano de atras seria su ultimo hijo
        const hijoDelNodoQuePresta = nodoQuePresta.getChild(nodoQuePresta.countData() + 1);
        // aqui obtenemos su clave pued ser la ultima como la primera
        // van a obtener la misma posicion
        const claveDelHijoDelNodoQuePresta = hijoDelNodoQuePresta?.getData(0);
        // obtenermos la posicion donde seran movidos
        const posicionAInsertar = nodoQueDebePrestarse.findGreaterKeyIndex(
          claveDelHijoDelNodoQuePresta?.key!
        );
        // llamamos aun metodo que inserta ordenado aun hijo desde una posicion
        this.insertarHijoOrdenado(nodoQueDebePrestarse, posicionAInsertar, hijoDelNodoQuePresta!);
        // y al ser ultimo hijo solo ponemos vacio en esa posicion en el
        // nodoQuePresta
        nodoQuePresta.setChild(nodoQuePresta.countData() + 1, null);
      }
    }
  }

  private fusionarse(
    nodoPadre: BTreeNode<T>,
    nodoQueDebeFusionarse: BTreeNode<T>,
    posicionDeNodoQueDebeFusionarse: number,
    posicionDeNodoHermano: number,
    nodoHermano: BTreeNode<T>
  ) {
    /* hacemos un for para copiar los datos del hermano al nodoQueDebeFusionarse */
    for (let i = 0; i < nodoHermano.countData(); i++) {
      const claveDelHermano = nodoHermano.getData(i);
      nodoQueDebeFusionarse.insertDataOrdered(claveDelHermano!);
    }
    /*
     * ahora verificamos si hay clave en la posicionDeNodoQueDebeFusionarse
     * y copiamos los datos del padre
     */
    if (nodoPadre.getData(posicionDeNodoQueDebeFusionarse) !== null) {
      const claveDelPadre = nodoPadre.getData(posicionDeNodoQueDebeFusionarse);
      nodoQueDebeFusionarse.insertDataOrdered(claveDelPadre!);
      /* una vez copiado los datos los borramos del nodoPadre */
      this.eliminarClaveDeNodoDePosicion(nodoPadre, posicionDeNodoQueDebeFusionarse);
    } else {
      /* si no le restamos 1 a la posicion para tener sus datos */
      const claveDelPadre = nodoPadre.getData(posicionDeNodoQueDebeFusionarse - 1);
      nodoQueDebeFusionarse.insertDataOrdered(claveDelPadre!);
      /* una vez copiado los datos los borramos del nodoPadre */
      this.eliminarClaveDeNodoDePosicion(nodoPadre, posicionDeNodoQueDebeFusionarse - 1);
    }
    /* vemos si el nodoHermano no es una hoja */
    if (!nodoHermano.isLeaf()) {
      /* si no es hacemos un for y vamos viendo sus hijos */
      for (let i = 0; i <= nodoHermano.countData(); i++) {
        /* verificamos si el hijo del nodoHermano no esta vacio */
        if (nodoHermano.getChild(i) !== null) {
          /*
           * sacamos su hijo y vemos en donde inserarlo en el
           * nodoQueDebeFusionarse
           */
          const hijoDelNodoHermano = nodoHermano.getChild(i);
          const claveDelHijoDelNodoHermano = hijoDelNodoHermano?.getData(0);
          const posicionAInsertarNuevoHijo = nodoQueDebeFusionarse.findGreaterKeyIndex(
            claveDelHijoDelNodoHermano?.key!
          );
          if (nodoQueDebeFusionarse.getChild(posicionAInsertarNuevoHijo) === null) {
            nodoQueDebeFusionarse.setChild(posicionAInsertarNuevoHijo, hijoDelNodoHermano);
          } else {
            this.insertarHijoOrdenado(
              nodoQueDebeFusionarse,
              posicionAInsertarNuevoHijo,
              hijoDelNodoHermano!
            );
          }
        }
      }
    }
    /* verificamo si mi hermano es de la anterior posicion o siguiente */
    if (posicionDeNodoHermano < posicionDeNodoQueDebeFusionarse) {
      /*
       * en caso de que su hermano sea de la posicion anterior el nodoquefusiona
       * lo movemos donde su hermano y en su antigua posicion ponemos un nodVacio
       */
      nodoPadre.setChild(posicionDeNodoHermano, nodoQueDebeFusionarse);
      nodoPadre.setChild(posicionDeNodoQueDebeFusionarse, null);
    } else {
      /*
       * caso contrario el hermano era de la posicion siguiente y vemos si
       * hay hermaos
       */
      if (super.hasChildToAfter(nodoPadre, posicionDeNodoHermano)) {
        for (let i = posicionDeNodoHermano; i < nodoPadre.countData() + 1; i++) {
          const hijosMasAdelante = nodoPadre.getChild(i + 1);
          this.insertarHijoOrdenado(nodoPadre, i, hijosMasAdelante!);
        }
        nodoPadre.setChild(nodoPadre.countData() + 1, null);
      } else {
        nodoPadre.setChild(posicionDeNodoHermano, null);
      }
    }
  }

  private prestarOFusionar(
    nodoDeLaClaveAEliminar: BTreeNode<T>,
    pilaDeAncestros: Stack<BTreeNode<T>>
  ) {
    if (!pilaDeAncestros.isEmpty()) {
      const nodoPadre = pilaDeAncestros.pop()!;
      const posicionDelNodoDeLaClaveAEliminar = this.buscarPosicionDelHijo(
        nodoPadre,
        nodoDeLaClaveAEliminar
      );
      /*
       * hay tres casos que note cuando hice las pruebas y fueron:
       * 1) si el hijo que rompe las reglas es el del inicio
       * 2) si el hijo que rompe las reglas es el del medio
       * 3) si el hijo que rompe las reglas es el ultimo que tiene el padre
       */
      // verificamos si es el primer caso
      if (
        super.hasChildToAfter(nodoPadre, posicionDelNodoDeLaClaveAEliminar) &&
        posicionDelNodoDeLaClaveAEliminar === 0
      ) {
        // calculamos la posicion de su hermano y lo obtenemos en una variable
        let posicionDelHijoQuePrestar = posicionDelNodoDeLaClaveAEliminar + 1;
        const nodoQuePresta = nodoPadre.getChild(posicionDelHijoQuePrestar);
        // verificamos si le quitamos una clave no rompe las reglas del nro de
        // claves
        if (nodoQuePresta!.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          /* llamamos a prestar */
          const HermanoQuePresta = true;
          this.prestar(
            nodoPadre,
            nodoDeLaClaveAEliminar,
            nodoQuePresta!,
            posicionDelNodoDeLaClaveAEliminar,
            posicionDelHijoQuePrestar,
            HermanoQuePresta
          );
        } else {
          /* llamamos a fusion */
          this.fusionarse(
            nodoPadre,
            nodoDeLaClaveAEliminar,
            posicionDelNodoDeLaClaveAEliminar,
            posicionDelHijoQuePrestar,
            nodoQuePresta!
          );
          // despues de la fusion preguntamos al padre si rompio las reglas
          if (nodoPadre.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
            // volvemos a llamar al metodo
            this.prestarOFusionar(nodoPadre, pilaDeAncestros);
          }
        }
        /* si no fue el primer caso verificamos si es el segundo caso */
      } else if (
        super.hasChildToAfter(nodoPadre, posicionDelNodoDeLaClaveAEliminar) &&
        nodoPadre.getChild(posicionDelNodoDeLaClaveAEliminar - 1) !== null
      ) {
        /*
         * calculamos la posicion de su hermano de adelante y lo
         * obtenemos en una variable
         */
        let posicionDelHermanoDeAdelante = posicionDelNodoDeLaClaveAEliminar + 1;
        const hermanoDeAdealante = nodoPadre.getChild(posicionDelHermanoDeAdelante);
        // verificamos si le quitamos una clave no rompe las reglas del nro de
        // claves
        if (hermanoDeAdealante!.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          /* llamamos a prestar */
          const HermanoQuePresta = true;
          this.prestar(
            nodoPadre,
            nodoDeLaClaveAEliminar,
            hermanoDeAdealante!,
            posicionDelNodoDeLaClaveAEliminar,
            posicionDelHermanoDeAdelante,
            HermanoQuePresta
          );
        } else {
          /* hcemos las mismas operaciones pero ahora con el hermano de atras */
          const posicionDelHermanoDeAtras = posicionDelNodoDeLaClaveAEliminar - 1;
          const hermanoDeAtras = nodoPadre.getChild(posicionDelHermanoDeAtras);
          if (hermanoDeAtras!.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
            /* llamamos a prestar */
            const HermanoQuePresta = false;
            this.prestar(
              nodoPadre,
              nodoDeLaClaveAEliminar,
              hermanoDeAtras!,
              posicionDelNodoDeLaClaveAEliminar,
              posicionDelHermanoDeAtras,
              HermanoQuePresta
            );
          } else {
            /*
             * caso que no se pudo prestar de ninguno llamamos a fusion y lo hace
             * con el hermano de adelante
             */
            this.fusionarse(
              nodoPadre,
              nodoDeLaClaveAEliminar,
              posicionDelNodoDeLaClaveAEliminar,
              posicionDelHermanoDeAdelante,
              hermanoDeAdealante!
            );
            // verificamos si el padre no rompe la regla del nro de claves
            if (nodoPadre.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
              // volvems a llamar al metodo
              this.prestarOFusionar(nodoPadre, pilaDeAncestros);
            }
          }
        }
        /* si no fue ni el primer caso ni el segundo caso entonces es el ultimo */
      } else if (
        !super.hasChildToAfter(nodoPadre, posicionDelNodoDeLaClaveAEliminar) &&
        nodoPadre.getChild(posicionDelNodoDeLaClaveAEliminar - 1) !== null
      ) {
        /*
         * calculamos la posicion de su hermano de atras y lo obtenemos
         * en una variable
         */
        const posicionDelHijoQuePrestar = posicionDelNodoDeLaClaveAEliminar - 1;
        const nodoQuePresta = nodoPadre.getChild(posicionDelHijoQuePrestar);
        // verificamos si le quitamos una clave no rompe las reglas del nro de
        // claves
        if (nodoQuePresta!.countData() - 1 >= this.MINIMUM_NUMBER_OF_KEYS) {
          /* llamamos a prestar */
          const HermanoQuePresta = false;
          this.prestar(
            nodoPadre,
            nodoDeLaClaveAEliminar,
            nodoQuePresta!,
            posicionDelNodoDeLaClaveAEliminar,
            posicionDelHijoQuePrestar,
            HermanoQuePresta
          );
        } else {
          /* llamamos a fusion */
          this.fusionarse(
            nodoPadre,
            nodoDeLaClaveAEliminar,
            posicionDelNodoDeLaClaveAEliminar,
            posicionDelHijoQuePrestar,
            nodoQuePresta!
          );
          /*
           * verificamos si el padre despues de la fusion no rompe la regla
           * del nromindeclaves
           */
          if (nodoPadre.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
            /* en caso si llama al metodo prestarOFusionar */
            this.prestarOFusionar(nodoPadre, pilaDeAncestros);
          }
        }
      }
      /*
       * en el caso que la pila este vacia significa que llegamos a la raiz
       * pero verificamos si la raiz tiene 0 claves
       */
    } else if (this.root!.countData() < 1) {
      const nuevaRaiz = this.root!.getChild(this.root!.countData());
      this.root = nuevaRaiz;
    }
  }

  override delete(keyToDelete: number) {
    const { child, parents } = this.findNodeAndParents(keyToDelete);
    if (child === null) {
      throw new Error('No existe la clave en el arbol');
    }

    let indexToNode = child.indexOf(keyToDelete);
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
          this.prestarOFusionar(child, parents);
        }
      }
    } else {
      parents.push(child);
      // obtenemos el nodo del predecessor InOrder
      let x = child.getChild(indexToNode);
      // iteramos hasta que el x sea nodo vacio
      while (x !== null) {
        parents.push(x);
        x = x.getChild(x.countData())!;
      }
      const NodeOfPredeccesorInorder = parents.pop()!;
      const dataPredeccesor = NodeOfPredeccesorInorder?.getData(
        NodeOfPredeccesorInorder.countData() - 1
      );
      // el predecessor es nodo hoja
      // eliminar elemento del nodo
      NodeOfPredeccesorInorder.setData(NodeOfPredeccesorInorder.countData() - 1, null);
      child.setData(indexToNode, dataPredeccesor);

      if (NodeOfPredeccesorInorder.countData() < this.MINIMUM_NUMBER_OF_KEYS) {
        this.prestarOFusionar(NodeOfPredeccesorInorder, parents);
      }
    }
    return this;
  }
}
