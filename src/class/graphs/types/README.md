interfaces/
│
├── IGraph
├── IDirectedGraph
├── IWeightedGraph
└── IWeightedDirectedGraph

graphs/
│
├── Graph
├── DirectedGraph
├── WeightedGraph
└── WeightedDirectedGraph

algorithms/
│
├── BFS
├── DFS
├── ConnectedComponents
├── StronglyConnectedComponents
├── CycleDetector
├── TopologicalSort
├── Warshall
├── Floyd
├── Prim
├── Kruskal
├── Dijkstra
└── BellmanFord

//-------------------------------------------------------
graphs/
│
├── base/
│ ├── AbstractGraph.ts <-- Toda la lógica común
│ └── AdyacenteConPeso.ts
│
├── unweighted/
│ ├── Graph.ts
│ └── DirectedGraph.ts
│
├── weighted/
│ ├── WeightedGraph.ts
│ └── WeightedDirectedGraph.ts
│
└── algorithms/
├── BFS.ts
├── DFS.ts
├── ConnectedComponents.ts
├── Dijkstra.ts
├── FloydWarshall.ts
└── Prim.ts
