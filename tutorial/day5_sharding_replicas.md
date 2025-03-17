### 📖 Sharding
**Sharding** es una técnica para distribuir datos entre múltiples servidores (fragmentos o *shards*), mejorando la escalabilidad horizontal. Ideal para grandes volúmenes de datos o tráfico intenso.

**Ejemplo:** Una colección `users` con millones de registros se divide en fragmentos por `country`. Cada servidor maneja un subconjunto, reduciendo la carga.
**Ejemplo:** Una colección `users` con millones de registros se divide en fragmentos por `country`. Cada servidor maneja un subconjunto, reduciendo la carga.

**Nota:** Configurar sharding requiere múltiples instancias de MongoDB, lo que va más allá de nuestro contenedor único actual. Lo mencionamos como concepto clave para entornos reales.

### 📖 Replica Set
Un **Replica Set** es un grupo de nodos MongoDB que replican datos para alta disponibilidad. Incluye un nodo primario (escritura) y secundarios (lectura). Si el primario falla, un secundario toma su lugar.

**Ejemplo básico en `mongosh`:**
```javascript
rs.initiate()
rs.status()
```
**Nota:** Similar a sharding, requiere múltiples contenedores, pero lo exploraremos teóricamente por ahora.


#### 6. Reflexiona sobre sharding y replicación
Supón que `shop_db` crece a millones de documentos. Responde teóricamente:
- ¿Cómo usarías sharding para dividir `products`?
- ¿Cómo configurarías un Replica Set para alta disponibilidad?

<details>
<summary>Ver solución</summary>

- **Sharding:** Dividiría `products` por `category` (clave de fragmentación o *shard key*). Cada shard contendría categorías específicas (e.g., "Electronics" en un servidor, "Clothing" en otro).
- **Replica Set:** Configuraría 3 nodos: un primario y dos secundarios. Usaría `rs.initiate()` para activar la replicación y `rs.status()` para monitorear.

</details>

---

### Resultado Esperado
- `products` tiene 10 documentos (5 del Día 3 + 5 nuevos).
- Un índice compuesto optimiza consultas en `category` y `price`.
- Puedes analizar rendimiento y aggregations con herramientas prácticas.
