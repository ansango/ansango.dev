# Scripts Utilities

Scripts de utilidad para el proyecto ansango.dev.

## 📝 Scripts Disponibles

### `generate-headers.js` ⭐ RECOMENDADO

**Generador automático de headers HTTP** con CSP y políticas de cache.

**Uso:**

```bash
npm run generate:headers
```

**Qué hace:**

- Lee configuración de `config/headers.config.js`
- Extrae y hashea automáticamente scripts inline
- Genera `public/_headers` completo
- Crea backup del archivo anterior
- Valida y muestra estadísticas

**Cuándo usar:**

- Modificaste un script inline (`theme.script.astro`, etc.)
- Cambiaste configuración CSP
- Añadiste/quitaste dominios whitelistados
- Ajustaste políticas de cache
- Modificaste headers de seguridad

**Nota:** `npm run build` ejecuta esto automáticamente.

---

### `generate-csp-hashes.sh` 🔧 LEGACY

Script bash manual para generar hashes SHA-256 de scripts inline.

**Status:** ⚠️ DEPRECADO - Usar `generate-headers.js` en su lugar.

**Uso:**

```bash
./scripts/generate-csp-hashes.sh
```

**Por qué está deprecado:**

- El nuevo sistema es automático y más robusto
- No necesitas copiar/pegar hashes manualmente
- Menos propenso a errores
- Integrado en el build process

---

## 🔧 Configuración

Toda la configuración de headers está centralizada en:

**`config/headers.config.js`**

Define aquí:
- Scripts inline a hashear
- Dominios whitelistados (CSP)
- Políticas de cache
- Headers de seguridad

Ver: `docs/csp-automated-system.md` para documentación completa.

---

## 📦 Añadir Nuevos Scripts

### 1. Crear el script

```bash
mkdir -p scripts
touch scripts/mi-nuevo-script.js
chmod +x scripts/mi-nuevo-script.js
```

### 2. Añadir shebang y código

```javascript
#!/usr/bin/env node

// Tu código aquí
console.log('Hola desde mi script!');
```

### 3. Añadir comando en package.json

```json
{
  "scripts": {
    "mi-comando": "node scripts/mi-nuevo-script.js"
  }
}
```

### 4. Documentar aquí

Añade una sección en este README explicando:
- Qué hace el script
- Cómo usarlo
- Cuándo usarlo

---

## 📚 Más Información

- **Sistema de Headers:** `docs/csp-automated-system.md`
- **Testing CSP:** `docs/csp-testing-checklist.md`
- **Configuración:** `config/headers.config.js`

---

**Última actualización:** 2 de noviembre, 2025
