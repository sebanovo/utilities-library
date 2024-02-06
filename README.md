# Libreria de Utilidades

Visita la documentación : <https://sebastianinf.github.io/utilities-library/>

## Clase Matriz

### Metodos de la Clase Matriz

- Cargar
- Descargar
- Maximo
- Frecuencia
- Cargar serie aritmetica
- Cargar serie geometrica
- Suma
- Resta
- Multiplicacion
- Multiplicacion por un escalar
- Transposicion
- Busqueda secuencial
- Pertenencia
- Verificar todos aprobados
- Verificar todos iguales
- Verificar ordenado
- Verificar ordenado por razon
- Sumar filas
- Sumar columnas
- Ordenar filas
- Ordenar columnas
- Encontrar mayor frecuencia filas
- Ordenar matriz por intercambio
- Segmentar par y no par
- Intercalar par y no par
- Intercambiar filas por el menor
- Ordenar triangular inferior derecha
- Ordenar triangular inferior izquierda
- Encontrar mayor de la triangular inferior derecha
- Segmentar par y no par triangular inferior derecha
- Segmentar par y no par triangular inferior izquierda
- Transposicion
- Rrdenar columnas triangular inferior izquierda
- Encontrar elemento de mayor frecuencia y su frecuencia
- Ordenar cuadrado interior
- Segmentar par y no par cuadrado interior
- Ordenar rangos
- Segmentar rangos par y no par
- Ordenar filas por numero de elementos diferentes
- Ordenar columnas por numero de primos
- Ordenar filas por numero de primos

## Ejemplo 1

```JavaScript
// Crear una instancia de Matriz
const m1 = new Matriz()
m1.cargar(4,4,1,9)

// Ordenar:
m1.ordenar()

// Segmentar: 
n1 = new Integer()
m1.segmentar(n1.verificarPar) //<-- funcion integer 

// Intercalar: 
m1.intercalar(n1.verificarPrimo) // <-- funcion integer
```

## Clase Vector

### Metodos de la Clase Vector

- Cargar elemento x elemento
- Cargar
- Descargar
- Cargar serie aritmética
- Cargar serie Fibonacci
- Seleccionar por posición
- Seleccionar primos
- Seleccionar no primos
- Seleccionar buenos
- Promedio
- Máximo
- Frecuencia
- Desviación media
- Desviación estándar
- Búsqueda binaria
- Búsqueda secuencial
- Ordenamiento ascendente
- Ordenamiento descendente
- Unión de conjuntos
- Intersección de conjuntos
- Diferencia de conjuntos A-B
- Diferencia de conjuntos B-A
- Invertir
- Contar elementos de las posiciones submúltiplos
- Buscar elemento mayor de las posiciones múltiplos
- Buscar la media de las posiciones múltiplos
- Verificar si todos los elementos son iguales
- Verificar si el segmento está ordenado
- Insertar vector2 en 1 respecto a una posición
- Eliminar elementos de un segmento
- Duplicar elementos
- Ordenar elementos de un segmento
- Encontrar elemento menos repetido de un segmento
- Encontrar la frecuencia de distribución de un segmento
- Intercalar primos y no primos
- Segmentar par y no par
- Segmentar primos y no primos
- Segmentar capicuas y no capicuas
- Intercalar par y no par
- Intercalar primo y no primo

## Ejemplo 2

```javascript
// Crear una instancia de Vector
const v1 = new Vector();

v1.cargar(10,1,9)

// frecuencia
const frecuencia = v1.frecuencia(7)
console.log(frecuencia) 

const miVector = new Vector();
v1.cargarElementoXElemento(5);
v1.cargarElementoXElemento(8);
v1.cargarElementoXElemento(5);
console.log(v1.retornarVector()); // Resultado: [5, 8]

// Interseccion de conjuntos
const vector1 = new Vector([1, 2, 3, 4]);
const vector2 = new Vector([3, 4, 5, 6]);
const resultado = new Vector();
resultado.interseccionDeConjuntos(vector1, vector2);
console.log(resultado.retornarVector()); // Resultado: [3, 4]
```

## Metodos de la Clase Integer

- Cargar
- Descargar
- Invertir
- Retornar longitud
- Veriricar par
- Verificar primo
- Verificar fibonacci
- Verificar capicua
- Verificar cuadrado perfecto
- Veriricar fibonacci

## Ejemplo 3

```javascript
// Instancia de la clase Integer
const n1 = new Integer()
n1.cargar(4)

// verificar par
const isPar = n1.verificarPar()
console.log(isPar)
```

## Contribuciones

Si deseas contribuir a esta librería, por favor eres libre de mandarme una pull request, yo la revisare y la incorporare a la libreria si veo que aporta valor.

## Licencia

Esta librería está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
