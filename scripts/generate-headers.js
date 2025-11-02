#!/usr/bin/env node

/**
 * Generador automático de headers HTTP para Cloudflare Pages
 * 
 * Lee la configuración de config/headers.config.js
 * Extrae y hashea scripts inline
 * Genera public/_headers con todas las políticas
 * 
 * Uso: npm run generate:headers
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

/**
 * Extrae contenido de script de un archivo Astro
 */
function extractScriptContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Buscar <script> tags
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
  const matches = [];
  let match;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    matches.push(match[1]);
  }
  
  if (matches.length === 0) {
    throw new Error(`No se encontraron scripts en ${filePath}`);
  }
  
  // Si hay múltiples scripts, concatenar
  return matches.join('\n');
}

/**
 * Genera hash SHA-256 de un string
 */
function generateHash(content) {
  return crypto
    .createHash('sha256')
    .update(content, 'utf8')
    .digest('base64');
}

/**
 * Procesa scripts inline y genera hashes
 */
function processInlineScripts(inlineScripts, verbose = false) {
  log.header('🔐 Generando hashes SHA-256 para scripts inline');
  
  const hashes = [];
  
  for (const script of inlineScripts) {
    const filePath = path.join(projectRoot, script.file);
    
    if (!fs.existsSync(filePath)) {
      log.error(`Archivo no encontrado: ${script.file}`);
      continue;
    }
    
    try {
      const content = extractScriptContent(filePath);
      const hash = generateHash(content);
      const hashDirective = `'sha256-${hash}'`;
      
      hashes.push(hashDirective);
      
      if (verbose) {
        log.success(`${script.description}`);
        console.log(`  File: ${colors.cyan}${script.file}${colors.reset}`);
        console.log(`  Hash: ${colors.green}${hashDirective}${colors.reset}\n`);
      }
    } catch (error) {
      log.error(`Error procesando ${script.file}: ${error.message}`);
    }
  }
  
  return hashes;
}

/**
 * Construye directiva CSP
 */
function buildCSPDirective(directives, hashes) {
  const parts = [];
  
  for (const [directive, sources] of Object.entries(directives)) {
    // Inyectar hashes en script-src
    if (directive === 'script-src') {
      const allSources = ["'self'", ...hashes, ...sources.filter(s => s !== "'self'")];
      parts.push(`${directive} ${allSources.join(' ')}`);
    } else if (sources.length > 0) {
      parts.push(`${directive} ${sources.join(' ')}`);
    } else {
      // Directivas sin valor (como upgrade-insecure-requests)
      parts.push(directive);
    }
  }
  
  return parts.join('; ');
}

/**
 * Genera el contenido del archivo _headers
 */
function generateHeadersContent(config, hashes) {
  const lines = [];
  
  // Header del archivo
  lines.push('# Cloudflare Pages Custom Headers');
  lines.push('# https://developers.cloudflare.com/pages/platform/headers/');
  lines.push('#');
  lines.push('# ⚠️  Este archivo es generado automáticamente por scripts/generate-headers.js');
  lines.push('# ⚠️  NO editar manualmente. Modifica config/headers.config.js en su lugar.');
  lines.push('# ⚠️  Regenerar con: npm run generate:headers');
  lines.push('');
  
  // Global Security Headers
  lines.push('# Global Security Headers');
  lines.push('/*');
  
  // Security headers
  for (const [header, value] of Object.entries(config.security)) {
    lines.push(`  ${header}: ${value}`);
  }
  
  // CSP
  const cspDirective = buildCSPDirective(config.csp.directives, hashes);
  const cspWithReport = config.csp.reportUri 
    ? `${cspDirective}; report-uri ${config.csp.reportUri}`
    : cspDirective;
  
  lines.push(`  Content-Security-Policy: ${cspWithReport}`);
  lines.push('');
  
  // HTML pages
  lines.push('# HTML pages - Always revalidate (para contenido nuevo)');
  lines.push('/*.html');
  lines.push(`  Cache-Control: ${config.cache.html.directive}`);
  lines.push('');
  lines.push('# Root HTML');
  lines.push('/');
  lines.push(`  Cache-Control: ${config.cache.html.directive}`);
  lines.push('');
  
  // Cache rules
  for (const [name, cacheConfig] of Object.entries(config.cache)) {
    if (name === 'html' || !cacheConfig.patterns) continue;
    
    const comment = name.charAt(0).toUpperCase() + name.slice(1);
    lines.push(`# ${comment}`);
    
    for (const pattern of cacheConfig.patterns) {
      lines.push(pattern);
      lines.push(`  Cache-Control: ${cacheConfig.directive}`);
      
      if (cacheConfig.contentType) {
        lines.push(`  Content-Type: ${cacheConfig.contentType}`);
      }
      
      if (cacheConfig.additionalHeaders) {
        for (const [header, value] of Object.entries(cacheConfig.additionalHeaders)) {
          lines.push(`  ${header}: ${value}`);
        }
      }
      
      lines.push('');
    }
  }
  
  return lines.join('\n');
}

/**
 * Main function
 */
async function main() {
  try {
    log.header('🚀 Generador de Headers HTTP');
    
    // Cargar configuración
    log.info('Cargando configuración...');
    const configPath = path.join(projectRoot, 'config', 'headers.config.js');
    const { default: config } = await import(configPath);
    log.success('Configuración cargada');
    
    // Procesar scripts inline
    const hashes = processInlineScripts(config.csp.inlineScripts, config.generator.verbose);
    log.success(`${hashes.length} hashes generados`);
    
    // Generar contenido
    log.info('Generando archivo _headers...');
    const content = generateHeadersContent(config, hashes);
    
    // Backup del archivo anterior si existe
    const outputPath = path.join(projectRoot, config.generator.output);
    if (config.generator.backup && fs.existsSync(outputPath)) {
      const backupPath = `${outputPath}.backup`;
      fs.copyFileSync(outputPath, backupPath);
      log.info(`Backup creado: ${backupPath}`);
    }
    
    // Escribir archivo
    fs.writeFileSync(outputPath, content, 'utf8');
    log.success(`Archivo generado: ${config.generator.output}`);
    
    // Estadísticas
    log.header('📊 Resumen');
    console.log(`  Scripts inline procesados: ${colors.cyan}${config.csp.inlineScripts.length}${colors.reset}`);
    console.log(`  Hashes SHA-256 generados: ${colors.cyan}${hashes.length}${colors.reset}`);
    console.log(`  Dominios whitelistados: ${colors.cyan}${
      Object.values(config.csp.directives).flat().filter(s => s.startsWith('http')).length
    }${colors.reset}`);
    console.log(`  Reglas de cache: ${colors.cyan}${Object.keys(config.cache).length}${colors.reset}`);
    
    log.header('✨ ¡Headers generados exitosamente!');
    console.log(`\n${colors.bright}Próximo paso:${colors.reset} npm run build\n`);
    
  } catch (error) {
    log.error(`Error fatal: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
