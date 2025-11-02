---
title: "Stack de Monitoreo: Prometheus y Grafana con Node Exporter"
description: Un stack de monitoreo auto-alojado con Prometheus para la recolección de métricas, Grafana para la visualización y Node Exporter para métricas del sistema.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [docker, grafana, monitoring, node-exporter, prometheus, self-hosted]
---

# Stack de Monitoreo: Prometheus y Grafana con Node Exporter

Este stack proporciona una solución robusta y auto-alojada para la recolección, almacenamiento y visualización de métricas de tus sistemas y aplicaciones. Utiliza Prometheus como sistema de monitoreo y alerta, Grafana para la creación de dashboards interactivos y Node Exporter para exponer métricas del sistema operativo.

## Componentes del Stack

### Prometheus

Prometheus es un sistema de monitoreo y alerta de código abierto. Recopila métricas de objetivos configurados a intervalos definidos, evalúa expresiones de reglas, muestra los resultados y puede activar alertas si se cumplen ciertas condiciones.

### Grafana

Grafana es una plataforma de código abierto para el análisis y la visualización de datos. Permite crear dashboards interactivos y personalizables a partir de diversas fuentes de datos, incluyendo Prometheus, para monitorear el rendimiento de tus sistemas.

### Node Exporter

Node Exporter es un exportador oficial de Prometheus que expone una amplia gama de métricas de hardware y sistema operativo (CPU, memoria, disco, red, etc.) de máquinas Unix/Linux. Es esencial para monitorear la salud y el rendimiento de tus servidores.

## Docker Compose

Este archivo `docker-compose.yml` despliega el stack completo de monitoreo.

```yml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "4000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - monitoring

  node_exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    networks:
      - monitoring

volumes:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

## Configuración de Prometheus (`prometheus.yml`)

Este archivo configura Prometheus para recolectar métricas de sí mismo y de Node Exporter.

```yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["prometheus:9090"]

  - job_name: "node"
    static_configs:
      - targets: ["node_exporter:9100"]
```
