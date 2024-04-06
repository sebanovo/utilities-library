import { Vector } from '../src'

const v1 = new Vector()

v1.cargar(10, 1, 9)
console.log(v1.descargar())
v1.segmentar('verificarPar')
console.log(v1.descargar())
v1.invertir(3, 9)
console.log(v1.descargar())
