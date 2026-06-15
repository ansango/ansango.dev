---
title: "Fix: 502 Bad Gateway—Nextcloud LXC Alpine (Proxmox)"
description: descripcion
date: 2026-06-15
mod: 2026-06-15
published: false
tags: [nextcloud]
---

# Fix: 502 Bad Gateway—Nextcloud LXC Alpine (Proxmox)

## Contexto

- **Entorno:** LXC Alpine con Nextcloud (script Proxmox Community Scripts)
- **Stack:** nginx + php-fpm83 + MariaDB
- **Síntoma:** 502 Bad Gateway tras reinicio del LXC
- **Causa raíz:** `/run/` es un filesystem tmpfs en Alpine; se borra en cada reinicio. El directorio `/run/nextcloud/` se recrea con propietario `root:root`, pero php-fpm83 corre como `nextcloud:www-data` y no puede escribir el socket. Nginx crashea al no encontrar el socket.

---

## Diagnóstico rápido

```sh
# 1. Verificar estado de los servicios
rc-service nginx status
rc-service php-fpm83 status

# 2. Ver log de php-fpm
tail -30 /var/log/nextcloud/php-fpm.log

# 3. Comprobar permisos del directorio del socket
ls -la /run/nextcloud/
```

### Errores típicos en el log

```
ERROR: Another FPM instance seems to already listen on /run/nextcloud/fastcgi.sock
ERROR: FPM initialization failed

ERROR: [pool nextcloud] failed to chown() the socket '/run/nextcloud/fastcgi.sock': Operation not permitted (1)
ERROR: FPM initialization failed
```

El primero indica que hay un `php-fpm.pid` huérfano del arranque anterior. El segundo confirma que los permisos del directorio son incorrectos.

---

## Fix inmediato

Ejecutar en el LXC (como root):

```sh
# 1. Corregir permisos del directorio
chown nextcloud:nginx /run/nextcloud

# 2. Limpiar PID huérfano si existe
rm -f /run/nextcloud/php-fpm.pid

# 3. Arrancar servicios en orden (php-fpm primero, nginx después)
rc-service php-fpm83 restart
rc-service nginx restart

# 4. Verificar que todo está corriendo
rc-service php-fpm83 status
rc-service nginx status

# 5. Confirmar que el socket se creó correctamente
ls -la /run/nextcloud/fastcgi.sock
```

El socket debe aparecer así:

```
srw-rw----  1 nextcloud nginx  0 [fecha] fastcgi.sock
```

---

## Fix permanente

Crear una regla `tmpfiles.d` para que Alpine regenere el directorio con los permisos correctos en cada arranque, antes de que intenten levantar php-fpm83 y nginx:

```sh
echo "d /run/nextcloud 0775 nextcloud nginx -" > /etc/tmpfiles.d/nextcloud.conf
```

Con esto el problema no debería volver a ocurrir tras reinicios.

---

## Causa secundaria: IP del LXC cambia con DHCP

Si tras el reinicio la IP del LXC cambia (por DHCP), **Nginx Proxy Manager** apuntará a una IP incorrecta y seguirá devolviendo 502 aunque Nextcloud esté sano.

### Verificar que Nextcloud responde localmente

```sh
curl -I http://localhost
# Debe devolver HTTP/1.1 302 Found con headers de Nextcloud
```

Si responde bien, el problema es NPM: entrar a la interfaz, editar el proxy host de `cloud.dominio.com` y corregir la IP en **Forward Hostname/IP**.

### Solución definitiva: fijar IP estática

En Proxmox, en la configuración del LXC → **Network** → cambiar de DHCP a IP estática. Alternativamente, crear una reserva DHCP en el router asociada a la MAC del LXC.

---

## Resumen de comandos útiles

| Acción                        | Comando                                     |
| ----------------------------- | ------------------------------------------- |
| Ver servicios PHP disponibles | `rc-service --list \| grep php`             |
| Estado de nginx               | `rc-service nginx status`                   |
| Estado de php-fpm             | `rc-service php-fpm83 status`               |
| Log de php-fpm                | `tail -50 /var/log/nextcloud/php-fpm.log`   |
| Log de nginx                  | `tail -50 /var/log/nginx/error.log`         |
| Log del sistema               | `tail -50 /var/log/messages \| grep -i php` |
| IP del LXC                    | `ip a \| grep inet`                         |
| Test local de Nextcloud       | `curl -I http://localhost`                  |
| Ver runlevel de servicios     | `rc-update show \| grep -E "nginx\|php"`    |
| Añadir servicio al arranque   | `rc-update add php-fpm83 default`           |
