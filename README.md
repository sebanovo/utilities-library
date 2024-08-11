# Libreria de Utilidades

Visita el repositorio : <https://github.com/sebanovo/utilities-library>

Visita la documentación:
<https://utilities-library.vercel.app>

## Instalación : 

```shell
npm i utilities-library
```

## Clase Tensor

### Metodos de la Clase Tensor

- Cargar
- Cargar serie aritmetica
- Cargar serie geometrica
- Pertenencia
- Verificar mayor
- Verificar menor
- Verificar todos iguales
- Verificar ordenado
- Suma
- Resta
- Multiplicación por un ecalar
- Transposición
- Intercambiar
- Devolver mayor
- Devolver menor
- Ordenar
- Segmentar
- Intercalar
- Verificar ordenado
- Verificar ordenado razón
- Verificar todos únicos
- Buscar posicion
- Frecuencia

## Ejemplo 1

```JavaScript
// Crear una instancia de Tensor
const t1 = new Tensor()
t1.cargar(3,3,3,1,9)

// Ordenar:
t1.ordenar()

// Segmentar: 
t1.segmentar("esPar") //<-- funcion Numero 

// Intercalar: 
t1.intercalar("esPar") // <-- funcion Numero 
```

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
- Multiplicación
- Multiplicación por un escalar
- Transposición
- determinante
- Busqueda secuencial
- Pertenencia
- Verificar todos aprobados
- Verificar todos iguales
- Verificar todos diferentes
- Verificar ordenado
- Verificar ordenado por razon
- Suma de matrices
- Resta de matrices 
- Multiplicación de matrices
- Multiplicación por escalar
- Transposicion
- Intercambiar 
- Devolver mayor
- Devolver menor
- Busqueda secuencial
- Busqueda binaria (pending)
- Frecuencia
- Ordenar
- Intercalar
- Sumar filas
- Sumar columnas
- Ordenar filas
- Ordenar columnas
- Encontrar mayor frecuencia filas
- Ordenar matriz por intercambio
- Segmentar
- Intercalar
- Suma, multiplicación /fila
- Suma, multiplicación /columna
- Contar : par, primo, capicua, fibonacci, frecuencia ,mayor frecuencia, menor frecuencia, unicos /fila
- Contar : par, primo, capicua, fibonacci, frecuencia ,mayor frecuencia, menor frecuencia, unicos /columna
- Añadir fila
- Añadir columa
- Intercambiar filas 
- Intercambiar columnas
- Ordenar digonal principal
- Ordenar diagonal secundaria
- Ordenar triangular superior derecha (pending)
- Ordenar triangular superior izquierda (pending)
- Ordenar triangular inferior izquierda (pending)
- Ordenar triangular inferior izquierda (pending)
- Segmentar triangular superior derecha
- Segmentar triangular superior izquierda
- Segmentar triangular inferior derecha
- Segmentar triangular inferir izquierda
- Intercalar triangular superior derecha
- Intercalar triangular superior izquierda
- Intercalar triangular inferior derecha
- Intercalar triangular inferir izquierda
- Encontrar elemento de mayor frecuencia y su frecuencia
- Ordenar columnas triangular inferior izquierda (pending)
- Ordenar cuadrado interior (pending)
- Segmentar cuadrado interior (pending)
- Ordenar rangos (pending)
- Segmentar rangos par y no par (pending)

#### Recursividad 
- Cargar L'
- Cargar diagonal
- Cargar Cuadrado Magico
- Cargar Caracol
- Cargar Diagonales Pricipales (pending)
- Cargar Diagonales Secundarias 
- Cargar Diagonales Secundarias Up - Bottom - Up 
- Cargar Diagonales Principales Triangular Inferior Izquierda 
- Cargar Vibora por filas
- Cargar Vibora por columnas 
  
## Ejemplo 2

```JavaScript
// Crear una instancia de Matriz
const m1 = new Matriz()
m1.cargar(4,4,1,9)

// Ordenar:
m1.ordenar()

// Segmentar: 
m1.segmentar("esPar") //<-- funcion Numero 

// Intercalar: 
m1.intercalar("esPar") // <-- funcion Numero 
```

## Clase Vector

### Metodos de la Clase Vector

- Cargar elemento x elemento
- Cargar
- Descargar
- Cargar serie aritmética
- Cargar serie Fibonacci
- Seleccionar por posición
- Seleccionar 
- Promedio
- Máximo
- Frecuencia
- Desviación media
- Desviación estándar
- Búsqueda binaria
- Búsqueda secuencial
- Bogo Sort
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Shell Sort 
- Counting Sort 
- Unión de conjuntos
- Intersección de conjuntos
- Diferencia de conjuntos A-B
- Diferencia de conjuntos B-A
- Invertir
- Contar número de las posiciones submúltiplos
- Buscar número mayor de las posiciones múltiplos
- Buscar la media de las posiciones múltiplos
- Verificar elementos iguales 
- Verificar ordenado 
- Insertar vector2 en 1 respecto a una posición
- Pop
- Eliminar segmento 
- Duplicar elemento 
- Encontrar elemento menos repetido de un segmento
- Encontrar la frecuencia de distribución de un segmento
- Segmentar
- Intercalar
- Contar números que cumples con la condicion (par | primo | capicua | fibonacci) (pending)
- Eliminar número
- Cargar Serie v[1,21,321,4321,54321] ✔️
- Cargar Digitos x = 12345 , v[1,2,3,4,5] ✔️


## Ejemplo 3

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

## Metodos de la Clase Numero 

- Cargar
- Descargar
- Invertir
- Length
- Ordenar
- Es par
- Es primo
- Es fibonacci
- Es capicua
- Es cuadrado perfecto
- Es fibonacci
- Cuenta regresiva
- Factorial
- Repetir digitos 
- Eliminar digitos (par, primo, fibonacci, etc..)
- Encontrar mayor y menor digito
- Convertir decimal a base N 
- Convertir base N a decimal
// pending
- Insertar digito por posición
- Remplazar digito por posición

## Ejemplo 4

```javascript
// Instancia de la clase Numero 
const n1 = new Numero()
n1.cargar(4)

// verificar par
const isPar = n1.esPar()
console.log(isPar) // <-- true o false
```

## Metodos de la Clase Cadena 

- Cargar
- Descargar
- Es vocal (static) 
- Es letra (static)
- Es espacio (static)
- Es digito (static)
- Es palindromo
- Contar caracter
- Contar Vocales 
- Contar Letras
- Invertir
- Eliminar caracter
- Eliminar vocales
- Eliminar letras 
- Eliminar números
- Primer palabra
- Posicion primer palabra
- Eliminar primer palabra
- Eliminar Hasta primer palabra
- Contar palabras
- Palabra mas larga
- Palabra menos larga
- Eliminar
- Insertar
- Remplazar 
- Eliminar primer letra de cada palabra
- Eliminar última letra de cada palabra
- Eliminar primera y última letra de cada palabra
- Invertir cada palabra 
- Invertir frase 

## Ejemplo 5
```javascript
const c1 = new Cadena() 
c1.cargar("Hola mundo")
const contador = contarVocales()

console.log(contador) // <-- 4
```

## Contribuciones

Si deseas contribuir a esta librería, por favor eres libre de mandarme una pull request, yo la revisare y la incorporare a la libreria si veo que aporta valor.

## Licencia

Esta librería está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
